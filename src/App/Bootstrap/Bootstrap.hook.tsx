import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { stringifyUrl } from 'query-string';

export function useApp() {
  const { push } = useHistory();

  useEffect(() => {
    if (window.location.href.match(/registration/gi)) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      const redirectUrl = window.location.pathname;

      push(stringifyUrl({ url: '/login', query: { redirectUrl } }));
    }
  }, [push]);
}
