import { ReactNode } from 'react';

export type CommonInfoProps = {
  items: CommonInfoItem[];
  className?: string;
  isLoading?: boolean;
};

export type CommonInfoItem = {
  key: string;
  value: ReactNode;
  hidden?: boolean;
};
