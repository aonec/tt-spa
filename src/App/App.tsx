import React, { FC } from 'react';
import { Bootstrap } from './Bootstrap';
import { RouterContainer } from './routerService';
import 'moment/locale/ru';
import '01/css/index.scss';
import '01/css/styles.css';

export const App: FC = () => {
  return (
    <Bootstrap>
      <RouterContainer />
    </Bootstrap>
  );
};
