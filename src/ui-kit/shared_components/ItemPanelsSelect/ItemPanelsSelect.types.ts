import { ReactNode } from 'react';

export type SelectPanelItem<T> = {
  title: string;
  key: T;
  icon: ReactNode;
};

export type ItemPanelsSelectProps<T extends string> = {
  items: SelectPanelItem<T>[];
  selected: T[] | T | null;
  onChange?: (value: T | T[]) => void;
};
