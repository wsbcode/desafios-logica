export interface TestCase {
  id: number;
  entrada: string;
  saidaEsperada: string;
}

export interface Desafio {
  id: string;
  linguagem: "java" | "python" | "javascript";
  titulo: string;
  descricao: string;
  nivel: "Fácil" | "Médio" | "Difícil";
  xp: number;
  codigoBase: string;
  casosDeTeste: TestCase[];
  dica?: string;
  solucaoExplicada: string;
}

export interface UserStats {
  nivel: number;
  xp: number;
  xpParaProximoNivel: number;
  desafiosConcluidos: number;
  streak: number;
  ultimoAcesso: string;
  desafiosResolvidos: string[];
}

export type Linguagem = "java" | "python" | "javascript";
export type Nivel = "Fácil" | "Médio" | "Difícil";
export type TabType = "enunciado" | "solucao";

export interface ExecucaoResultado {
  sucesso: boolean;
  resultados: TestResult[];
  tempoExecucao: number;
}

export interface TestResult {
  id: number;
  entrada: string;
  saidaEsperada: string;
  saidaObtida: string;
  passou: boolean;
  erro?: string;
}