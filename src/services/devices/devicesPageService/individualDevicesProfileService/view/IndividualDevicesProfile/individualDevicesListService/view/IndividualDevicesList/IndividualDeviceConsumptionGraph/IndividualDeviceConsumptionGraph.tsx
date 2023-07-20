import moment from 'moment';
import { EResourceType } from 'api/myApi';
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
import _ from 'lodash';
import { DeviceGraphTick } from './DeviceGraphTick';
import { GraphGradient } from 'ui-kit/shared_components/GraphComponents/GraphGradient';

const height = 50;
const width = 180;
const minDelta = 0.01;

export const IndividualDeviceConsumptionGraph: FC<
  IndividualDeviceConsumptionGraphProps
> = ({ data, resource }) => {
  const preparedData = data.map((elem) => ({
    time: elem.date,
    value: elem.consumption,
  }));

  const { maxValue, minValue } = getMinAndMax(preparedData, minDelta);
  const ticksData = [_.first(preparedData)?.time, _.last(preparedData)?.time];

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
            width,
          },
        }}
        height={height}
        width={width}
        theme={VictoryTheme.material}
        containerComponent={<VictoryVoronoiContainer />}
      >
        <GraphGradient resource={resource as EResourceType} style={{ width }} />

        <VictoryAxis
          style={{
            axis: { stroke: 'none' },
            grid: { stroke: 'none' },
            tickLabels: { fontSize: '10' },
          }}
          offsetY={10}
          tickFormat={(date) =>
            ticksData.includes(date) ? moment(date).format('MMMM') : ''
          }
          tickValues={preparedData
            .map((value) => value.time)
            .sort((first, second) => moment(first).diff(moment(second)))}
          tickComponent={<DeviceGraphTick />}
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
