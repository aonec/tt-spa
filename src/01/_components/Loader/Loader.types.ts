import { ReactNode } from 'react';

export type LoaderProps = React.SVGProps<SVGSVGElement> & {
  children?: ReactNode;
  show?: boolean;
  size?: string;
};
