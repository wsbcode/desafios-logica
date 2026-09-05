import { useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';

export function useKeyboardShortcuts(onRun?: () => void, onReset?: () => void, onToggleConsole?: (open: boolean) => void) {
  const { state, dispatch } = useApp();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const isCtrlOrMeta = e.ctrlKey || e.metaKey;
    const isShift = e.shiftKey;

    // Ctrl+Enter / Cmd+Enter: Executar testes
    if (isCtrlOrMeta && e.key === 'Enter' && !isShift) {
      e.preventDefault();
      if (state.desafioAtual && state.codigoEditor.trim() && onRun) {
        onRun();
      }
      return;
    }

    // Ctrl+Shift+Enter / Cmd+Shift+Enter: Resetar código
    if (isCtrlOrMeta && isShift && e.key === 'Enter') {
      e.preventDefault();
      if (onReset) onReset();
      return;
    }

    // Ctrl+S / Cmd+S: Salvar código (prevenir comportamento padrão do navegador)
    if (isCtrlOrMeta && e.key === 's') {
      e.preventDefault();
      // O auto-save já acontece via useCodePersistence
      return;
    }

    // Escape: Fechar dica / fechar console
    if (e.key === 'Escape') {
      dispatch({ type: 'SET_MOSTRANDO_DICA', payload: false });
      if (onToggleConsole) onToggleConsole(false);
      return;
    }

    // F1: Mostrar/ocultar dica
    if (e.key === 'F1') {
      e.preventDefault();
      if (state.desafioAtual?.dica) {
        dispatch({ type: 'SET_MOSTRANDO_DICA', payload: !state.mostrandoDica });
      }
      return;
    }

    // Ctrl+1/2/3: Trocar aba (1=Enunciado, 2=Solução)
    if (isCtrlOrMeta && ['1', '2'].includes(e.key)) {
      e.preventDefault();
      const tab = e.key === '1' ? 'enunciado' : 'solucao';
      const podeVerSolucao = state.stats.desafiosResolvidos.includes(state.desafioAtual?.id || '') || state.solucaoDesbloqueada;
      if (tab === 'enunciado' || podeVerSolucao) {
        dispatch({ type: 'SET_TAB_ATIVA', payload: tab as 'enunciado' | 'solucao' });
      }
      return;
    }

    // Ctrl+Alt+R: Resetar timer
    if (isCtrlOrMeta && e.altKey && e.key === 'r') {
      e.preventDefault();
      dispatch({ type: 'RESET_TIMER' });
      return;
    }
  }, [state.desafioAtual, state.mostrandoDica, state.stats.desafiosResolvidos, state.solucaoDesbloqueada, dispatch, onRun, onReset, onToggleConsole]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}