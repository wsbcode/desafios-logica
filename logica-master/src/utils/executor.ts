import type { TestCase, ExecucaoResultado, TestResult } from '../types';

interface ExecutionContext {
  linguagem: 'java' | 'python' | 'javascript';
  codigo: string;
  casosDeTeste: TestCase[];
}

function parseEntrada(entrada: string): string[] {
  return entrada.trim().split(/\s+/).filter(Boolean);
}

function executarJavaScript(codigo: string, args: string[]): { saida: string; erro?: string } {
  try {
    let output = '';
    const mockConsole = { log: (...a: unknown[]) => { output += a.join(' ') + '\n'; } };

    const funcMatch = codigo.match(/function\s+(\w+)\s*\(([^)]*)\)\s*\{/);
    const funcName = funcMatch ? funcMatch[1] : null;

    if (!funcName) {
      return { saida: '', erro: 'Função não encontrada. Escreva uma função com function nome(parametros) {}' };
    }

    const fn = new Function('console', codigo);
    fn(mockConsole);

    const funcOnly = codigo.replace(/console\.log\s*\([^)]*\)\s*;?/g, '').replace(/\/\/.*$/gm, '');
    const testFn = new Function('console', `${funcOnly}\nvar __r = ${funcName}(${args.map(a => {
      const num = Number(a);
      return isNaN(num) ? JSON.stringify(a) : a;
    }).join(',')});\nif(typeof __r !== 'undefined') console.log(__r);`);
    output = '';
    testFn(mockConsole);

    return { saida: output.trim() };
  } catch (e) {
    return { saida: '', erro: e instanceof Error ? e.message : 'Erro desconhecido' };
  }
}

function executarPython(codigo: string, args: string[]): { saida: string; erro?: string } {
  try {
    const linhas = codigo.split('\n');
    const funcaoMatch = linhas.find(l => l.trim().startsWith('def '));
    if (!funcaoMatch) return { saida: '', erro: 'Nenhuma função encontrada' };

    const nomeFuncao = funcaoMatch.match(/def\s+(\w+)/)?.[1];
    if (!nomeFuncao) return { saida: '', erro: 'Nome da função não encontrado' };

    const execCode = `
${codigo}

try:
    resultado = ${nomeFuncao}(${args.map((a) => {
      const num = Number(a);
      return isNaN(num) ? `'${a}'` : String(num);
    }).join(', ')})
    print(resultado)
except Exception as e:
    print(f"ERRO: {e}")
`;

    return executarPythonSimples(execCode);
  } catch (e) {
    return { saida: '', erro: e instanceof Error ? e.message : 'Erro desconhecido' };
  }
}

function executarPythonSimples(codigo: string): { saida: string; erro?: string } {
  try {
    let output = '';
    const print = (...args: unknown[]) => { output += args.join(' ') + '\n'; };

    const builtins: Record<string, unknown> = {
      print,
      len: (x: string | unknown[]) => x.length,
      range: (start: number, end?: number, step = 1) => {
        const arr: number[] = [];
        const s = end === undefined ? 0 : start;
        const e = end === undefined ? start : end;
        for (let i = s; i < e; i += step) arr.push(i);
        return arr;
      },
      str: String,
      int: Number,
      float: Number,
      bool: Boolean,
      list: (x?: unknown[]) => x || [],
      dict: (x?: Record<string, unknown>) => x || {},
      set: (x?: unknown[]) => new Set(x),
      tuple: (x?: unknown[]) => x || [],
      min: Math.min,
      max: Math.max,
      sum: (arr: number[]) => arr.reduce((a, b) => a + b, 0),
      abs: Math.abs,
      pow: Math.pow,
      round: Math.round,
      sorted: (arr: unknown[]) => [...arr].sort(),
      reversed: (arr: unknown[]) => [...arr].reverse(),
      enumerate: (arr: unknown[]) => arr.map((v, i) => [i, v]),
      zip: (...arrs: unknown[][]) => arrs[0].map((_, i) => arrs.map(a => a[i])),
      map: (fn: (v: unknown) => unknown, arr: unknown[]) => arr.map(fn),
      filter: (fn: (v: unknown) => boolean, arr: unknown[]) => arr.filter(fn),
      any: (arr: unknown[]) => arr.some(Boolean),
      all: (arr: unknown[]) => arr.every(Boolean),
    };

    const func = new Function('builtins', `with (builtins) { ${codigo} }`);
    func(builtins);

    return { saida: output.trim() };
  } catch (e) {
    return { saida: '', erro: e instanceof Error ? e.message : 'Erro desconhecido' };
  }
}

