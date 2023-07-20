import React, { FC } from 'react';
import { Bootstrap } from './Bootstrap';
import { RouterContainer } from './routerService';
import 'moment/locale/ru';
import 'css/index.scss';
import 'css/styles.css';

export const App: FC = () => {
  return (
    <Bootstrap>
      <RouterContainer />
    </Bootstrap>
  );
};
