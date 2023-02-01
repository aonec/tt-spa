import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { stringifyUrl } from 'query-string';

export function useApp() {
  const { push } = useHistory();

  useEffect(() => {
    if (window.location.href.match(/registration/gi)) {
      return;
    }

    const redirectUrl = window.location.pathname;
    const redirectToLoginUrl =
      redirectUrl && redirectUrl !== '/login'
        ? stringifyUrl({ url: '/login', query: { redirectUrl } })
        : '/login';

    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.clear();
      push(redirectToLoginUrl);
    }
  }, [push]);
}
