import {
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryArea,
  VictoryLine,
  VictoryLabel,
  VictoryScatter,
  VictoryPortal,
} from 'victory';
import React from 'react';
import 'antd/es/date-picker/style/index';
import { GraphViewProps, ResourceType } from './GraphView.types';
import { formTicks, getTickFormat } from '../../utils';
import Gradient from '../Gradient';
import { TickComponent } from '../TickComponent';
import { CustomTooltip } from '../CustomTooltip';
import {
  GraphWrapper,
  horizontalAxisStyle,
  verticalAxisStyle,
} from './GraphView.styled';
import { getResourceColor } from '01/utils/getResourceColor';
import { GraphTooltip } from '../GraphTooltip/GraphTooltip';
import { GraphLegend } from '../GraphLegend/GraphLegend';
import { GraphEmptyData } from 'services/displayNodesStatisticsService/view/GraphEmptyData';
import { renderForHeatAndDeltaMass } from '../GraphLegend/GraphLegend.utils';
import { getMinAndMax, prepareData } from '../../../../../utils/Graph.utils';
import moment from 'moment';

const minDelta = 0.01;
const width = 730;
const height = 350;

export const GraphView: React.FC<GraphViewProps> = ({
  graphParam,
  data,
  reportType,
  taskStatistics,
}) => {
  const { resource, data: readingsData, averageDeltaMass } = data;
  const isAverageLineRendered = renderForHeatAndDeltaMass(
    resource as ResourceType,
    graphParam
  );

  const requiredArchiveValues = (readingsData || []).find(
    (reading) => reading.header === graphParam
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
      stroke: getResourceColor(resource as ResourceType),
      strokeWidth: 2,
    },
  };

  return (
    <>
      <GraphWrapper>
        <Gradient resource={resource as ResourceType} />

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
          <VictoryPortal>
            <VictoryScatter
              data={taskStatistics.map((elem) => ({
                x: moment(elem.key).utc(true).diff(moment(ticksData[0]), 'h') +1,
                y: maxValue * 0.9,
                amount: (elem.value || []).length,
              }))}
              sortKey="x"
              size={8}
              labels={({ datum }) => datum.amount}
              labelComponent={<VictoryLabel dy={5} />}
              style={{
                data: { fill: '#272F5A' },
                labels: { fill: 'white', fontSize: '10px' },
              }}
            />
          </VictoryPortal>
          {taskStatistics.map((elem) => {
            const x =
              moment(elem.key).utc(true).diff(moment(ticksData[0]), 'h') + 1;
            return (
              <VictoryLine
                data={[
                  { x, y: 0 },
                  { x, y: maxValue * 0.9 },
                ]}
                style={{
                  data: {
                    stroke: '#DCDEE4',
                    strokeWidth: 1.5,
                    borderStyle: 'dashed',
                    strokeDasharray: 5,
                  },
                }}
              />
            );
          })}
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
      <GraphLegend graphParam={graphParam} />
    </>
  );
};
