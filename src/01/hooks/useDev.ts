export function useIsDev() {
  const isDev =
    process.env.NODE_ENV === 'development' || process.env.DEVMODE === 'true';

  return isDev;
}
