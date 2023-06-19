import { ReactNode } from 'react';

export type LinkPanelProps = {
  text: string;
  link: string;
  icon: ReactNode;
  additionalInfo?: ReactNode;
};
