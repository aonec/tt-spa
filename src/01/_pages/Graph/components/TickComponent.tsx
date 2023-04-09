import { LineSegment, VictoryAxisProps } from 'victory';
import React from 'react';

type TickComponentProps = VictoryAxisProps & {
  y1?: number;
};

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
