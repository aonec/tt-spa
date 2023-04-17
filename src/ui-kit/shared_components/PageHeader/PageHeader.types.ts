import { ReactNode } from 'react';
import { ContextMenuButtonProps } from '../../../01/shared/ui/ContextMenuButton';

export type PageHeaderProps = {
  title: ReactNode;
  contextMenu?: ContextMenuButtonProps;
  isGhost?: boolean;
  children?: ReactNode;
  className?: string;
};
