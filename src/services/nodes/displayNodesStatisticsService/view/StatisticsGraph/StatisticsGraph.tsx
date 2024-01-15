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
import React, { useEffect, useMemo, useState } from 'react';
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
  getPreparedTaskData,
  getTickFormat,
  prepareDataForNodeStatistic,
} from './StatisticsGraph.utils';
import { EResourceType } from 'api/types';
import { renderForHeatAndDeltaMass } from './GraphLegend/GraphLegend.utils';
import { GraphGradient } from 'ui-kit/shared/GraphComponents/GraphGradient';
import { TickComponent } from 'ui-kit/shared/GraphComponents/TickComponent';
import { TaskPoint } from './TaskPoint';
import { CustomTooltip } from 'ui-kit/shared/GraphComponents/CustomTooltip';
import { GraphTooltip } from './GraphTooltip';

const minDelta = 0.01;
const height = 350;

export const GraphView: React.FC<GraphViewProps> = ({
  graphParam,
  data,
  reportType,
  taskStatistics,
  wrapperId,
  withFault,
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

  const preparedArchiveValues = useMemo(() => {
    const archiveValues = requiredArchiveValues?.data;
    if (!archiveValues || archiveValues.length === 0) {
      return null;
    }
    const firstlyPreparedData = prepareData(archiveValues);

    const finallyData =
      firstlyPreparedData &&
      prepareDataForNodeStatistic(firstlyPreparedData, reportType, withFault);

    return finallyData;
  }, [requiredArchiveValues, reportType, withFault]);

  if (!preparedArchiveValues) {
    return <GraphEmptyData />;
  }

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
          data={taskStatistics.map((taskByDate) =>
            getPreparedTaskData({
              taskByDate,
              reportType,
              maxValue,
              minDate: ticksData[0],
              maxDate: ticksData[ticksData.length - 1],
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
          data={preparedArchiveValues}
          x="time"
          y="value"
        />
        {isAverageLineRendered &&
        averageDeltaMass &&
        Number.isFinite(averageDeltaMass) ? (
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
  );
};
