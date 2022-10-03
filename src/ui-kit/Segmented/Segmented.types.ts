import { ReactElement } from 'react';

export type SegmentItem = {
  title: string;
  name: string;
  icon?: ReactElement;
};

export type SegmentedProps = {
  items: SegmentItem[];
  active: string;
};
