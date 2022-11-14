export function colToLetter(column: number) {
  return String.fromCharCode(65 + column);
}

export function letterToCol(column: string) {
  return column.charCodeAt(0) - 65;
}
