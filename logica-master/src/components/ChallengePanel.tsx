import { Lightbulb, CheckCircle, XCircle, BookOpen, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from './Toast';
import { getDesafiosPorLinguagem } from '../data/desafios';

export function ChallengePanel() {
  const { state, dispatch } = useApp();
  const { showToast } = useToast();
  const { desafioAtual, resultadoTestes } = state;

  if (!desafioAtual) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50">
        <div className="text-center text-slate-400">
          <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-semibold">Selecione um desafio</p>
          <p className="text-sm mt-1">Escolha uma linguagem e um desafio para começar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden h-full min-h-0">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <EnunciadoTab desafio={desafioAtual} />
      </div>

      {resultadoTestes && !resultadoTestes.sucesso && (
        <div className="error-box mx-6 mb-6">
          <div className="flex items-center gap-2 mb-1">
            <XCircle className="w-5 h-5 text-red-500" />
            <span className="font-bold text-red-700">Não passou em todos os testes</span>
          </div>
          <p className="text-sm text-red-600">Verifique o que o desafio pede e tente novamente.</p>
        </div>
      )}

      {resultadoTestes && resultadoTestes.sucesso && (
        <div className="success-box mx-6 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="font-bold text-green-700">Parabéns! Desafio concluído!</span>
          </div>
          <p className="text-sm text-green-600 mb-3">
            +{desafioAtual.xp} XP ganho
          </p>
          <ProximoDesafioButton
            linguagemAtual={state.linguagemAtual}
            nivelFiltro={state.nivelFiltro}
            desafioAtualId={desafioAtual.id}
            onNavigate={(nextId) => {
              dispatch({ type: 'SET_DESAFIO_ATUAL', payload: getDesafiosPorLinguagem(state.linguagemAtual).find(d => d.id === nextId) || null });
              showToast('success', 'Próximo desafio carregado!');
            }}
          />
        </div>
      )}
    </div>
  );
}

function EnunciadoTab({ desafio }: { desafio: any }) {
  const { state, dispatch } = useApp();
  const { mostrandoDica } = state;

  const getDifficultyColor = (nivel: string) => {
    switch (nivel) {
      case 'Fácil': return 'bg-green-100 text-green-700 border-green-200';
      case 'Médio': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Difícil': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-bold text-slate-800">{desafio.titulo}</h2>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(desafio.nivel)}`}>
            {desafio.nivel}
          </span>
        </div>
        <span className="text-sm font-semibold text-indigo-600">+{desafio.xp} XP</span>
      </div>

      <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
        <p className="text-base text-slate-700 leading-relaxed whitespace-pre-wrap">{desafio.descricao}</p>
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">Exemplo</h3>
        <div className="rounded-lg overflow-hidden border border-slate-200">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-100">
                <th className="px-5 py-3 text-left text-sm font-bold text-slate-600">Entrada</th>
                <th className="px-5 py-3 text-left text-sm font-bold text-slate-600">Saída esperada</th>
              </tr>
            </thead>
            <tbody>
              {desafio.casosDeTeste.slice(0, 2).map((teste: any) => (
                <tr key={teste.id} className="border-t border-slate-200">
                  <td className="px-5 py-3 font-mono text-base text-slate-700 bg-slate-50">{teste.entrada}</td>
                  <td className="px-5 py-3 font-mono text-base text-green-600 font-bold">{teste.saidaEsperada}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          <strong>Como funciona:</strong> Crie a função com o nome indicado, depois chame ela com valores específicos usando <code className="bg-blue-100 px-1 rounded">console.log()</code>. O sistema roda testes automáticos para validar.
        </p>
      </div>

      <button
        onClick={() => dispatch({ type: 'SET_MOSTRANDO_DICA', payload: !mostrandoDica })}
        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all text-base font-semibold
          ${mostrandoDica
            ? 'border-amber-300 bg-amber-50 text-amber-700'
            : 'border-slate-200 bg-white text-slate-600 hover:border-amber-300 hover:text-amber-700'
          }`}
      >
        <Lightbulb className="w-5 h-5" />
        {mostrandoDica ? 'Ocultar dica' : 'Preciso de uma dica'}
      </button>

      {mostrandoDica && desafio.dica && (
        <div className="hint-box">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-bold text-amber-700 text-sm mb-1">Dica</p>
              <p className="text-base text-amber-800">{desafio.dica}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface ProximoDesafioButtonProps {
  linguagemAtual: 'java' | 'python' | 'javascript';
  nivelFiltro: 'Todos' | 'Fácil' | 'Médio' | 'Difícil';
  desafioAtualId: string;
  onNavigate: (nextId: string) => void;
}

function ProximoDesafioButton({ linguagemAtual, nivelFiltro, desafioAtualId, onNavigate }: ProximoDesafioButtonProps) {
  const desafios = getDesafiosPorLinguagem(linguagemAtual).filter(d =>
    nivelFiltro === 'Todos' || d.nivel === nivelFiltro
  );
  const currentIndex = desafios.findIndex(d => d.id === desafioAtualId);
  const nextDesafio = currentIndex >= 0 && currentIndex < desafios.length - 1 ? desafios[currentIndex + 1] : null;

  if (!nextDesafio) return null;

  return (
    <button
      onClick={() => onNavigate(nextDesafio.id)}
      className="w-full btn btn-primary flex items-center justify-center gap-2"
    >
      Próximo desafio
      <ChevronRight className="w-5 h-5" />
    </button>
  );
}