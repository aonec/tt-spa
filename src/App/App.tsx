import React, { FC } from 'react';
import { Bootstrap } from './Bootstrap';
import { RouterContainer } from './routerService';

export const App: FC = () => {
  return (
    <Bootstrap>
      <RouterContainer />
    </Bootstrap>
  );
};
