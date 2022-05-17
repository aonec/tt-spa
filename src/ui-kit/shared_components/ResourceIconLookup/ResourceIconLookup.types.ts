import { CSSProperties, FC } from 'react';

export type ResourceIconLookupProps = {
  icon: string;
  style?: CSSProperties;
};

export type Icons = {
  [key: string]: FC;
};
