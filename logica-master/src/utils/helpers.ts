export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function getNivelInfo(nivel: number, xp: number, xpParaProximo: number) {
  const nomes = [
    'Iniciante',
    'Dev Aprendiz',
    'Dev Júnior',
    'Dev Pleno',
    'Dev Sênior',
    'Tech Lead',
    'Arquiteto',
    'Mestre da Lógica',
  ];
  const nome = nomes[Math.min(nivel - 1, nomes.length - 1)] || `Nível ${nivel}`;
  const progresso = xpParaProximo > 0 ? (xp / xpParaProximo) * 100 : 0;
  return { nome, progresso: Math.min(progresso, 100) };
}

export function getXpPorNivel(nivel: 'Fácil' | 'Médio' | 'Difícil'): number {
  switch (nivel) {
    case 'Fácil': return 10;
    case 'Médio': return 25;
    case 'Difícil': return 50;
  }
}

export function getNivelColor(nivel: 'Fácil' | 'Médio' | 'Difícil'): string {
  switch (nivel) {
    case 'Fácil': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
    case 'Médio': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'Difícil': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
  }
}

export function getLinguagemIcon(lang: 'java' | 'python' | 'javascript'): string {
  switch (lang) {
    case 'java': return '☕';
    case 'python': return '🐍';
    case 'javascript': return '📜';
  }
}

export function getLinguagemLabel(lang: 'java' | 'python' | 'javascript'): string {
  switch (lang) {
    case 'java': return 'Java';
    case 'python': return 'Python';
    case 'javascript': return 'JavaScript';
  }
}

export function getNivelLabel(nivel: 'Fácil' | 'Médio' | 'Difícil'): string {
  return nivel;
}