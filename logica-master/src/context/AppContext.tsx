import { createContext, useContext, useReducer, useEffect, type ReactNode, type Dispatch } from 'react';
import type { UserStats, Desafio, Linguagem, Nivel, TabType, ExecucaoResultado } from '../types';
import { getDesafiosPorLinguagem } from '../data/desafios';

const STORAGE_KEY = 'logica-master-user-stats';

const initialStats: UserStats = {
  nivel: 1,
  xp: 0,
  xpParaProximoNivel: 100,
  desafiosConcluidos: 0,
  streak: 0,
  ultimoAcesso: new Date().toISOString().split('T')[0],
  desafiosResolvidos: [],
};

interface AppState {
  stats: UserStats;
  linguagemAtual: Linguagem;
  nivelFiltro: Nivel | 'Todos';
  desafioAtual: Desafio | null;
  tabAtiva: TabType;
  timerSegundos: number;
  timerRodando: boolean;
  codigoEditor: string;
  resultadoTestes: ExecucaoResultado | null;
  mostrandoDica: boolean;
  solucaoDesbloqueada: boolean;
  confettiTrigger: number;
}

type Action =
  | { type: 'INIT_STATS'; payload: UserStats }
  | { type: 'SET_LINGUAGEM'; payload: Linguagem }
  | { type: 'SET_NIVEL_FILTRO'; payload: Nivel | 'Todos' }
  | { type: 'SET_DESAFIO_ATUAL'; payload: Desafio | null }
  | { type: 'SET_TAB_ATIVA'; payload: TabType }
  | { type: 'SET_TIMER_SEGUNDOS'; payload: number }
  | { type: 'SET_TIMER_RODANDO'; payload: boolean }
  | { type: 'TICK_TIMER' }
  | { type: 'RESET_TIMER' }
  | { type: 'SET_CODIGO_EDITOR'; payload: string }
  | { type: 'SET_RESULTADO_TESTES'; payload: ExecucaoResultado | null }
  | { type: 'SET_MOSTRANDO_DICA'; payload: boolean }
  | { type: 'DESBLOQUEAR_SOLUCAO' }
  | { type: 'CONCLUIR_DESAFIO'; payload: { desafioId: string; xpGanho: number } }
  | { type: 'TRIGGER_CONFETTI' }
  | { type: 'RESET_APP' };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'INIT_STATS':
      return { ...state, stats: action.payload };

    case 'SET_LINGUAGEM': {
      const desafios = getDesafiosPorLinguagem(action.payload);
      const primeiro = desafios.find(d => d.nivel === state.nivelFiltro || state.nivelFiltro === 'Todos') || desafios[0];
      return {
        ...state,
        linguagemAtual: action.payload,
        desafioAtual: primeiro || null,
        tabAtiva: 'enunciado',
        codigoEditor: primeiro?.codigoBase || '',
        resultadoTestes: null,
        mostrandoDica: false,
        solucaoDesbloqueada: false,
        timerSegundos: 0,
        timerRodando: false,
      };
    }

    case 'SET_NIVEL_FILTRO': {
      const desafios = getDesafiosPorLinguagem(state.linguagemAtual);
      const filtrados = action.payload === 'Todos'
        ? desafios
        : desafios.filter(d => d.nivel === action.payload);
      const primeiro = filtrados[0];
      return {
        ...state,
        nivelFiltro: action.payload,
        desafioAtual: primeiro || null,
        tabAtiva: 'enunciado',
        codigoEditor: primeiro?.codigoBase || '',
        resultadoTestes: null,
        mostrandoDica: false,
        solucaoDesbloqueada: false,
        timerSegundos: 0,
        timerRodando: false,
      };
    }

    case 'SET_DESAFIO_ATUAL':
      return {
        ...state,
        desafioAtual: action.payload,
        tabAtiva: 'enunciado',
        codigoEditor: action.payload?.codigoBase || '',
        resultadoTestes: null,
        mostrandoDica: false,
        solucaoDesbloqueada: state.stats.desafiosResolvidos.includes(action.payload?.id || ''),
        timerSegundos: 0,
        timerRodando: false,
      };

    case 'SET_TAB_ATIVA':
      return { ...state, tabAtiva: action.payload };

    case 'SET_TIMER_SEGUNDOS':
      return { ...state, timerSegundos: action.payload };

    case 'SET_TIMER_RODANDO':
      return { ...state, timerRodando: action.payload };

    case 'TICK_TIMER':
      return state.timerRodando ? { ...state, timerSegundos: state.timerSegundos + 1 } : state;

    case 'RESET_TIMER':
      return { ...state, timerSegundos: 0, timerRodando: false };

    case 'SET_CODIGO_EDITOR':
      return { ...state, codigoEditor: action.payload };

    case 'SET_RESULTADO_TESTES':
      return { ...state, resultadoTestes: action.payload };

    case 'SET_MOSTRANDO_DICA':
      return { ...state, mostrandoDica: action.payload };

    case 'DESBLOQUEAR_SOLUCAO':
      return { ...state, solucaoDesbloqueada: true };

    case 'CONCLUIR_DESAFIO': {
      const { desafioId, xpGanho } = action.payload;
      const jaResolvido = state.stats.desafiosResolvidos.includes(desafioId);
      if (jaResolvido) return state;

      const novoXp = state.stats.xp + xpGanho;
      let novoNivel = state.stats.nivel;
      let xpParaProximo = state.stats.xpParaProximoNivel;
      let xpAtual = novoXp;

      while (xpAtual >= xpParaProximo) {
        xpAtual -= xpParaProximo;
        novoNivel++;
        xpParaProximo = Math.floor(xpParaProximo * 1.5);
      }

      const hoje = new Date().toISOString().split('T')[0];
      const ontem = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      let novoStreak = state.stats.streak;
      if (state.stats.ultimoAcesso === ontem) {
        novoStreak += 1;
      } else if (state.stats.ultimoAcesso !== hoje) {
        novoStreak = 1;
      }

      const novasStats: UserStats = {
        ...state.stats,
        nivel: novoNivel,
        xp: xpAtual,
        xpParaProximoNivel: xpParaProximo,
        desafiosConcluidos: state.stats.desafiosConcluidos + 1,
        streak: novoStreak,
        ultimoAcesso: hoje,
        desafiosResolvidos: [...state.stats.desafiosResolvidos, desafioId],
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(novasStats));

      return {
        ...state,
        stats: novasStats,
        solucaoDesbloqueada: true,
        confettiTrigger: state.confettiTrigger + 1,
      };
    }

    case 'TRIGGER_CONFETTI':
      return { ...state, confettiTrigger: state.confettiTrigger + 1 };

    case 'RESET_APP':
      localStorage.removeItem(STORAGE_KEY);
      return {
        ...state,
        stats: initialStats,
        linguagemAtual: 'javascript',
        nivelFiltro: 'Todos',
        desafioAtual: null,
        tabAtiva: 'enunciado',
        timerSegundos: 0,
        timerRodando: false,
        codigoEditor: '',
        resultadoTestes: null,
        mostrandoDica: false,
        solucaoDesbloqueada: false,
        confettiTrigger: 0,
      };

    default:
      return state;
  }
}

