import { FC, useMemo } from 'react';
import { horizontalAxisStyle, verticalAxisStyle } from './Chart.styled';
import { Props } from './Chart.types';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
} from 'victory';
import { TickComponent } from 'ui-kit/shared/GraphComponents/TickComponent';
import { getMax } from './Chart.utils';

export const Chart: FC<Props> = ({ chart }) => {
  const mock = [{ x: ' ', y: 0 }];

  const maxY = useMemo(() => {
    return getMax(chart);
  }, [chart]);

  return (
    <VictoryChart
      domainPadding={{ x: 40 }}
      theme={VictoryTheme.material}
      width={600}
      height={300}
      style={{
        parent: {
          overflow: 'visible',
        },
      }}
      domain={maxY ? { y: [0, maxY] } : undefined}
    >
      <VictoryAxis
        style={horizontalAxisStyle}
        tickComponent={<TickComponent />}
      />
      <VictoryAxis
        dependentAxis
        style={verticalAxisStyle}
        tickFormat={(tick) => {
          if (tick % 1 === 0) {
            return tick;
          }
        }}
      />

      <VictoryBar
        style={{ data: { fill: 'rgba(24, 158, 233, 1)' } }}
        data={chart || mock}
        barWidth={40}
        cornerRadius={2}
        labelComponent={
          <VictoryTooltip
            flyoutWidth={40}
            cornerRadius={2}
            style={{ stroke: '#fff' }}
            flyoutStyle={{
              fill: ' rgb(39, 47, 90)',
            }}
          />
        }
      />
    </VictoryChart>
  );
};
