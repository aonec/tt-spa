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
import styled from 'styled-components';
import GraphTooltip from './GraphTooltip';
import { CustomTooltip } from './CustomTooltip';
import Gradient from './Gradient';
import { getResourceColor } from '../../../utils/getResourceColor';
import { minBy, maxBy, get } from 'lodash';
import 'antd/es/date-picker/style/index';
import { formGraphData, formTicks, getTickFormat } from '../utils';
import { GraphParamsType } from '../Graph';
import { RequestNodeReadingsFunctionInterface } from '../../../_api/node_readings_page';
import { Alert } from 'antd';
import FallbackGraph from './FallbackGraph.svg';
import GraphLegend from './GraphLegend';
import { TickComponent } from './TickComponent';

const GraphView: React.FC<GraphViewProps> = ({ graphParam, dataObject }) => {
  const {
    data,
    searchQuery: { reportType },
  } = dataObject;

  const { resource, deltaMassAccuracy, averageDeltaMass } = data;

  const archiveEntries = get(data, 'archiveEntries', []);

  const width = 750;
  const height = 350;

  if (archiveEntries.length === 0)
    return (
      <>
        <Alert
          message="Ошибка"
          description="Нет данных за выбранный период. Пожалуйста, измените период для формирования новой статистики."
          type="error"
          showIcon
          closable
          style={{ marginBottom: 24 }}
        />
        <div>
          <img src={FallbackGraph} alt="546" />
        </div>
      </>
    );

  const tickValues = formTicks(archiveEntries, reportType);

  const ticksData = tickValues.map((tick) => tick.timestamp);

  const graphData = formGraphData(archiveEntries, graphParam);

  const minElement = minBy(graphData, (obj) => obj.value);
  const maxElement = maxBy(graphData, (obj) => obj.value);

  const minValue = minElement!.value > 0 ? 0 : 1.5 * minElement!.value;
  let maxValue = maxElement!.value < 0 ? 0 : 1.5 * maxElement!.value;

  const minDelta = 0.01;

  if (maxValue === minValue && minValue === 0) maxValue += minDelta;

  const tooltipStyle = {
    parent: { overflow: 'visible' },
    data: {
      fill: `url(#${data.resource})`,
      stroke: getResourceColor(resource),
      strokeWidth: 2,
    },
  };

  const horizontalAxisStyle = {
    axis: { stroke: 'var(--frame)' },
    axisLabel: { strokeWidth: 0 },
    grid: { stroke: 'none' },
    tickLabels: { fill: 'var(--main-70)' },
  };

  const verticalAxisStyle = {
    axis: { stroke: 'none' },
    ticks: { stroke: 'none' },
    tickLabels: { fill: 'var(--main-70)' },
    grid: { stroke: 'var(--frame)', strokeDasharray: '0' },
  };

  return (
    <>
      <GraphWrapper>
        <Gradient resource={resource} />
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
                ? getTickFormat(archiveEntries, reportType, x)
                : ''
            }
            style={horizontalAxisStyle}
          />
          <VictoryAxis dependentAxis style={verticalAxisStyle} />
          <VictoryArea
            name="graph"
            sortKey="time"
            interpolation="natural"
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
            data={graphData}
            x="time"
            y="value"
          />
          {graphParam === 'deltaMass' ? (
            <VictoryLine
              // labels={({ datum }: any) => `y: ${datum.y}`}
              samples={1}
              labels={[
                '',
                // `Среднее значение = ${averageDeltaMass.toFixed(2)} т`,
                ``,
              ]}
              labelComponent={<VictoryLabel renderInPortal dx={80} dy={-20} />}
              y={() => averageDeltaMass}
              style={{
                data: {
                  stroke: 'var(--main-100)',
                },
              }}
            />
          ) : null}
          {/*<VictoryLine*/}
          {/*  style={{*/}
          {/*    data: {*/}
          {/*      stroke: 'black',*/}
          {/*      strokeDasharray: 5.5,*/}
          {/*      strokeWidth: 2,*/}
          {/*      fillOpacity: 0.4,*/}
          {/*    },*/}
          {/*  }}*/}
          {/*  y={() => averageDeltaMass * (1 + deltaMassAccuracy / 100)}*/}
          {/*/>*/}
          {/*<VictoryLine*/}
          {/*  style={{*/}
          {/*    data: {*/}
          {/*      stroke: 'black',*/}
          {/*      strokeDasharray: 5.5,*/}
          {/*      strokeWidth: 2,*/}
          {/*      fillOpacity: 0.4,*/}
          {/*    },*/}
          {/*  }}*/}
          {/*  y={() => averageDeltaMass * (1 - deltaMassAccuracy / 100)}*/}
          {/*/>*/}
        </VictoryChart>
      </GraphWrapper>
      <GraphLegend graphParam={graphParam} />
    </>
  );
};

const GraphWrapper = styled.div`
  svg {
    overflow: visible !important;
  }
`;

export interface ArchiveEntryInterface {
  timestamp: string;
  inputTemperature: number;
  outputTemperature: number;
  deltaTemperature: number;
  inputVolume: number;
  outputVolume: number;
  deltaVolume: number;
  inputMass: number;
  outputMass: number;
  deltaMass: number;
  inputPressure: number;
  outputPressure: number;
  deltaPressure: number;
  energy: number;
  timeWork: number;
}

export type ResourceType =
  | 'Heat'
  | 'ColdWaterSupply'
  | 'HotWaterSupply'
  | 'Electricity';

export interface ReadingsInterface {
  reportType: ReportType;
  resource: ResourceType;
  systemPipeCount: number;
  archiveEntries: ArchiveEntryInterface[];
  averageDeltaMass: number;
  deltaMassAccuracy: number;
}

export interface GraphDataInterface {
  time: string;
  value: number;
}

export type ReportType = 'hourly' | 'daily' | 'monthly';

interface GraphViewProps {
  graphParam: GraphParamsType;
  dataObject: RequestNodeReadingsFunctionInterface;
}

export default GraphView;
