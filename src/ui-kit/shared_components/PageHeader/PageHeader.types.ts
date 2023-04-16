import { ContextMenuButtonProps } from 'ui-kit/ContextMenuButton/ContextMenuButton.types';
import { ReactNode } from 'react';

export type PageHeaderProps = {
  title: ReactNode;
  contextMenu?: ContextMenuButtonProps;
  isGhost?: boolean;
  children?: ReactNode;
  className?: string;
};
