export function getInputValue(value: number | null) {
  if (value) return value;

  return typeof value === 'number' ? value : '';
}
