import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { stringifyUrl } from 'query-string';

export function useApp() {
  //Протестить
  const history = useNavigate();

  useEffect(() => {
    if (window.location.href.match(/registration/gi)) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      const redirectUrl = window.location.pathname;

      history(stringifyUrl({ url: '/login', query: { redirectUrl } }));
    }
  }, [history]);
}
