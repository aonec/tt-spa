import React, { FC, useEffect } from 'react';
import { Bootstrap } from './Bootstrap';
import {
  useLocation,
  useNavigate,
  useRoutes as useRouter,
} from 'react-router-dom';
import { useUnit } from 'effector-react';
import 'dayjs/locale/ru';
import 'css/index.scss';
import 'css/styles.css';
import { useRoutes } from './router/router';
import { currentUserService } from 'services/currentUser/currentUserService';
import { loginService } from 'services/authorizations/loginService';
import { parse } from 'query-string';

const { outputs } = currentUserService;

export const App: FC = () => {
  const roles = useUnit(outputs.$currentUserRoles);

  const routes = useRoutes(roles);

  const router = useRouter(routes);

  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(
    () =>
      loginService.inputs.successLogin.watch((successResponse) => {
        const { redirectUrl } = parse(search);
        if (redirectUrl && redirectUrl !== '/login') {
          return window.location.replace(redirectUrl as string | URL);
        }

        const isOperator =
          successResponse?.roles?.includes('Operator') ||
          successResponse.roles?.includes('SeniorOperator');

        const isSupervisor = successResponse?.roles?.includes('Supervisor');

        if (isSupervisor) {
          navigate(`/supervisor`);

          return;
        }

        navigate(isOperator ? '/meters' : '/tasks', {
          replace: true,
        });
      }).unsubscribe,
    [navigate, search],
  );

  return <Bootstrap>{router}</Bootstrap>;
};
