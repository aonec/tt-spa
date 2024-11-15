import { FC } from 'react';
import {
  horizontalAxisStyle,
  verticalAxisStyle,
  Wrapper,
} from './Chart.styled';
import { Props } from './Chart.types';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryVoronoiContainer,
} from 'victory';

export const Chart: FC<Props> = ({ chart }) => {
  const mock = [
    { x: ' ', y: 0 },
    { x: ' ', y: 0 },
    { x: ' ', y: 0 },
    { x: ' ', y: 0 },
    { x: ' ', y: 0 },
  ];
  return (
    <VictoryChart
      domainPadding={{ x: 20 }}
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
      <VictoryAxis style={horizontalAxisStyle} />
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
      />
    </VictoryChart>
  );
};
