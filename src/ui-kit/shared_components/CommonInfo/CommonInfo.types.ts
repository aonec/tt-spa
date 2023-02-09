import { ReactNode } from 'react';

export type CommonInfoProps = {
  items: CommonInfoItem[];
};

export type CommonInfoItem = {
  key: string;
  value: ReactNode;
  hidden?: boolean;
};