const initialState: AppState = {
  stats: initialStats,
  linguagemAtual: 'javascript',
  nivelFiltro: 'Todos',
  desafioAtual: null,
  tabAtiva: 'enunciado',
  timerSegundos: 0,
  timerRodando: false,
  codigoEditor: '',
  resultadoTestes: null,
  mostrandoDica: false,
  solucaoDesbloqueada: false,
  confettiTrigger: 0,
};

const AppContext = createContext<{ state: AppState; dispatch: Dispatch<Action> } | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return { ...initial, stats: JSON.parse(saved) };
      } catch {
        return initial;
      }
    }
    return initial;
  });

  useEffect(() => {
    const desafios = getDesafiosPorLinguagem(state.linguagemAtual);
    const filtrados = state.nivelFiltro === 'Todos'
      ? desafios
      : desafios.filter(d => d.nivel === state.nivelFiltro);
    const primeiro = filtrados[0];
    if (primeiro && !state.desafioAtual) {
      dispatch({ type: 'SET_DESAFIO_ATUAL', payload: primeiro });
    }
  }, [state.linguagemAtual, state.nivelFiltro, state.desafioAtual]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (state.timerRodando) {
      interval = setInterval(() => dispatch({ type: 'TICK_TIMER' }), 1000);
    }
    return () => clearInterval(interval);
  }, [state.timerRodando]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp deve ser usado dentro de AppProvider');
  return ctx;
}