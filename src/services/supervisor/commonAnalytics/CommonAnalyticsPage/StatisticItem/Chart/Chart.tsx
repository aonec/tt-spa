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
import dayjs from 'dayjs';

export const Chart: FC<Props> = ({ chart }) => {
  const chartData = chart?.map((chart) => ({
    x: dayjs(chart.date)
      .format('DD MMMM')
      .replace(/(\d+)\s([а-яА-Я]{3})[а-яА-Я]*/u, '$1 $2'),

    y: chart.value,
  }));

  console.log(chartData, chart);

  const mock = [
    { x: '1 авг', y: 2 },
    { x: '2 авг', y: 5 },
    { x: '3 авг', y: 10 },
    { x: '4 авг', y: 0 },
    { x: '5 авг', y: 12 },
    { x: '6 авг', y: 0 },
    { x: '7 авг', y: 7 },
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
        tickFormat={(tick) => tick}
      />
      <VictoryBar
        style={{ data: { fill: 'rgba(24, 158, 233, 1)' } }}
        data={chartData}
      />
    </VictoryChart>
  );
};
