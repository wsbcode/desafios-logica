import type { Desafio, TestCase } from '../types';

const createTestCases = (cases: { entrada: string; saidaEsperada: string }[]): TestCase[] =>
  cases.map((c, i) => ({ id: i + 1, ...c }));

// ===================== JAVA =====================
const javaDesafios: Desafio[] = [
  {
    id: 'java-1', linguagem: 'java', titulo: 'Soma de Dois Números',
    descricao: 'Escreva uma função "soma" que receba dois números e retorne a soma.\n\nDepois crie a função, chame com a=10, b=100 e imprima o resultado.',
    nivel: 'Fácil', xp: 10,
    codigoBase: 'public class Solution {\n    public int soma(int a, int b) {\n        // Escreva a lógica aqui\n    }\n}',
    casosDeTeste: createTestCases([
      { entrada: '2 3', saidaEsperada: '5' }, { entrada: '-1 1', saidaEsperada: '0' },
      { entrada: '100 200', saidaEsperada: '300' }, { entrada: '0 0', saidaEsperada: '0' },
    ]),
    dica: 'Use o operador + para somar os dois parâmetros.',
    solucaoExplicada: 'Retorne `a + b`.',
  },
  {
    id: 'java-2', linguagem: 'java', titulo: 'Verificar Par ou Ímpar',
    descricao: 'Escreva uma função "parOuImpar" que receba um número e retorne "Par" ou "Ímpar".\n\nDepois crie a função, chame com n=7 e imprima o resultado.',
    nivel: 'Fácil', xp: 10,
    codigoBase: 'public class Solution {\n    public String parOuImpar(int n) {\n        // Escreva a lógica aqui\n    }\n}',
    casosDeTeste: createTestCases([
      { entrada: '4', saidaEsperada: 'Par' }, { entrada: '7', saidaEsperada: 'Ímpar' },
      { entrada: '0', saidaEsperada: 'Par' }, { entrada: '-2', saidaEsperada: 'Par' },
    ]),
    dica: 'Use o operador módulo (%): n % 2 == 0 significa par.',
    solucaoExplicada: '`n % 2 == 0 ? "Par" : "Ímpar"`',
  },
  {
    id: 'java-3', linguagem: 'java', titulo: 'Fatorial Iterativo',
    descricao: 'Escreva uma função "fatorial" que receba um número não negativo e retorne o fatorial (0! = 1).\n\nDepois crie a função, chame com n=5 e imprima o resultado.',
    nivel: 'Fácil', xp: 10,
    codigoBase: 'public class Solution {\n    public long fatorial(int n) {\n        // Escreva a lógica aqui\n    }\n}',
    casosDeTeste: createTestCases([
      { entrada: '0', saidaEsperada: '1' }, { entrada: '1', saidaEsperada: '1' },
      { entrada: '5', saidaEsperada: '120' }, { entrada: '10', saidaEsperada: '3628800' },
    ]),
    dica: 'Use um loop for multiplicando de 1 até n. Inicialize resultado = 1.',
    solucaoExplicada: 'Loop de 2 a n multiplicando acumulador.',
  },
  {
    id: 'java-4', linguagem: 'java', titulo: 'Maior de Três Números',
    descricao: 'Escreva uma função "maiorDeTres" que receba três números e retorne o maior.\n\nDepois crie a função, chame com a=10, b=25, c=15 e imprima o resultado.',
    nivel: 'Fácil', xp: 10,
    codigoBase: 'public class Solution {\n    public int maiorDeTres(int a, int b, int c) {\n        // Escreva a lógica aqui\n    }\n}',
    casosDeTeste: createTestCases([
      { entrada: '3 7 2', saidaEsperada: '7' }, { entrada: '10 10 5', saidaEsperada: '10' },
      { entrada: '-1 -5 -3', saidaEsperada: '-1' }, { entrada: '0 0 0', saidaEsperada: '0' },
    ]),
    dica: 'Use Math.max() duas vezes.',
    solucaoExplicada: '`Math.max(a, Math.max(b, c))`',
  },
  {
    id: 'java-5', linguagem: 'java', titulo: 'Contar Vogais',
    descricao: 'Escreva uma função "contarVogais" que receba uma string e retorne quantas vogais (a,e,i,o,u) existem.\n\nDepois crie a função, chame com "Hello World" e imprima o resultado.',
    nivel: 'Médio', xp: 25,
    codigoBase: 'public class Solution {\n    public int contarVogais(String s) {\n        // Escreva a lógica aqui\n    }\n}',
    casosDeTeste: createTestCases([
      { entrada: 'Hello World', saidaEsperada: '3' }, { entrada: 'JAVA', saidaEsperada: '2' },
      { entrada: 'xyz', saidaEsperada: '0' }, { entrada: 'aeiou AEIOU', saidaEsperada: '10' },
    ]),
    dica: 'Converta para minúsculas e verifique cada caractere.',
    solucaoExplicada: 'Loop verificando se cada char está em "aeiou".',
  },
  {
    id: 'java-6', linguagem: 'java', titulo: 'Inverter String',
    descricao: 'Escreva uma função "inverter" que receba uma string e retorne ela invertida.\n\nDepois crie a função, chame com "Java" e imprima o resultado.',
    nivel: 'Médio', xp: 25,
    codigoBase: 'public class Solution {\n    public String inverter(String s) {\n        // Escreva a lógica aqui\n    }\n}',
    casosDeTeste: createTestCases([
      { entrada: 'abc', saidaEsperada: 'cba' }, { entrada: 'Java', saidaEsperada: 'avaJ' },
      { entrada: '', saidaEsperada: '' }, { entrada: 'a', saidaEsperada: 'a' },
    ]),
    dica: 'Use StringBuilder com reverse().',
    solucaoExplicada: '`new StringBuilder(s).reverse().toString()`',
  },
  {
    id: 'java-7', linguagem: 'java', titulo: 'Verificar Palíndromo',
    descricao: 'Escreva uma função "ehPalindromo" que verifique se uma string é palíndromo (ignorando espaços e maiúsculas).\n\nDepois crie a função, chame com "arara" e imprima o resultado.',
    nivel: 'Médio', xp: 25,
    codigoBase: 'public class Solution {\n    public boolean ehPalindromo(String s) {\n        // Escreva a lógica aqui\n    }\n}',
    casosDeTeste: createTestCases([
      { entrada: 'arara', saidaEsperada: 'true' }, { entrada: 'Ame a ema', saidaEsperada: 'true' },
      { entrada: 'Java', saidaEsperada: 'false' }, { entrada: 'Ana', saidaEsperada: 'true' },
    ]),
    dica: 'Remova espaços, converta para minúsculas e compare com a versão invertida.',
    solucaoExplicada: 'Normaliza a string e compara com StringBuilder.reverse().',
  },
  {
    id: 'java-8', linguagem: 'java', titulo: 'Números Primos até N',
    descricao: 'Escreva uma função "primosAte" que receba N e retorne uma string com todos os primos até N separados por vírgula.\n\nDepois crie a função, chame com n=20 e imprima o resultado.',
    nivel: 'Difícil', xp: 50,
    codigoBase: 'public class Solution {\n    public String primosAte(int n) {\n        // Escreva a lógica aqui\n    }\n}',
    casosDeTeste: createTestCases([
      { entrada: '10', saidaEsperada: '2,3,5,7' }, { entrada: '2', saidaEsperada: '2' },
      { entrada: '1', saidaEsperada: '' }, { entrada: '20', saidaEsperada: '2,3,5,7,11,13,17,19' },
    ]),
    dica: 'Verifique primalidade testando divisibilidade até sqrt(n).',
    solucaoExplicada: 'Para cada número de 2 a N, verificamos se é primo.',
  },
  {
    id: 'java-9', linguagem: 'java', titulo: 'Fibonacci N-ésimo Termo',
    descricao: 'Escreva uma função "fibonacci" que receba N e retorne o N-ésimo termo de Fibonacci (0, 1, 1, 2, 3, 5, 8...).\n\nDepois crie a função, chame com n=10 e imprima o resultado.',
    nivel: 'Difícil', xp: 50,
    codigoBase: 'public class Solution {\n    public long fibonacci(int n) {\n        // Escreva a lógica aqui\n    }\n}',
    casosDeTeste: createTestCases([
      { entrada: '0', saidaEsperada: '0' }, { entrada: '1', saidaEsperada: '1' },
      { entrada: '6', saidaEsperada: '8' }, { entrada: '10', saidaEsperada: '55' },
    ]),
    dica: 'Use iteração com duas variáveis: a=0, b=1. Loop n vezes.',
    solucaoExplicada: 'Iterativo: temp=a+b; a=b; b=temp.',
  },
  {
    id: 'java-10', linguagem: 'java', titulo: 'Ordenar Array - Bubble Sort',
    descricao: 'Escreva uma função "bubbleSort" que receba um array e retorne ordenado como string "1,2,3".\n\nDepois crie a função, chame com {5,2,8,1,9} e imprima o resultado.',
    nivel: 'Difícil', xp: 50,
    codigoBase: 'public class Solution {\n    public String bubbleSort(int[] arr) {\n        // Escreva a lógica aqui\n    }\n}',
    casosDeTeste: createTestCases([
      { entrada: '5 2 8 1 9', saidaEsperada: '1,2,5,8,9' }, { entrada: '3 3 3', saidaEsperada: '3,3,3' },
      { entrada: '1', saidaEsperada: '1' }, { entrada: '10 9 8 7 6 5', saidaEsperada: '5,6,7,8,9,10' },
    ]),
    dica: 'Dois loops aninhados comparando e trocando adjacentes.',
    solucaoExplicada: 'Bubble Sort clássico com String.join para saída.',
  },
];

