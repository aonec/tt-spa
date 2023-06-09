import { SizeType } from 'antd/lib/config-provider/SizeContext';

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
};

export type ContextMenuElement = {
  title: string;
  onClick(): void;
  hidden?: boolean;
  color?: ContextMenuButtonColor;
};
