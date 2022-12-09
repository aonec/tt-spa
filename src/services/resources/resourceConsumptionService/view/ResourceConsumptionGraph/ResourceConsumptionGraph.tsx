import { CustomTooltip } from '01/_pages/Graph/components/CustomTooltip';
import Gradient from '01/_pages/Graph/components/Gradient';
import {
  horizontalAxisStyle,
  verticalAxisStyle,
} from '01/_pages/Graph/components/GraphView/GraphView.styled';
import { TickComponent } from '01/_pages/Graph/components/TickComponent';
import React, { FC, useEffect, useState } from 'react';
import { GraphEmptyData } from 'services/displayNodesStatisticsService/view/GraphEmptyData';
import { prepareData } from 'utils/Graph.utils';
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryTheme,
  VictoryVoronoiContainer,
} from 'victory';
import {
  getCurrentDataStyle,
  Wrapper,
} from './ResourceConsumptionGraph.styled';
import { ResourceConsumptionGraphProps } from './ResourceConsumptionGraph.types';
import { getMinAndMaxForResourceConsumptionGraph } from './ResourceConsumptionGraph.utils';
import { ResourceConsumptionGraphTooltip } from './ResourceConsumptionGraphTooltip';

const height = 360;

export const ResourceConsumptionGraph: FC<ResourceConsumptionGraphProps> = ({
  housingConsumptionData,
  resource,
  startOfMonth,
}) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const wrapperNode = document.getElementById('graphWrapper');

    if (!wrapperNode) {
      return;
    }

    const handleResize = () => setWidth(wrapperNode?.clientWidth || 0);
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (
    !housingConsumptionData ||
    housingConsumptionData.currentMonthData.housing.length === 0 ||
    !resource
  ) {
    return <GraphEmptyData />;
  }

  const { currentMonthData, prevMonthData } = housingConsumptionData;

  const { maxValue, minValue } = getMinAndMaxForResourceConsumptionGraph(
    [...Object.values(currentMonthData), ...Object.values(prevMonthData)].map(
      prepareData
    )
  );

  return (
    <Wrapper id="graphWrapper">
      <Gradient resource={resource} />

      <VictoryChart
        domain={{ y: [minValue, maxValue] }}
        style={{
          parent: {
            overflow: 'visible',
          },
        }}
        height={height}
        width={width}
        theme={VictoryTheme.material}
        containerComponent={<VictoryVoronoiContainer />}
      >
        <VictoryAxis
          tickComponent={<TickComponent />}
          tickFormat={(day) => {
            if (day % 5) {
              return '';
            }
            return day;
          }}
          style={horizontalAxisStyle}
        />
        <VictoryAxis
          dependentAxis
          domain={[minValue, maxValue]}
          style={verticalAxisStyle}
        />
        <VictoryLine
          samples={1}
          labels={['0', ``]}
          labelComponent={<VictoryLabel dx={-17} dy={7} />}
          y={() => 0}
          style={{
            data: {
              stroke: 'var(--frame)',
            },
          }}
        />

        <VictoryArea
          data={currentMonthData.housing}
          x="key"
          y="value"
          interpolation="monotoneX"
          style={getCurrentDataStyle(resource)}
          labels={() => ''}
          labelComponent={
            <CustomTooltip
              flyoutStyle={{ fill: 'var(--main-100)' }}
              style={{ fill: '#fff' }}
              flyoutPadding={{
                top: 8,
                right: 16,
                bottom: 8,
                left: 16,
              }}
              height={height}
              flyoutComponent={
                <ResourceConsumptionGraphTooltip startOfMonth={startOfMonth} />
              }
              minValue={minValue}
              maxValue={maxValue}
            />
          }
        />

        <VictoryLine
          data={prevMonthData.housing}
          interpolation="monotoneX"
          x="key"
          y="value"
        />
      </VictoryChart>
    </Wrapper>
  );
};
