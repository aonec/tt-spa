interface Config<T> {
  value: T;
  show: boolean;
}
export function getValueByPriority<T>(configs: Config<T>[]): T | null {
  for (const elem of configs) {
    if (elem.show) {
      return elem.value;
    }
  }

  return null;
}
