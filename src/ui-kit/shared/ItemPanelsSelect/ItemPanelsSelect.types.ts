import { ReactNode } from 'react';

export type SelectPanelItem<T> = {
  title: string;
  key: T;
  icon: ReactNode;
};

type SelectedItemPanel<T> = T[] | T | null;

export type ItemPanelsSelectProps<T extends string | null> = {
  items: SelectPanelItem<T>[];
  selected: SelectedItemPanel<T>;
  onChange?: (value: SelectedItemPanel<T>) => void;
};
