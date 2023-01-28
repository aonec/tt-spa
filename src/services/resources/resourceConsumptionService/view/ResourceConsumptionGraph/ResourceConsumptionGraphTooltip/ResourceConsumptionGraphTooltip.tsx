import {
  DateBlock,
  Pointer,
  TooltipBlock,
} from '01/_pages/Graph/components/GraphTooltip/GraphTooltip.styled';
import moment from 'moment';
import React, { FC } from 'react';
import { Value } from './ResourceConsumptionGraphTooltip.styled';
import { ResourceConsumptionGraphTooltipProps } from './ResourceConsumptionGraphTooltip.types';

export const ResourceConsumptionGraphTooltip: FC<ResourceConsumptionGraphTooltipProps> = ({
  x,
  y,
  datum,
  startOfMonth,
  measure,
}) => {
  const key = Number(datum?.key || 0);
  const value = datum?.value || 0;

  return (
    <g style={{ pointerEvents: 'none' }}>
      <foreignObject
        x={x}
        y={y}
        width="100%"
        height="100%"
        style={{ overflow: 'visible' }}
      >
        <TooltipBlock value={value}>
          <DateBlock>
            {moment(startOfMonth)
              .add(Number(key) - 1, 'day')
              .format('DD.MM.yyyy')}
          </DateBlock>
          <Value>
            Общедомовое потребление {value.toFixed(3)} {measure}
          </Value>
          <Pointer value={value} />
        </TooltipBlock>
      </foreignObject>
    </g>
  );
};
