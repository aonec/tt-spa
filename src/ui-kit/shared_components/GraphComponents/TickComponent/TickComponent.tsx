import React from 'react';
import { TickComponentProps } from './TickComponent.types';
import { LineSegment } from 'victory';

export const TickComponent = (props: TickComponentProps) => {
  const { y1 } = props;
  let y2;

  if (!y1) {
    return null;
  }
  if (y1 !== 300) {
    y2 = y1 + 5;
  } else {
    y2 = y1 - 5;
  }
  return <LineSegment {...props} y2={y2} style={{ stroke: 'var(--frame)' }} />;
};
