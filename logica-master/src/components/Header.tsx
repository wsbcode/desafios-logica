import { useApp } from '../context/AppContext';
import { getDesafiosPorLinguagem } from '../data/desafios';
import { getXpPorNivel } from '../utils/helpers';
import type { Nivel } from '../types';

export function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-indigo-600">Lógica Master</h1>
            <p className="text-sm text-slate-500">Aprenda programação praticando</p>
          </div>
          <div className="text-sm text-slate-500">
            <ProgressInfo />
          </div>
        </div>
      </div>
    </header>
  );
}

function ProgressInfo() {
  const { state } = useApp();
  return (
    <div className="flex items-center gap-4">
      <span className="text-slate-600">
        <span className="font-bold text-indigo-600">{state.stats.desafiosConcluidos}</span> desafios concluídos
      </span>
      <span className="text-slate-600">
        <span className="font-bold text-amber-500">{state.stats.xp + (state.stats.nivel - 1) * 100}</span> XP
      </span>
    </div>
  );
}

export function ControlBar() {
  const { state, dispatch } = useApp();

  const linguagens: { value: 'java' | 'python' | 'javascript'; label: string; icon: string }[] = [
    { value: 'javascript', label: 'JavaScript', icon: 'JS' },
    { value: 'python', label: 'Python', icon: 'PY' },
    { value: 'java', label: 'Java', icon: 'JV' },
  ];

  const niveis: (Nivel | 'Todos')[] = ['Todos', 'Fácil', 'Médio', 'Difícil'];

  const desafios = getDesafiosPorLinguagem(state.linguagemAtual).filter(d =>
    state.nivelFiltro === 'Todos' || d.nivel === state.nivelFiltro
  );

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row gap-3 sm:items-center">
        <div className="flex items-center gap-2">
          <label className="label">Linguagem</label>
          <select
            value={state.linguagemAtual}
            onChange={(e) => dispatch({ type: 'SET_LINGUAGEM', payload: e.target.value as 'java' | 'python' | 'javascript' })}
            className="input py-2 text-sm min-w-[150px]"
          >
            {linguagens.map(l => (
              <option key={l.value} value={l.value}>{l.icon} — {l.label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="label">Nível</label>
          <select
            value={state.nivelFiltro}
            onChange={(e) => dispatch({ type: 'SET_NIVEL_FILTRO', payload: e.target.value as Nivel | 'Todos' })}
            className="input py-2 text-sm min-w-[140px]"
          >
            {niveis.map(n => (
              <option key={n} value={n}>
                {n === 'Todos' ? 'Todos' : `${n} (+${getXpPorNivel(n)} XP)`}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-0">
          <label className="label">Desafio</label>
          <select
            value={state.desafioAtual?.id || ''}
            onChange={(e) => {
              const desafio = desafios.find(d => d.id === e.target.value);
              if (desafio) dispatch({ type: 'SET_DESAFIO_ATUAL', payload: desafio });
            }}
            className="input py-2 text-sm w-full"
          >
            {desafios.map(d => (
              <option key={d.id} value={d.id}>
                {d.titulo} ({d.nivel})
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}