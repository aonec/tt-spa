export function round(x: number, n: number) {
  if (!x) return x;

  const m = Math.pow(10, n);
  return Math.round(x * m) / m;
}
