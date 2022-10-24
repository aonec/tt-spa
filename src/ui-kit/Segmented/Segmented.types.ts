import { ReactElement } from 'react';

export type SegmentItem<T> = {
  title?: string;
  name: T;
  icon: ReactElement;
};

export type SegmentedProps<T extends string> = {
  items: SegmentItem<T>[];
  active: T;
  onChange: (segmentName: T) => void;
};
