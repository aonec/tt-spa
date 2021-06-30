export const reduceBooleanArr = (...loaders: boolean[]) =>
  loaders.reduce((acc, current) => acc || current);
