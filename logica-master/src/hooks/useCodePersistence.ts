import { useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';

const CODE_STORAGE_KEY = 'logica-master-editor-code';

interface EditorCodeMap {
  [desafioId: string]: string;
}

export function useCodePersistence() {
  const { state, dispatch } = useApp();

  const loadCode = useCallback((desafioId: string): string | null => {
    try {
      const saved = localStorage.getItem(CODE_STORAGE_KEY);
      if (saved) {
        const map: EditorCodeMap = JSON.parse(saved);
        return map[desafioId] || null;
      }
    } catch {
      // ignore parse errors
    }
    return null;
  }, []);

  const saveCode = useCallback((desafioId: string, code: string) => {
    try {
      const saved = localStorage.getItem(CODE_STORAGE_KEY);
      const map: EditorCodeMap = saved ? JSON.parse(saved) : {};
      map[desafioId] = code;
      localStorage.setItem(CODE_STORAGE_KEY, JSON.stringify(map));
    } catch {
      // ignore quota errors
    }
  }, []);

  const clearCode = useCallback((desafioId: string) => {
    try {
      const saved = localStorage.getItem(CODE_STORAGE_KEY);
      if (saved) {
        const map: EditorCodeMap = JSON.parse(saved);
        delete map[desafioId];
        localStorage.setItem(CODE_STORAGE_KEY, JSON.stringify(map));
      }
    } catch {
      // ignore
    }
  }, []);

  // Auto-save when code changes
  useEffect(() => {
    if (state.desafioAtual && state.codigoEditor.trim()) {
      const timeoutId = setTimeout(() => {
        saveCode(state.desafioAtual!.id, state.codigoEditor);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [state.desafioAtual?.id, state.codigoEditor, saveCode]);

  // Load code when challenge changes
  useEffect(() => {
    if (state.desafioAtual) {
      const savedCode = loadCode(state.desafioAtual.id);
      if (savedCode && savedCode !== state.desafioAtual.codigoBase) {
        dispatch({ type: 'SET_CODIGO_EDITOR', payload: savedCode });
      }
    }
  }, [state.desafioAtual?.id, loadCode, dispatch]);

  return { loadCode, saveCode, clearCode };
}