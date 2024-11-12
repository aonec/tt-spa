import { FC } from 'react';
import { Props } from './MalfunctionIcon.types';
import { MalfunctionIcons } from './MalfunctionIcon.constants';

export const MalfunctionIcon: FC<Props> = ({ type }) => {
  return <>{MalfunctionIcons[type]}</>;
};
