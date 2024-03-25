import React, { FC, useMemo } from 'react';
import { Bootstrap } from './Bootstrap';
import { useRoutes } from 'react-router-dom';
import { useUnit } from 'effector-react';
import 'dayjs/locale/ru';
import 'css/index.scss';
import 'css/styles.css';
import { getRoutes } from './router/router';
import { currentUserService } from 'services/currentUserService';

const { outputs } = currentUserService;

export const App: FC = () => {
  const roles = useUnit(outputs.$currentUserRoles);

  const routes = useMemo(() => getRoutes(roles), [roles]);

  const router = useRoutes(routes);

  return <Bootstrap>{router}</Bootstrap>;
};
