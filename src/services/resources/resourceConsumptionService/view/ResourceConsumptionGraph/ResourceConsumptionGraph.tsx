import { CustomTooltip } from '01/_pages/Graph/components/CustomTooltip';
import Gradient from '01/_pages/Graph/components/Gradient';
import {
  horizontalAxisStyle,
  verticalAxisStyle,
} from '01/_pages/Graph/components/GraphView/GraphView.styled';
import { TickComponent } from '01/_pages/Graph/components/TickComponent';
import React, { FC, useEffect, useMemo, useState } from 'react';
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
  ResourceConsumptionGraphMonth,
  ResourceConsumptionGraphType,
} from '../../resourceConsumptionService.types';
import { ResourceConsumptionGraphColorsMeasure } from './ResourceConsumptionGraph.constants';
import {
  getCurrentDataStyle,
  Wrapper,
  ZeroLineStyle,
} from './ResourceConsumptionGraph.styled';
import { ResourceConsumptionGraphProps } from './ResourceConsumptionGraph.types';
import {
  getGraphTypeColors,
  getMinAndMaxForResourceConsumptionGraph,
} from './ResourceConsumptionGraph.utils';
import { ResourceConsumptionGraphTooltip } from './ResourceConsumptionGraphTooltip';

const height = 360;

export const ResourceConsumptionGraph: FC<ResourceConsumptionGraphProps> = ({
  consumptionData,
  resource,
  startOfMonth,
  checked,
}) => {
  const [width, setWidth] = useState(0);

  const lines = useMemo(
    () =>
      Object.values(ResourceConsumptionGraphMonth).map((month) => {
        if (!consumptionData || !resource) {
          return null;
        }

        const monthData = consumptionData[month];
        const monthChecked = checked[month];

        return Object.entries(monthData).map(([key, data]) => {
          const isCurrentMonthHousingData =
            month === ResourceConsumptionGraphMonth.currentMonthData &&
            key === ResourceConsumptionGraphType.Housing;

          if (
            monthChecked[key as ResourceConsumptionGraphType] &&
            !isCurrentMonthHousingData
          ) {
            return (
              <VictoryLine
                key={key}
                data={data}
                interpolation="monotoneX"
                x="key"
                y="value"
                style={{
                  data: {
                    stroke: getGraphTypeColors({
                      resource,
                      type: key as ResourceConsumptionGraphType,
                      isOpacityNeed:
                        month === ResourceConsumptionGraphMonth.prevMonthData,
                    }),
                    strokeWidth: 2,
                  },
                }}
              />
            );
          }
          return null;
        });
      }),
    [consumptionData, resource, checked]
  );

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
    !consumptionData ||
    consumptionData.currentMonthData.housing.length === 0 ||
    !resource
  ) {
    return <GraphEmptyData />;
  }
  const { currentMonthData, prevMonthData } = consumptionData;

  const { maxValue, minValue } = getMinAndMaxForResourceConsumptionGraph(
    [...Object.values(currentMonthData), ...Object.values(prevMonthData)].map(
      prepareData
    )
  );

  return (
    <Wrapper id="graphWrapper">
      <Gradient resource={resource} />

      <VictoryChart
        padding={{ top: 0, bottom: 0, left: 26, right: 0 }}
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
          labelComponent={<VictoryLabel renderInPortal dy={7} dx={-16} />}
          y={() => 0}
          style={ZeroLineStyle}
        />
        {lines}
        {checked.currentMonthData.housing && (
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
                height={height}
                flyoutComponent={
                  <ResourceConsumptionGraphTooltip
                    startOfMonth={startOfMonth}
                    measure={ResourceConsumptionGraphColorsMeasure[resource]}
                  />
                }
                minValue={minValue}
                maxValue={maxValue}
              />
            }
          />
        )}
      </VictoryChart>
    </Wrapper>
  );
};
