import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { stringifyUrl } from 'query-string';

export function useApp() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.href.match(/registration/gi)) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      const redirectUrl = window.location.pathname;

      navigate(stringifyUrl({ url: '/login', query: { redirectUrl } }));
    }
  }, [navigate]);
}
