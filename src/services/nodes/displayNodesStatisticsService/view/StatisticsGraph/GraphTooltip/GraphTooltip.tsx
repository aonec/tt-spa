import React from 'react';
import { DateBlock, Pointer, TooltipBlock, Value } from './GraphTooltip.styled';
import { GraphTooltipProps } from './Graphtooltip.types';
import dayjs from 'dayjs';

export const GraphTooltip: React.FC<GraphTooltipProps> = (props) => {
  const { datum, x, y, measure } = props;

  return (
    <g style={{ pointerEvents: 'none' }}>
      <foreignObject
        x={x}
        y={y}
        width="100%"
        height="100%"
        style={{ overflow: 'visible' }}
      >
        <TooltipBlock value={datum!.value}>
          <DateBlock>{dayjs(datum?.timeUtc).format('DD.MM.YYYY')}</DateBlock>
          <Value>
            {datum!.value.toFixed(3)} {measure}
          </Value>
          <Pointer value={datum!.value} />
        </TooltipBlock>
      </foreignObject>
    </g>
  );
};
