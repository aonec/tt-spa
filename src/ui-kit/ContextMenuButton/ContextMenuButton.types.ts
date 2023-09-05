import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { ReactNode } from 'react';

export enum ContextMenuButtonColor {
  primary = 'primary',
  danger = 'danger',
}

export const ContextMenuButtonColorsLookup: {
  [key in ContextMenuButtonColor]: string;
} = {
  [ContextMenuButtonColor.danger]: '#FC525B',
  [ContextMenuButtonColor.primary]: '#272f5ae6',
};

export type ContextMenuButtonProps = {
  menuButtons?: ContextMenuElement[];
  disabled?: boolean;
  size?: SizeType;
  isVisible?: boolean;
  children?: (isOpen: boolean) => ReactNode;
};

export type ContextMenuElement = {
  title: ReactNode;
  onClick?: () => void;
  hidden?: boolean;
  color?: ContextMenuButtonColor;
  id?: string;
  children?: ContextMenuElement[];
};
