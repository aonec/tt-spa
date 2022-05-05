import { CSSProperties, FC } from 'react';

export type IconTTProps = {
  icon: string;
  style?: CSSProperties;
};

export type Icons = {
  [key: string]: FC;
};