// ===================== PYTHON =====================
const pythonDesafios: Desafio[] = [
  {
    id: 'python-1', linguagem: 'python', titulo: 'Soma de Dois Números',
    descricao: 'Escreva uma função "soma" que receba dois números e retorne a soma.\n\nDepois crie a função, chame com a=10, b=100 e imprima o resultado.',
    nivel: 'Fácil', xp: 10,
    codigoBase: 'def soma(a, b):\n    # Escreva a lógica aqui\n    pass\n\n# Chame a função aqui:\n',
    casosDeTeste: createTestCases([
      { entrada: '2 3', saidaEsperada: '5' }, { entrada: '-1 1', saidaEsperada: '0' },
      { entrada: '100 200', saidaEsperada: '300' }, { entrada: '0 0', saidaEsperada: '0' },
    ]),
    dica: 'Use o operador + para somar os dois parâmetros.',
    solucaoExplicada: '`return a + b`',
  },
  {
    id: 'python-2', linguagem: 'python', titulo: 'Verificar Par ou Ímpar',
    descricao: 'Escreva uma função "par_ou_impar" que receba um número e retorne "Par" ou "Ímpar".\n\nDepois crie a função, chame com n=7 e imprima o resultado.',
    nivel: 'Fácil', xp: 10,
    codigoBase: 'def par_ou_impar(n):\n    # Escreva a lógica aqui\n    pass\n\n# Chame a função aqui:\n',
    casosDeTeste: createTestCases([
      { entrada: '4', saidaEsperada: 'Par' }, { entrada: '7', saidaEsperada: 'Ímpar' },
      { entrada: '0', saidaEsperada: 'Par' }, { entrada: '-2', saidaEsperada: 'Par' },
    ]),
    dica: 'Use o operador módulo (%): n % 2 == 0 significa par.',
    solucaoExplicada: '`"Par" if n % 2 == 0 else "Ímpar"`',
  },
  {
    id: 'python-3', linguagem: 'python', titulo: 'Fatorial',
    descricao: 'Escreva uma função "fatorial" que receba um número não negativo e retorne o fatorial (0! = 1).\n\nDepois crie a função, chame com n=5 e imprima o resultado.',
    nivel: 'Fácil', xp: 10,
    codigoBase: 'def fatorial(n):\n    # Escreva a lógica aqui\n    pass\n\n# Chame a função aqui:\n',
    casosDeTeste: createTestCases([
      { entrada: '0', saidaEsperada: '1' }, { entrada: '1', saidaEsperada: '1' },
      { entrada: '5', saidaEsperada: '120' }, { entrada: '10', saidaEsperada: '3628800' },
    ]),
    dica: 'Use loop for com range(2, n+1) multiplicando acumulador.',
    solucaoExplicada: 'Loop multiplicando de 2 a n.',
  },
  {
    id: 'python-4', linguagem: 'python', titulo: 'Maior de Três Números',
    descricao: 'Escreva uma função "maior_de_tres" que receba três números e retorne o maior.\n\nDepois crie a função, chame com a=10, b=25, c=15 e imprima o resultado.',
    nivel: 'Fácil', xp: 10,
    codigoBase: 'def maior_de_tres(a, b, c):\n    # Escreva a lógica aqui\n    pass\n\n# Chame a função aqui:\n',
    casosDeTeste: createTestCases([
      { entrada: '3 7 2', saidaEsperada: '7' }, { entrada: '10 10 5', saidaEsperada: '10' },
      { entrada: '-1 -5 -3', saidaEsperada: '-1' }, { entrada: '0 0 0', saidaEsperada: '0' },
    ]),
    dica: 'Use a função max().',
    solucaoExplicada: '`return max(a, b, c)`',
  },
  {
    id: 'python-5', linguagem: 'python', titulo: 'Contar Vogais',
    descricao: 'Escreva uma função "contar_vogais" que receba uma string e retorne quantas vogais (a,e,i,o,u) existem.\n\nDepois crie a função, chame com "Hello World" e imprima o resultado.',
    nivel: 'Médio', xp: 25,
    codigoBase: 'def contar_vogais(s):\n    # Escreva a lógica aqui\n    pass\n\n# Chame a função aqui:\n',
    casosDeTeste: createTestCases([
      { entrada: 'Hello World', saidaEsperada: '3' }, { entrada: 'PYTHON', saidaEsperada: '1' },
      { entrada: 'xyz', saidaEsperada: '0' }, { entrada: 'aeiou AEIOU', saidaEsperada: '10' },
    ]),
    dica: 'Use sum() com generator: sum(1 for c in s.lower() if c in "aeiou")',
    solucaoExplicada: '`sum(1 for c in s.lower() if c in "aeiou")`',
  },
  {
    id: 'python-6', linguagem: 'python', titulo: 'Inverter String',
    descricao: 'Escreva uma função "inverter" que receba uma string e retorne ela invertida.\n\nDepois crie a função, chame com "Python" e imprima o resultado.',
    nivel: 'Médio', xp: 25,
    codigoBase: 'def inverter(s):\n    # Escreva a lógica aqui\n    pass\n\n# Chame a função aqui:\n',
    casosDeTeste: createTestCases([
      { entrada: 'abc', saidaEsperada: 'cba' }, { entrada: 'Python', saidaEsperada: 'nohtyP' },
      { entrada: '', saidaEsperada: '' }, { entrada: 'a', saidaEsperada: 'a' },
    ]),
    dica: 'Use slicing: s[::-1]',
    solucaoExplicada: '`return s[::-1]`',
  },
  {
    id: 'python-7', linguagem: 'python', titulo: 'Verificar Palíndromo',
    descricao: 'Escreva uma função "eh_palindromo" que verifique se uma string é palíndromo (ignorando espaços e maiúsculas).\n\nDepois crie a função, chame com "arara" e imprima o resultado.',
    nivel: 'Médio', xp: 25,
    codigoBase: 'def eh_palindromo(s):\n    # Escreva a lógica aqui\n    pass\n\n# Chame a função aqui:\n',
    casosDeTeste: createTestCases([
      { entrada: 'arara', saidaEsperada: 'True' }, { entrada: 'Ame a ema', saidaEsperada: 'True' },
      { entrada: 'Python', saidaEsperada: 'False' }, { entrada: 'Ana', saidaEsperada: 'True' },
    ]),
    dica: 'Normalize: s.replace(" ","").lower(), compare com s[::-1].',
    solucaoExplicada: '`s.replace(" ","").lower() == s.replace(" ","").lower()[::-1]`',
  },
  {
    id: 'python-8', linguagem: 'python', titulo: 'Números Primos até N',
    descricao: 'Escreva uma função "primos_ate" que receba N e retorne uma string com os primos até N separados por vírgula.\n\nDepois crie a função, chame com n=20 e imprima o resultado.',
    nivel: 'Difícil', xp: 50,
    codigoBase: 'def primos_ate(n):\n    # Escreva a lógica aqui\n    pass\n\n# Chame a função aqui:\n',
    casosDeTeste: createTestCases([
      { entrada: '10', saidaEsperada: '2,3,5,7' }, { entrada: '2', saidaEsperada: '2' },
      { entrada: '1', saidaEsperada: '' }, { entrada: '20', saidaEsperada: '2,3,5,7,11,13,17,19' },
    ]),
    dica: 'Verifique primalidade até sqrt(n) para cada número.',
    solucaoExplicada: 'List comprehension com verificação de primalidade.',
  },
  {
    id: 'python-9', linguagem: 'python', titulo: 'Fibonacci N-ésimo Termo',
    descricao: 'Escreva uma função "fibonacci" que receba N e retorne o N-ésimo termo de Fibonacci.\n\nDepois crie a função, chame com n=10 e imprima o resultado.',
    nivel: 'Difícil', xp: 50,
    codigoBase: 'def fibonacci(n):\n    # Escreva a lógica aqui\n    pass\n\n# Chame a função aqui:\n',
    casosDeTeste: createTestCases([
      { entrada: '0', saidaEsperada: '0' }, { entrada: '1', saidaEsperada: '1' },
      { entrada: '6', saidaEsperada: '8' }, { entrada: '10', saidaEsperada: '55' },
    ]),
    dica: 'Use: a, b = b, a + b dentro do loop.',
    solucaoExplicada: '`a, b = 0, 1; for _ in range(n): a, b = b, a+b; return a`',
  },
  {
    id: 'python-10', linguagem: 'python', titulo: 'Ordenar Lista - Bubble Sort',
    descricao: 'Escreva uma função "bubble_sort" que receba uma lista e retorne ordenada como string "1,2,3".\n\nDepois crie a função, chame com [5,2,8,1,9] e imprima o resultado.',
    nivel: 'Difícil', xp: 50,
    codigoBase: 'def bubble_sort(lista):\n    # Escreva a lógica aqui\n    pass\n\n# Chame a função aqui:\n',
    casosDeTeste: createTestCases([
      { entrada: '5 2 8 1 9', saidaEsperada: '1,2,5,8,9' }, { entrada: '3 3 3', saidaEsperada: '3,3,3' },
      { entrada: '1', saidaEsperada: '1' }, { entrada: '10 9 8 7 6 5', saidaEsperada: '5,6,7,8,9,10' },
    ]),
    dica: 'Dois loops: externo range(len(lista)), interno troca adjacentes.',
    solucaoExplicada: 'Bubble Sort in-place com join para saída.',
  },
];

