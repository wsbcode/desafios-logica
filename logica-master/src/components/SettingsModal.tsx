import { useState } from 'react';
import { Settings, RotateCcw, AlertTriangle, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from './Toast';

export function SettingsModal() {
  const { dispatch } = useApp();
  const { showToast } = useToast();
  const [aberto, setAberto] = useState(false);
  const [confirmado, setConfirmado] = useState(false);

  const handleReset = () => {
    if (!confirmado) {
      setConfirmado(true);
      return;
    }

    localStorage.removeItem('logica-master-progress');
    localStorage.removeItem('logica-master-stats');
    localStorage.removeItem('logica-master-timer');

    dispatch({ type: 'RESET_APP' });
    setAberto(false);
    setConfirmado(false);
    showToast('info', 'Progresso resetado.');
  };

  const handleOpen = () => {
    setAberto(true);
    setConfirmado(false);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="btn btn-outline px-3 py-2 text-sm flex items-center gap-2"
      >
        <Settings className="w-4 h-4" />
        Resetar
      </button>

      {aberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="card w-full max-w-md p-6 relative">
            <button
              onClick={() => setAberto(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center">
                {confirmado ? (
                  <AlertTriangle className="w-7 h-7 text-red-500" />
                ) : (
                  <RotateCcw className="w-7 h-7 text-red-500" />
                )}
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">
                {confirmado ? 'Confirmar reset' : 'Resetar progresso'}
              </h2>
              <p className="text-sm text-slate-500">
                {confirmado
                  ? 'Tem certeza? Todos os dados serão apagados.'
                  : 'Isso vai apagar seu XP, nível e streak.'
                }
              </p>
            </div>

            {confirmado && (
              <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-center">
                <p className="text-xs text-red-600 font-semibold uppercase">Ação irreversível</p>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={() => setAberto(false)} className="btn btn-outline flex-1">
                Cancelar
              </button>
              <button onClick={handleReset} className="btn btn-danger flex-1 flex items-center justify-center gap-2">
                {confirmado ? (
                  <>
                    <AlertTriangle className="w-4 h-4" />
                    Sim, resetar
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-4 h-4" />
                    Resetar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}