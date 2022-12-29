import { ReactNode } from 'react';

export type CommonInfoProps = {
  items: {
    key: string;
    value: ReactNode;
    hidden?: boolean;
  }[];
};
