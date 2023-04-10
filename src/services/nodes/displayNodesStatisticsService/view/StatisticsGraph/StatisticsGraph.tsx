import {
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryArea,
  VictoryLine,
  VictoryLabel,
  VictoryScatter,
} from 'victory';
import React, { useEffect, useState } from 'react';
import 'antd/es/date-picker/style/index';
import { GraphViewProps } from './StatisticsGraph.types';
import {
  GraphWrapper,
  horizontalAxisStyle,
  verticalAxisStyle,
} from './StatisticsGraph.styled';
import { GraphEmptyData } from 'services/nodes/displayNodesStatisticsService/view/GraphEmptyData';
import {
  getMinAndMax,
  GraphColorLookup,
  prepareData,
} from '../../../../../utils/Graph.utils';
import {
  formTicks,
  getPreparedData,
  getTickFormat,
} from './StatisticsGraph.utils';
import { EResourceType } from 'myApi';
import { renderForHeatAndDeltaMass } from './GraphLegend/GraphLegend.utils';
import { GraphGradient } from 'ui-kit/shared_components/GraphComponents/GraphGradient';
import { TickComponent } from 'ui-kit/shared_components/GraphComponents/TickComponent';
import { TaskPoint } from './TaskPoint';
import { CustomTooltip } from 'ui-kit/shared_components/GraphComponents/CustomTooltip';
import { GraphTooltip } from './GraphTooltip';
import { GraphLegend } from './GraphLegend';

const minDelta = 0.01;
const height = 350;

export const GraphView: React.FC<GraphViewProps> = ({
  graphParam,
  data,
  reportType,
  taskStatistics,
  wrapperId,
}) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const wrapperNode = document.getElementById(wrapperId);

    if (!wrapperNode) {
      return;
    }

    const handleResize = () => setWidth(wrapperNode?.clientWidth || 0);
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [wrapperId]);

  const { resource, data: readingsData, averageDeltaMass } = data;
  const isAverageLineRendered = renderForHeatAndDeltaMass(
    resource as EResourceType,
    graphParam,
  );

  const requiredArchiveValues = (readingsData || []).find(
    (reading) => reading.header === graphParam,
  );

  const archiveValues = requiredArchiveValues?.data;

  if (!archiveValues || archiveValues.length === 0) {
    return <GraphEmptyData />;
  }

  const preparedArchiveValues = prepareData(archiveValues);

  const archiveLength = preparedArchiveValues.length;

  const tickValues = formTicks(preparedArchiveValues, reportType);
  const ticksData = tickValues.map((tick) => tick.time);

  const measure = requiredArchiveValues?.measure;

  const { maxValue, minValue } = getMinAndMax(preparedArchiveValues, minDelta);

  const tooltipStyle = {
    parent: { overflow: 'visible' },
    data: {
      fill: `url(#${data.resource})`,
      stroke: GraphColorLookup[resource as EResourceType],
      strokeWidth: 2,
    },
  };

  return (
    <>
      <GraphWrapper>
        <GraphGradient resource={resource as EResourceType} />

        <VictoryChart
          domain={{ y: [minValue, maxValue] }}
          width={width}
          height={height}
          theme={VictoryTheme.material}
          style={{
            parent: {
              width: width,
              height: height,
              overflow: 'visible',
            },
          }}
          containerComponent={<VictoryVoronoiContainer />}
        >
          <VictoryAxis
            tickComponent={<TickComponent />}
            tickFormat={(x) =>
              ticksData.includes(x)
                ? getTickFormat(archiveLength, reportType, x)
                : ''
            }
            style={horizontalAxisStyle}
          />
          <VictoryAxis dependentAxis style={verticalAxisStyle} />
          <VictoryLine
            samples={1}
            labels={['0', ``]}
            labelComponent={<VictoryLabel renderInPortal dx={-17} dy={7} />}
            y={() => 0}
            style={{
              data: {
                stroke: 'var(--frame)',
              },
              labels: {
                fill: '#272F5AB2',
              },
            }}
          />

          <VictoryScatter
            data={taskStatistics.map((tasksByDate) =>
              getPreparedData({
                tasksByDate,
                reportType,
                maxValue,
                minData: ticksData[0],
              }),
            )}
            sortKey="x"
            dataComponent={<TaskPoint />}
          />

          <VictoryArea
            name="graph"
            sortKey="time"
            interpolation="monotoneX"
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
                flyoutComponent={<GraphTooltip measure={measure || ''} />}
                minValue={minValue}
                maxValue={maxValue}
              />
            }
            labels={() => ''}
            style={tooltipStyle}
            data={archiveValues}
            x="time"
            y="value"
          />
          {isAverageLineRendered && Number.isFinite(averageDeltaMass) ? (
            <VictoryLine
              samples={1}
              y={() => averageDeltaMass}
              style={{
                data: {
                  stroke: 'var(--main-100)',
                },
              }}
            />
          ) : null}
        </VictoryChart>
      </GraphWrapper>
      <GraphLegend
        graphParam={graphParam}
        isTasksExist={taskStatistics.length !== 0}
        resource={resource}
        averageDeltaMass={data.averageDeltaMass}
        deltaMassAccuracy={data.deltaMassAccuracy}
      />
    </>
  );
};