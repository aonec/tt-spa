import React, { FC } from 'react';
import { Bootstrap } from './Bootstrap';
// import { RouterContainer } from './routerService';
import 'dayjs/locale/ru';
import 'css/index.scss';
import 'css/styles.css';
import { BrowserRouter, RouterProvider, useRoutes } from 'react-router-dom';
import { routes } from './routerService/router';

export const App: FC = () => {
  const router = useRoutes(routes);
  return (
    <Bootstrap>
      {/* <BrowserRouter> */}
      {router}
      {/* </BrowserRouter> */}
    </Bootstrap>
  );
};
