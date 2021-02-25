import {
    VictoryChart,
    VictoryAxis,
    VictoryTheme,
    VictoryVoronoiContainer, VictoryArea,
} from 'victory';
import React, {useMemo} from "react";
import styled from "styled-components";
import GraphTooltip from "./GraphTooltip";
import {CustomTooltip} from "./CustomTooltip";
import Gradient from "./Gradient";
import {getResourceColor} from "../../../utils/getResourceColor";
import maxBy from 'lodash/maxBy';
import _ from "lodash";
import 'antd/es/date-picker/style/index';
import {formTicks, getTickFormat} from "../utils";
import {GraphParamsType} from "../Graph";
import {RequestNodeReadingsFunctionInterface} from "../../../_api/node_readings_page";

const GraphView: React.FC<GraphViewProps> = ({graphParam, dataObject}) => {

    const formGraphData = (ticks: ArchiveEntryInterface[], graphParam: GraphParamsType): GraphDataInterface[] => {
        return ticks.map((entry) => {
            return {
                time: entry.timestamp,
                value: entry.values[graphParam],
            }
        })
    }

    const {data, searchQuery} = dataObject;

    const {reportType} = searchQuery;

    const {resource} = data;

    const archiveEntries = _.get(data, 'archiveEntries', []);


    // const tickValues = useMemo(() => formTicks(archiveEntries, reportType), [archiveEntries]);
    const tickValues = formTicks(archiveEntries, reportType);

    const ticksData = tickValues.map((tick) => tick.timestamp);

    const graphData = formGraphData(archiveEntries, graphParam);

    const maxElement = maxBy(graphData, (obj) => obj.value);

    const maxValue = maxElement?.value;

    const tooltipStyle = {
        parent: {overflow: 'visible'},
        data: {fill: `url(#${data.resource})`, stroke: getResourceColor(resource), strokeWidth: 2}
    };

    return (
      <>
      <GraphWrapper>
              <Gradient resource={resource}/>
              <VictoryChart
                padding={{ top: 0, bottom: 0, left: 26, right: 0 }}
                domain={{ y: [0, 1.1*maxValue!] }}
                width={600}
                height={300}
                theme={VictoryTheme.material} style={{parent: {
                      width: '600px',
                      height: '300px',
                      overflow: 'visible'
                  },
              }}
                containerComponent={
                    <VictoryVoronoiContainer
                    />
                }
              >
                  <VictoryArea
                    name="graph"
                    sortKey="time"

                    interpolation="natural"
                    labelComponent={<CustomTooltip
                      flyoutStyle={{ fill: "var(--main-100)"}} style={{ fill: "#fff" }} flyoutPadding={{top: 8, right: 16, bottom: 8, left: 16}}
                      flyoutComponent={<GraphTooltip/>}
                    />}
                    labels={() => ''}
                    style={tooltipStyle}
                    data={graphData}
                    x="time"
                    y="value"
                  />

                  <VictoryAxis
                    tickFormat={(x) => ticksData.includes(x) ? getTickFormat(archiveEntries, reportType, x) : ''}
                    style={{
                        axisLabel: { strokeWidth: 0 },
                        grid: {stroke: 'none'},
                    }}
                  />
                  <VictoryAxis
                    dependentAxis
                    style={{
                        grid: {stroke: 'none'},
                    }}
                  />
              </VictoryChart>
          </GraphWrapper>
      </>
    )
}

const GraphWrapper = styled.div`
  position: absolute;
  top: 60px;
    svg {
        overflow: visible !important;
    }
`

export interface ArchiveEntryInterface {
    timestamp: string
    values: {
        InputTemperature: number
        OutputTemperature: number
        DeltaTemperature: number
        InputVolume: number
        OutputVolume: number
        DeltaVolume: number
        InputMass: number
        OutputMass: number
        DeltaMass: number
        InputPressure: number
        OutputPressure: number
        DeltaPressure: number
        Energy: number
        TimeWork: number
    }
}

export type ResourceType = "Heat" | "ColdWaterSupply" | "HotWaterSupply" | "Electricity"

export interface ReadingsInterface {
    resource: ResourceType
    systemPipeCount: number
    archiveEntries: ArchiveEntryInterface[]
}

export interface GraphDataInterface {
    time: string
    value: number
}

export type ReportType = 'hourly' | 'daily'| 'monthly'

interface GraphViewProps {
    graphParam: GraphParamsType
    dataObject: RequestNodeReadingsFunctionInterface
    // reportType: ReportType
}

export default GraphView;