// ===================== JAVASCRIPT =====================
const jsDesafios: Desafio[] = [
  {
    id: 'js-1', linguagem: 'javascript', titulo: 'Soma de Dois Números',
    descricao: 'Escreva uma função "soma" que receba dois números e retorne a soma.\n\nDepois crie a função, chame com a=10, b=100 e imprima o resultado.',
    nivel: 'Fácil', xp: 10,
    codigoBase: 'function soma(a, b) {\n    // Escreva a lógica aqui\n}\n\n// Chame a função aqui:\n',
    casosDeTeste: createTestCases([
      { entrada: '2 3', saidaEsperada: '5' }, { entrada: '-1 1', saidaEsperada: '0' },
      { entrada: '100 200', saidaEsperada: '300' }, { entrada: '0 0', saidaEsperada: '0' },
    ]),
    dica: 'Use o operador + para somar os dois parâmetros.',
    solucaoExplicada: '`return a + b`',
  },
  {
    id: 'js-2', linguagem: 'javascript', titulo: 'Verificar Par ou Ímpar',
    descricao: 'Escreva uma função "parOuImpar" que receba um número e retorne "Par" ou "Ímpar".\n\nDepois crie a função, chame com n=7 e imprima o resultado.',
    nivel: 'Fácil', xp: 10,
    codigoBase: 'function parOuImpar(n) {\n    // Escreva a lógica aqui\n}\n\n// Chame a função aqui:\n',
    casosDeTeste: createTestCases([
      { entrada: '4', saidaEsperada: 'Par' }, { entrada: '7', saidaEsperada: 'Ímpar' },
      { entrada: '0', saidaEsperada: 'Par' }, { entrada: '-2', saidaEsperada: 'Par' },
    ]),
    dica: 'Use o operador módulo (%): n % 2 === 0 significa par.',
    solucaoExplicada: '`return n % 2 === 0 ? "Par" : "Ímpar"`',
  },
  {
    id: 'js-3', linguagem: 'javascript', titulo: 'Fatorial',
    descricao: 'Escreva uma função "fatorial" que receba um número não negativo e retorne o fatorial (0! = 1).\n\nDepois crie a função, chame com n=5 e imprima o resultado.',
    nivel: 'Fácil', xp: 10,
    codigoBase: 'function fatorial(n) {\n    // Escreva a lógica aqui\n}\n\n// Chame a função aqui:\n',
    casosDeTeste: createTestCases([
      { entrada: '0', saidaEsperada: '1' }, { entrada: '1', saidaEsperada: '1' },
      { entrada: '5', saidaEsperada: '120' }, { entrada: '10', saidaEsperada: '3628800' },
    ]),
    dica: 'Use loop for multiplicando acumulador. Inicialize resultado = 1.',
    solucaoExplicada: 'Loop de 2 a n multiplicando.',
  },
  {
    id: 'js-4', linguagem: 'javascript', titulo: 'Maior de Três Números',
    descricao: 'Escreva uma função "maiorDeTres" que receba três números e retorne o maior.\n\nDepois crie a função, chame com a=10, b=25, c=15 e imprima o resultado.',
    nivel: 'Fácil', xp: 10,
    codigoBase: 'function maiorDeTres(a, b, c) {\n    // Escreva a lógica aqui\n}\n\n// Chame a função aqui:\n',
    casosDeTeste: createTestCases([
      { entrada: '3 7 2', saidaEsperada: '7' }, { entrada: '10 10 5', saidaEsperada: '10' },
      { entrada: '-1 -5 -3', saidaEsperada: '-1' }, { entrada: '0 0 0', saidaEsperada: '0' },
    ]),
    dica: 'Use Math.max(a, b, c).',
    solucaoExplicada: '`return Math.max(a, b, c)`',
  },
  {
    id: 'js-5', linguagem: 'javascript', titulo: 'Contar Vogais',
    descricao: 'Escreva uma função "contarVogais" que receba uma string e retorne quantas vogais (a,e,i,o,u) existem.\n\nDepois crie a função, chame com "Hello World" e imprima o resultado.',
    nivel: 'Médio', xp: 25,
    codigoBase: 'function contarVogais(s) {\n    // Escreva a lógica aqui\n}\n\n// Chame a função aqui:\n',
    casosDeTeste: createTestCases([
      { entrada: 'Hello World', saidaEsperada: '3' }, { entrada: 'JAVASCRIPT', saidaEsperada: '3' },
      { entrada: 'xyz', saidaEsperada: '0' }, { entrada: 'aeiou AEIOU', saidaEsperada: '10' },
    ]),
    dica: 'Use match com regex: s.toLowerCase().match(/[aeiou]/g)',
    solucaoExplicada: '`(s.toLowerCase().match(/[aeiou]/g) || []).length`',
  },
  {
    id: 'js-6', linguagem: 'javascript', titulo: 'Inverter String',
    descricao: 'Escreva uma função "inverter" que receba uma string e retorne ela invertida.\n\nDepois crie a função, chame com "JavaScript" e imprima o resultado.',
    nivel: 'Médio', xp: 25,
    codigoBase: 'function inverter(s) {\n    // Escreva a lógica aqui\n}\n\n// Chame a função aqui:\n',
    casosDeTeste: createTestCases([
      { entrada: 'abc', saidaEsperada: 'cba' }, { entrada: 'JavaScript', saidaEsperada: 'tpircSavaJ' },
      { entrada: '', saidaEsperada: '' }, { entrada: 'a', saidaEsperada: 'a' },
    ]),
    dica: 'Use split(""), reverse(), join("").',
    solucaoExplicada: '`return s.split("").reverse().join("")`',
  },
  {
    id: 'js-7', linguagem: 'javascript', titulo: 'Verificar Palíndromo',
    descricao: 'Escreva uma função "ehPalindromo" que verifique se uma string é palíndromo (ignorando espaços e maiúsculas).\n\nDepois crie a função, chame com "arara" e imprima o resultado.',
    nivel: 'Médio', xp: 25,
    codigoBase: 'function ehPalindromo(s) {\n    // Escreva a lógica aqui\n}\n\n// Chame a função aqui:\n',
    casosDeTeste: createTestCases([
      { entrada: 'arara', saidaEsperada: 'true' }, { entrada: 'Ame a ema', saidaEsperada: 'true' },
      { entrada: 'JavaScript', saidaEsperada: 'false' }, { entrada: 'Ana', saidaEsperada: 'true' },
    ]),
    dica: 'Normalize com replace e toLowerCase(), compare com reverso.',
    solucaoExplicada: '`s.replace(/\\s/g,"").toLowerCase() === s.replace(/\\s/g,"").toLowerCase().split("").reverse().join("")`',
  },
  {
    id: 'js-8', linguagem: 'javascript', titulo: 'Números Primos até N',
    descricao: 'Escreva uma função "primosAte" que receba N e retorne uma string com os primos até N separados por vírgula.\n\nDepois crie a função, chame com n=20 e imprima o resultado.',
    nivel: 'Difícil', xp: 50,
    codigoBase: 'function primosAte(n) {\n    // Escreva a lógica aqui\n}\n\n// Chame a função aqui:\n',
    casosDeTeste: createTestCases([
      { entrada: '10', saidaEsperada: '2,3,5,7' }, { entrada: '2', saidaEsperada: '2' },
      { entrada: '1', saidaEsperada: '' }, { entrada: '20', saidaEsperada: '2,3,5,7,11,13,17,19' },
    ]),
    dica: 'Crie uma função auxiliar isPrimo e use filter + join.',
    solucaoExplicada: 'Filter com verificação de primalidade até sqrt(n).',
  },
  {
    id: 'js-9', linguagem: 'javascript', titulo: 'Fibonacci N-ésimo Termo',
    descricao: 'Escreva uma função "fibonacci" que receba N e retorne o N-ésimo termo de Fibonacci.\n\nDepois crie a função, chame com n=10 e imprima o resultado.',
    nivel: 'Difícil', xp: 50,
    codigoBase: 'function fibonacci(n) {\n    // Escreva a lógica aqui\n}\n\n// Chame a função aqui:\n',
    casosDeTeste: createTestCases([
      { entrada: '0', saidaEsperada: '0' }, { entrada: '1', saidaEsperada: '1' },
      { entrada: '6', saidaEsperada: '8' }, { entrada: '10', saidaEsperada: '55' },
    ]),
    dica: 'Use desestruturação: [a, b] = [b, a + b] no loop.',
    solucaoExplicada: '`let a=0,b=1; for(let i=0;i<n;i++) [a,b]=[b,a+b]; return a`',
  },
  {
    id: 'js-10', linguagem: 'javascript', titulo: 'Ordenar Array - Bubble Sort',
    descricao: 'Escreva uma função "bubbleSort" que receba um array e retorne ordenado como string "1,2,3".\n\nDepois crie a função, chame com [5,2,8,1,9] e imprima o resultado.',
    nivel: 'Difícil', xp: 50,
    codigoBase: 'function bubbleSort(arr) {\n    // Escreva a lógica aqui\n}\n\n// Chame a função aqui:\n',
    casosDeTeste: createTestCases([
      { entrada: '5 2 8 1 9', saidaEsperada: '1,2,5,8,9' }, { entrada: '3 3 3', saidaEsperada: '3,3,3' },
      { entrada: '1', saidaEsperada: '1' }, { entrada: '10 9 8 7 6 5', saidaEsperada: '5,6,7,8,9,10' },
    ]),
    dica: 'Dois loops aninhados trocando adjacentes com desestruturação.',
    solucaoExplicada: 'Bubble Sort com swap e join para saída.',
  },
];

export const todosDesafios: Desafio[] = [
  ...javaDesafios, ...pythonDesafios, ...jsDesafios,
];

export const getDesafiosPorLinguagem = (linguagem: 'java' | 'python' | 'javascript'): Desafio[] =>
  todosDesafios.filter(d => d.linguagem === linguagem);

export const getDesafioById = (id: string): Desafio | undefined =>
  todosDesafios.find(d => d.id === id);

export const getDesafiosPorNivel = (nivel: 'Fácil' | 'Médio' | 'Difícil'): Desafio[] =>
  todosDesafios.filter(d => d.nivel === nivel);