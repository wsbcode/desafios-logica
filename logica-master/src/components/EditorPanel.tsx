import { useRef, useEffect, useState, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, CheckCircle, XCircle, Terminal } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useCodeExecution } from '../hooks/useCodeExecution';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { useCodePersistence } from '../hooks/useCodePersistence';
import type { TestResult } from '../types';

type MonacoEditor = {
  getModel: () => { setValue: (value: string) => void } | null;
};

export function EditorPanel() {
  const { state, dispatch } = useApp();
  const { executar } = useCodeExecution();
  const { clearCode } = useCodePersistence();
  const editorRef = useRef<MonacoEditor | null>(null);
  const [consoleAberto, setConsoleAberto] = useState(true);

  const handleEditorMount = useCallback((editor: MonacoEditor | null) => {
    editorRef.current = editor;
  }, []);

  const handleRun = useCallback(() => {
    if (state.codigoEditor.trim()) {
      executar();
    }
  }, [state.codigoEditor, executar]);

  const handleReset = useCallback(() => {
    if (state.desafioAtual && editorRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        model.setValue(state.desafioAtual.codigoBase);
      }
      dispatch({ type: 'SET_CODIGO_EDITOR', payload: state.desafioAtual.codigoBase });
      dispatch({ type: 'SET_RESULTADO_TESTES', payload: null });
      dispatch({ type: 'SET_MOSTRANDO_DICA', payload: false });
      if (state.desafioAtual) clearCode(state.desafioAtual.id);
    }
  }, [state.desafioAtual, dispatch, clearCode]);

  useKeyboardShortcuts(handleRun, handleReset, (open) => setConsoleAberto(open));

  useEffect(() => {
    if (state.desafioAtual && editorRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        model.setValue(state.desafioAtual.codigoBase);
      }
      dispatch({ type: 'SET_CODIGO_EDITOR', payload: state.desafioAtual.codigoBase });
    }
  }, [state.desafioAtual, dispatch]);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      dispatch({ type: 'SET_CODIGO_EDITOR', payload: value });
    }
  };

  const linguagemMap: Record<string, string> = {
    javascript: 'javascript',
    python: 'python',
    java: 'java',
  };

  return (
    <div className="flex-1 flex flex-col h-full min-h-0">
      <div className="flex items-center justify-between px-5 py-3 bg-white border-b border-slate-200">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-indigo-600 uppercase">
            {state.linguagemAtual}
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-sm text-slate-500 truncate max-w-[250px]">
            {state.desafioAtual ? state.desafioAtual.titulo : 'Selecione um desafio'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            disabled={!state.desafioAtual}
            className="btn btn-outline px-4 py-2 text-sm flex items-center gap-2"
            title="Limpar código"
          >
            <RotateCcw className="w-4 h-4" />
            Limpar
          </button>
          <button
            onClick={handleRun}
            disabled={!state.desafioAtual || !state.codigoEditor.trim()}
            className="btn btn-success px-6 py-2 text-base flex items-center gap-2 font-bold"
            title="Rodar testes (Ctrl+Enter)"
          >
            <Play className="w-5 h-5" />
            Rodar
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative min-h-0">
        <div className="flex-1 relative min-h-0">
          <Editor
            height="100%"
            defaultLanguage={linguagemMap[state.linguagemAtual]}
            value={state.codigoEditor}
            onChange={handleEditorChange}
            onMount={handleEditorMount}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 15,
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              lineNumbers: 'on',
              roundedSelection: true,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: 'on',
              bracketPairColorization: { enabled: true },
              guides: { bracketPairs: true },
              renderLineHighlight: 'all',
              cursorBlinking: 'smooth',
              smoothScrolling: true,
              padding: { top: 12, bottom: 12 },
            }}
          />
        </div>

        <button
          onClick={() => setConsoleAberto(!consoleAberto)}
          className="absolute right-3 top-3 z-10 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition-colors border border-slate-200"
        >
          {consoleAberto ? 'Ocultar testes' : 'Mostrar testes'}
        </button>

        {consoleAberto && (
          <ConsolePanel resultadoTestes={state.resultadoTestes} />
        )}
      </div>
    </div>
  );
}

interface ConsolePanelProps {
  resultadoTestes: { sucesso: boolean; resultados: TestResult[]; tempoExecucao: number } | null;
}

function ConsolePanel({ resultadoTestes }: ConsolePanelProps) {
  const todosPassaram = resultadoTestes?.resultados.every(r => r.passou) ?? false;
  const passaram = resultadoTestes?.resultados.filter(r => r.passou).length ?? 0;
  const total = resultadoTestes?.resultados.length ?? 0;

  return (
    <div className="border-t border-slate-200 bg-slate-50 max-h-[280px] overflow-y-auto">
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-white">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-bold text-slate-600">Resultados dos testes</span>
        </div>
        {resultadoTestes && (
          <span className={`text-sm font-bold ${todosPassaram ? 'text-green-600' : 'text-red-600'}`}>
            {passaram}/{total} passaram
          </span>
        )}
      </div>

      <div className="p-4 space-y-2">
        {resultadoTestes ? (
          resultadoTestes.resultados.map((teste: TestResult) => (
            <TestResultItem key={teste.id} teste={teste} />
          ))
        ) : (
          <div className="text-center py-8 text-slate-400">
            <Terminal className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm">Clique em <strong> Rodar</strong> para ver os resultados</p>
          </div>
        )}
      </div>
    </div>
  );
}

function TestResultItem({ teste }: { teste: TestResult }) {
  const passou = teste.passou;

  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg border ${passou ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${passou ? 'bg-green-100' : 'bg-red-100'}`}>
        {passou ? (
          <CheckCircle className="w-4 h-4 text-green-600" />
        ) : (
          <XCircle className="w-4 h-4 text-red-600" />
        )}
      </div>
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Teste #{teste.id}</span>
          <span className={`text-xs font-bold ${passou ? 'text-green-600' : 'text-red-600'}`}>
            {passou ? 'PASSOU' : 'FALHOU'}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase">Entrada</span>
            <code className="block font-mono text-slate-700 bg-white px-2 py-1 rounded border border-slate-200">{teste.entrada}</code>
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase">Esperado</span>
            <code className="block font-mono text-green-700 bg-white px-2 py-1 rounded border border-green-200">{teste.saidaEsperada}</code>
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase">Recebido</span>
            <code className={`block font-mono bg-white px-2 py-1 rounded border ${passou ? 'text-green-700 border-green-200' : 'text-red-700 border-red-200'}`}>
              {teste.saidaObtida || '(vazio)'}
            </code>
          </div>
        </div>
        {teste.erro && (
          <div className="mt-1">
            <span className="text-[11px] font-bold text-red-500 uppercase">Erro</span>
            <code className="block font-mono text-red-600 bg-white px-2 py-1 rounded border border-red-200 text-sm">{teste.erro}</code>
          </div>
        )}
      </div>
    </div>
  );
}