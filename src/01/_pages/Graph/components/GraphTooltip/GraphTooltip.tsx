import React from 'react';
import { format } from 'date-fns';
import { GraphParamsType } from '../../Graph';
import { DateBlock, Pointer, TooltipBlock, Value } from './GraphTooltip.styled';
import { GraphTooltipProps } from './Graphtooltip.types';

const formatDate = (timeStamp: string): Date => {
  const dateObject = new Date(timeStamp);
  const millisecondsInHour = 60 * 1000;
  const date = new Date(
    dateObject.valueOf() + dateObject.getTimezoneOffset() * millisecondsInHour
  );
  return date;
};

const meteringUnits: Partial<
  { [key in GraphParamsType]: 'ГКал' | 'т' | 'м³' | '℃' }
> = {
  energy: 'ГКал',
  inputMass: 'т',
  outputMass: 'т',
  deltaMass: 'т',
  inputVolume: 'м³',
  outputVolume: 'м³',
  deltaVolume: 'м³',
  inputTemperature: '℃',
  outputTemperature: '℃',
};

export const GraphTooltip: React.FC<GraphTooltipProps> = (props) => {
  const { datum, x, y, graphParam } = props;
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
          <DateBlock>{format(formatDate(datum!.time), 'dd.MM.yyyy')}</DateBlock>
          <Value>
            {datum!.value.toFixed(3)} {meteringUnits[graphParam]}
          </Value>
          <Pointer value={datum!.value} />
        </TooltipBlock>
      </foreignObject>
    </g>
  );
};
