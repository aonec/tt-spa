import { Tooltip } from 'antd';
import dayjs from 'api/dayjs';
import React, { FC } from 'react';
import { LineSegment } from 'victory';
import { TickWrapper } from './DeviceGraphTick.styled';
import { DeviceGraphTickProps } from './DeviceGraphTick.types';

const padding = 2;
const lineHeight = 6;

export const DeviceGraphTick: FC<DeviceGraphTickProps> = ({
  index,
  stringTicks,
  y1,
  ...props
}) => {
  const ticksCount = (stringTicks || []).length;

  if (!y1 || !ticksCount || index === 0 || index === ticksCount - 1) {
    return null;
  }
  const formattedY1 = y1 + 10;
  const y2 = formattedY1 + lineHeight;

  const tick = (
    <LineSegment
      {...props}
      y2={y2}
      y1={formattedY1}
      style={{ stroke: 'var(--frame)' }}
    />
  );

  if (!stringTicks || !index) {
    return tick;
  }

  const currentMonth = stringTicks[index];

  const x1 = (props as { x1: number }).x1;

  return (
    <g>
      <Tooltip title={dayjs(currentMonth).format('MMMM')}>
        <g>
          {tick}
          <TickWrapper
            x={x1 - padding}
            y={formattedY1 - padding}
            height={lineHeight + 2 * padding}
            width={3 * padding}
          />
        </g>
      </Tooltip>
    </g>
  );
};
