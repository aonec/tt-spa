export function wrapItemByArray<T>(item: T, condition: boolean): T[] {
  if (condition) return [item];

  return [];
}
