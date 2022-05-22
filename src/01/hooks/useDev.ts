export function useIsDev() {
  const isDev =
    process.env.NODE_ENV === 'development' ||
    process.env.REACT_APP_API_URL ===
      'management.staging.transparent-technology.ru/api';

  return isDev;
}
