import * as V from 'victory';
import {
    VictoryChart,
    VictoryAxis,
    VictoryBar,
    VictoryTheme,
    VictoryLine,
    VictoryLabel,
    VictoryTooltip,
    VictoryVoronoiContainer
} from 'victory';
import React from "react";
import { format, compareAsc } from 'date-fns'






const Graph: React.FC = () => {

    const readings = [
        {
            DateTime: "2021-01-25T12:27:42.2387729+03:00",
            Params: {
                InputVolume: 0.313,
                OutputMass: 0.312
            }
        },
        {
            DateTime: "2021-01-25T13:27:42.241241+03:00",
            Params: {
                InputVolume: 0.317,
                OutputVolume: 0.319
            }
        },
        {
            DateTime: "2021-01-25T14:27:42.2387729+03:00",
            Params: {
                InputVolume: 0.323,
                OutputMass: 0.354
            }
        },
        {
            DateTime: "2021-01-25T15:27:42.241241+03:00",
            Params: {
                InputVolume: 0.366,
                OutputVolume: 0.378
            }
        }
    ];

    const tickValues = readings.map((reading) => {
        return format(new Date(reading.DateTime), 'HH:MM:SS')
    })

    const tickFormat = readings.map((reading) => {
        return reading.Params.InputVolume
    })

    const graphData = {
        tickValues,
        tickFormat
    }

    const graphDataNew = readings.map((reading) => {
        return {
            time: format(new Date(reading.DateTime), 'HH:mm'),
            value: reading.Params.InputVolume,
            label: reading.Params.InputVolume
        }
    })

    console.log(graphData)
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <VictoryChart domainPadding={50} theme={VictoryTheme.material} style={{parent: {
                    width: '600px',
                    height: '600px'
                }}}
                          containerComponent={
                              <VictoryVoronoiContainer/>
                          }
            >
                <VictoryLine
                    labelComponent={<VictoryTooltip/>}
                    data={graphDataNew}
                    x="time"
                    y="value"
                />
                <VictoryAxis
                    style={{
                        axisLabel: { padding: 40 }
                    }}
                    label="Время"
                />
                <VictoryAxis

                    dependentAxis
                    label="Масса"
                    style={{
                        axisLabel: { padding: 40 }
                    }}
                />
            </VictoryChart>
            <VictoryChart domainPadding={50} theme={VictoryTheme.material} style={{parent: {
                    width: '600px',
                    height: '600px'
                }}}>
                <VictoryBar
                    labelComponent={<VictoryTooltip/>}
                    data={graphDataNew}
                    x="time"
                    y="value"
                />
                <VictoryAxis
                    style={{
                        axisLabel: { padding: 40 }
                    }}
                    label="Время"
                />
                <VictoryAxis
                    dependentAxis
                    label="Масса"
                    style={{
                        axisLabel: { padding: 40 }
                    }}
                />
            </VictoryChart>
        </div>
    )
}

export default Graph;
