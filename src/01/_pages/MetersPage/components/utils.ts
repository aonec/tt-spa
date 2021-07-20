export function getArrayByCountRange<T>(
  count: number,
  callback: (count: number) => T
): T[] {
  const result: T[] = [];

  for (let i = 1; i <= count; i++) {
    result.push(callback(i));
  }

  return result;
}
