import { ReactNode } from 'react';

export type AlertProps = {
  icon?: AlertIconType;
  type?: AlertType;
  children?: ReactNode;
  centered?: boolean;
};

export enum AlertIconType {
  info = 'info',
  stop = 'stop',
  warning = 'warning',
  incorrect = 'incorrect',
}

export enum AlertType {
  default = 'default',
  danger = 'danger',
}

export const AlertColorLookup: { [key in AlertType]: string } = {
  [AlertType.default]: '#189ee9',
  [AlertType.danger]: '#FC525B',
};
