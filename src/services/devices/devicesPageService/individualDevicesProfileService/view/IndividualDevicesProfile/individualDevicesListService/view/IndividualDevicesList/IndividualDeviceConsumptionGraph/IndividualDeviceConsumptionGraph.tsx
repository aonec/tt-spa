import Gradient from '01/_pages/Graph/components/Gradient';
import moment from 'moment';
import { EResourceType } from 'myApi';
import React, { FC } from 'react';
import { getMinAndMax, GraphColorLookup } from 'utils/Graph.utils';
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryTheme,
  VictoryVoronoiContainer,
} from 'victory';
import { Wrapper } from './IndividualDeviceConsumptionGraph.styled';
import { IndividualDeviceConsumptionGraphProps } from './IndividualDeviceConsumptionGraph.types';

const height = 50;
const width = 150;
const minDelta = 0.01;

export const IndividualDeviceConsumptionGraph: FC<
  IndividualDeviceConsumptionGraphProps
> = ({ data, resource }) => {
  const preparedData = data.map((elem) => ({
    time: elem.date,
    value: elem.consumption,
  }));

  const { maxValue, minValue } = getMinAndMax(preparedData, minDelta);

  const areaStyle = {
    parent: { overflow: 'visible' },
    data: {
      fill: `url(#${resource})`,
      stroke: GraphColorLookup[resource as EResourceType],
      strokeWidth: 1,
    },
  };

  return (
    <Wrapper>
      <VictoryChart
        padding={{ bottom: 0 }}
        domain={{ y: [minValue, maxValue] }}
        style={{
          parent: {
            display: 'flex',
            overflow: 'visible',
          },
        }}
        height={height}
        width={width}
        theme={VictoryTheme.material}
        containerComponent={<VictoryVoronoiContainer />}
      >
        <Gradient resource={resource as EResourceType} style={{ width }} />

        <VictoryAxis
          style={{
            axis: { stroke: 'none' },
            grid: { stroke: 'none' },
            ticks: { stroke: 'none' },
            tickLabels: { fontSize: '10' },
          }}
          offsetY={10}
          tickFormat={(date) => moment(date).format('MM.YY')}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: 'none' },
            grid: { stroke: 'none' },
            ticks: { stroke: 'none' },
            tickLabels: { stroke: 'none' },
          }}
          tickFormat={() => ''}
        />
        <VictoryArea
          name="individualDevice"
          sortKey="time"
          interpolation="monotoneX"
          style={areaStyle}
          data={preparedData}
          x="time"
          y="value"
        />
      </VictoryChart>
    </Wrapper>
  );
};
