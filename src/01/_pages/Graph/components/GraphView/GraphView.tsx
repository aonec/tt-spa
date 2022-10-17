import {
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryArea,
  VictoryLine,
  VictoryLabel,
} from 'victory';
import React from 'react';
import { minBy, maxBy, get } from 'lodash';
import 'antd/es/date-picker/style/index';
import {
  GraphViewProps,
  PreparedArchiveValues,
  ResourceType,
} from './GraphView.types';
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

const minDelta = 0.01;
const width = 730;
const height = 350;

export const GraphView: React.FC<GraphViewProps> = ({
  graphParam,
  data,
  reportType,
}) => {
  const { resource, data: readingsData } = data;

  const archiveValues = (readingsData || []).find(
    (reading) => reading.header === graphParam
  )?.data;

  if (!archiveValues || archiveValues.length === 0) {
    return null;
  }

  const preparedArchiveValues = archiveValues.reduce((acc, reading) => {
    if (!reading?.time || !reading.value) {
      return acc;
    }
    return [...acc, reading as PreparedArchiveValues];
  }, [] as PreparedArchiveValues[]);

  const tickValues = formTicks(preparedArchiveValues, reportType);

  const ticksData = tickValues.map((tick) => tick.time);

  const minElement = minBy(preparedArchiveValues, (obj) => obj.value);
  const maxElement = maxBy(preparedArchiveValues, (obj) => obj.value);

  let minValue = minElement!.value > 0 ? 0 : 1.5 * minElement!.value;
  let maxValue = maxElement!.value < 0 ? 0 : 1.5 * maxElement!.value;

  if (maxValue === minValue && minValue === 0) maxValue += minDelta;
  if (maxValue / 2 > Math.abs(minValue) && minValue < 0) {
    minValue = -maxValue / 2;
  }

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
          padding={{ top: 0, bottom: 0, left: 26, right: 0 }}
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
                ? getTickFormat(preparedArchiveValues, reportType, x)
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
            }}
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
                flyoutComponent={<GraphTooltip graphParam={graphParam} />}
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
        </VictoryChart>
      </GraphWrapper>
      <GraphLegend graphParam={graphParam} />
    </>
  );
};
