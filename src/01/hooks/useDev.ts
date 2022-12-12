import { devUrl } from '01/axios';

export function useIsDev() {
  const isDev =
    process.env.NODE_ENV === 'development' ||
    process.env.REACT_APP_API_URL === devUrl;

  return isDev;
}
