type MoveChar = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

export function colToLetter(column: number): MoveChar {
  return String.fromCharCode(65 + column) as MoveChar;
}

export function letterToCol(column: string) {
  return column.charCodeAt(0) - 65;
}
