import { ReactNode } from 'react';
import { ContextMenuButtonProps } from '../ContextMenuButton';

export type PageHeaderProps = {
  title: ReactNode;
  contextMenu?: ContextMenuButtonProps;
  isGhost?: boolean;
  children?: ReactNode;
  className?: string;
};
