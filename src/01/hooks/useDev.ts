export function useIsDev() {
  console.log(process.env.DEVMODE, process.env);

  const isDev =
    process.env.NODE_ENV === 'development' || process.env.DEVMODE === 'true';

  return isDev;
}
