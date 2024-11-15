import { FC } from 'react';
import { horizontalAxisStyle, verticalAxisStyle } from './Chart.styled';
import { Props } from './Chart.types';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryVoronoiContainer,
} from 'victory';
import { TickComponent } from 'ui-kit/shared/GraphComponents/TickComponent';

export const Chart: FC<Props> = ({ chart }) => {
  const mock = [{ x: ' ', y: 0 }];
  return (
    <VictoryChart
      domainPadding={{ x: 40 }}
      theme={VictoryTheme.material}
      width={500}
      height={200}
      style={{
        parent: {
          overflow: 'visible',
        },
      }}
      containerComponent={<VictoryVoronoiContainer />}
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
        // domainPadding={400}
      />

      <VictoryBar
        style={{ data: { fill: 'rgba(24, 158, 233, 1)' } }}
        data={chart || mock}
        barWidth={40}
        // barRatio={1}
        cornerRadius={2}
        labels={({ datum }) => datum.y}
      />
    </VictoryChart>
  );
};
