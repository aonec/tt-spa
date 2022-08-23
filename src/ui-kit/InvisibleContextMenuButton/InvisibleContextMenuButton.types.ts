import { SizeType } from 'antd/lib/config-provider/SizeContext';

export type InvisibleContextMenuButtonProps = {
  menuButtons?: ContextMenuElement[];
  disabled?: boolean;
};

export type ContextMenuElement = {
  title: string;
  onClick(): void;
  hidden?: boolean;
  color?: Color;
};

export enum Color {
  default = 'rgba(39, 47, 90, 0.9)',
  disabled = 'rgba(39, 47, 90, 0.32)',
  black = 'rgba(39, 47, 90, 0.9)',
  red = '#FC525B',
}
