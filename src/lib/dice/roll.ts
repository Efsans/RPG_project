export function rollDie(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

export type DieKind = 4 | 6 | 8 | 10 | 12 | 20;

export function labelDie(sides: DieKind): string {
  return `d${sides}`;
}
