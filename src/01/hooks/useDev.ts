export function useIsDev() {

  const isDev =
    process.env.NODE_ENV === 'development' ||
    process.env.REACT_APP_API_URL ===
      'https://transparent-staging.herokuapp.com/api';

  return isDev;
}