function executarJava(codigo: string, args: string[]): { saida: string; erro?: string } {
  try {
    const classMatch = codigo.match(/class\s+(\w+)/);
    const methodMatch = codigo.match(/public\s+\w+\s+(\w+)\s*\([^)]*\)/);
    if (!classMatch || !methodMatch) {
      return { saida: '', erro: 'Estrutura Java inválida (precisa de class e método público)' };
    }

    const className = classMatch[1];
    const methodName = methodMatch[1];

    const javaCode = `
${codigo}

public class Main {
    public static void main(String[] args) {
        ${className} sol = new ${className}();
        try {
            Object result = sol.${methodName}(${args.map((a, i) => {
      const num = Number(a);
      return isNaN(num) ? `args[${i}]` : a;
    }).join(', ')});
            System.out.println(result);
        } catch (Exception e) {
            System.out.println("ERRO: " + e.getMessage());
        }
    }
}
`;

    return executarJavaSimples(javaCode);
  } catch (e) {
    return { saida: '', erro: e instanceof Error ? e.message : 'Erro desconhecido' };
  }
}

function executarJavaSimples(codigo: string): { saida: string; erro?: string } {
  try {
    let output = '';
    const println = (...a: unknown[]) => { output += a.join(' ') + '\n'; };

    const scope = {
      System: { out: { println } },
      String,
      Integer: { parseInt: (s: string) => parseInt(s, 10) },
      Double: { parseDouble: parseFloat },
      Math,
      Array,
      Object,
    };

    const func = new Function('scope', `with (scope) { ${codigo} }`);
    func(scope);

    return { saida: output.trim() };
  } catch (e) {
    return { saida: '', erro: e instanceof Error ? e.message : 'Erro desconhecido' };
  }
}

export async function executarTestes({ linguagem, codigo, casosDeTeste }: ExecutionContext): Promise<ExecucaoResultado> {
  const inicio = performance.now();
  const resultados: TestResult[] = [];

  for (const teste of casosDeTeste) {
    const args = parseEntrada(teste.entrada);
    let saidaObtida = '';
    let erro: string | undefined;
    let passou = false;

    try {
      let resultado: { saida: string; erro?: string };

      switch (linguagem) {
        case 'javascript':
          resultado = executarJavaScript(codigo, args);
          break;
        case 'python':
          resultado = executarPython(codigo, args);
          break;
        case 'java':
          resultado = executarJava(codigo, args);
          break;
        default:
          resultado = { saida: '', erro: 'Linguagem não suportada' };
      }

      saidaObtida = resultado.saida;
      erro = resultado.erro;
      passou = !erro && saidaObtida.trim() === teste.saidaEsperada.trim();
    } catch (e) {
      erro = e instanceof Error ? e.message : 'Erro de execução';
      passou = false;
    }

    resultados.push({
      id: teste.id,
      entrada: teste.entrada,
      saidaEsperada: teste.saidaEsperada,
      saidaObtida,
      passou,
      erro,
    });
  }

  const tempoExecucao = performance.now() - inicio;
  const sucesso = resultados.every(r => r.passou);

  return { sucesso, resultados, tempoExecucao };
}

export function getCodigoBase(linguagem: 'java' | 'python' | 'javascript', nomeFuncao: string): string {
  switch (linguagem) {
    case 'java':
      return `public class Solution {\n    public int ${nomeFuncao}(int a, int b) {\n        // Escreva seu código aqui\n        return 0;\n    }\n}`;
    case 'python':
      return `def ${nomeFuncao}(a: int, b: int) -> int:\n    # Escreva seu código aqui\n    return 0`;
    case 'javascript':
      return `function ${nomeFuncao}(a, b) {\n    // Escreva seu código aqui\n    return 0;\n}`;
  }
}