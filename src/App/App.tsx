import React, { FC, useMemo } from 'react';
import { Bootstrap } from './Bootstrap';
// import { RouterContainer } from './routerService';
import 'dayjs/locale/ru';
import 'css/index.scss';
import 'css/styles.css';
import { BrowserRouter, RouterProvider, useRoutes } from 'react-router-dom';
import { getRoutes } from './routerService/router';
import { currentUserService } from 'services/currentUserService';
import { useStore } from 'effector-react';

const { outputs } = currentUserService;

export const App: FC = () => {
  const roles = useStore(outputs.$currentUserRoles);

  const routes = useMemo(() => getRoutes(roles), [roles]);

  const router = useRoutes(routes);

  return <Bootstrap>{router}</Bootstrap>;
};
