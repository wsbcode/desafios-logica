import { useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { executarTestes } from '../utils/executor';

export function useCodeExecution() {
  const { state, dispatch } = useApp();

  const executar = useCallback(async () => {
    if (!state.desafioAtual || !state.codigoEditor.trim()) return;

    dispatch({ type: 'SET_RESULTADO_TESTES', payload: null });

    try {
      const resultado = await executarTestes({
        linguagem: state.linguagemAtual,
        codigo: state.codigoEditor,
        casosDeTeste: state.desafioAtual.casosDeTeste,
      });

      dispatch({ type: 'SET_RESULTADO_TESTES', payload: resultado });

      if (resultado.sucesso) {
        dispatch({ type: 'DESBLOQUEAR_SOLUCAO' });
        dispatch({
          type: 'CONCLUIR_DESAFIO',
          payload: { desafioId: state.desafioAtual.id, xpGanho: state.desafioAtual.xp },
        });
      }
    } catch (e) {
      dispatch({
        type: 'SET_RESULTADO_TESTES',
        payload: {
          sucesso: false,
          resultados: [],
          tempoExecucao: 0,
        },
      });
    }
  }, [state.desafioAtual, state.codigoEditor, state.linguagemAtual, dispatch]);

  return { executar };
}