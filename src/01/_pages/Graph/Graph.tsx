import * as V from 'victory';
import {
    VictoryChart,
    VictoryAxis,
    VictoryBar,
    VictoryTheme,
    VictoryLine,
    VictoryLabel,
    VictoryTooltip,
    VictoryVoronoiContainer, VictoryArea, VictoryGroup, VictoryCursorContainer, VictoryScatter, VictoryContainer
} from 'victory';
import React, {useCallback, useRef, useState} from "react";
import { format, compareAsc } from 'date-fns'






const Graph: React.FC = () => {

    function useHover() {
        const [value, setValue] = useState(false);

        // Wrap in useCallback so we can use in dependencies below
        const handleMouseEnter = useCallback(() => setValue(true), []);
        const handleMouseLeave = useCallback(() => setValue(false), []);

        // Keep track of the last node passed to callbackRef
        // so we can remove its event listeners.
        const ref = useRef();

        // Use a callback ref instead of useEffect so that event listeners
        // get changed in the case that the returned ref gets added to
        // a different element later. With useEffect, changes to ref.current
        // wouldn't cause a rerender and thus the effect would run again.
        const callbackRef = useCallback(
            (node) => {
                if (ref.current) {
                    ref.current.removeEventListener("mouseenter", handleMouseEnter);
                    ref.current.removeEventListener("mouseleave", handleMouseLeave);
                }

                ref.current = node;

                if (ref.current) {
                    ref.current.addEventListener("mouseenter", handleMouseEnter);
                    ref.current.addEventListener("mouseleave", handleMouseLeave);
                }
            },
            [handleMouseEnter, handleMouseLeave]
        );

        return [callbackRef, value];
    }


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

    console.log(graphDataNew)

    const CustomTooltip = (props) => {

        const [hovered, setHovered] = useState(true);

        debugger;
        const {x, y} = props;
        return (
            <g onMouseEnter={() => setHovered(true)}
               onMouseLeave={() => setHovered(false)}>
                {hovered ? <line transform={`translate(${x}, 0)`} x1={0} y1={y} x2={0} y2={300} stroke='#000'
                                 strokeWidth={0.5}/> : null}
                {/*<line transform={`translate(${x}, 0)`} x1={0} y1={y} x2={0} y2={300} stroke='#000' strokeWidth={0.5} />*/}
                <VictoryTooltip  {...props} />
            </g>
        );
    }
        const ScatterPoint = ({ x, y, datum }) => {
            const [selected, setSelected] = React.useState(false);
            const [hovered, setHovered] = React.useState(false);

            return (
                <>
                {hovered ? <line transform={`translate(${x}, 0)`} x1={0} y1={y} x2={0} y2={300} stroke='#000' strokeWidth={0.5} /> : null}

            <circle
                    cx={x}
                    cy={y}
                    r={datum.x * datum.y}
                    stroke={hovered ? "purple" : "white"}
                    strokeWidth={2}
                    fill={selected ? "cyan" : "magenta"}
                    onClick={() => setSelected(!selected)}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                />
                </>
            );
        };

// Component being rendered

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <svg>
                <defs>
                    <linearGradient id="myGradient"
                                    x1="0%" y1="0%" x2="0%" y2="100%"
                    >
                        <stop offset="0%"   stopColor="rgba(24, 158, 233, 0.33)"/>
                        <stop offset="100%" stopColor="rgba(24, 158, 233, 0)"/>
                    </linearGradient>
                </defs>
            </svg>
            <VictoryChart domainPadding={50} theme={VictoryTheme.material} style={{parent: {
                    width: '600px',
                    height: '600px',
                    // fill: "linear-gradient(180deg, rgba(24, 158, 233, 0.33) 0%, rgba(24, 158, 233, 0) 100%)"
                },
                // data: { fill: "linear-gradient(180deg, rgba(24, 158, 233, 0.33) 0%, rgba(24, 158, 233, 0) 100%)" }
            }}

                          containerComponent={
                              <VictoryVoronoiContainer/>
                          }
            >

                {/*<VictoryLine*/}
                {/*    style={{*/}
                {/*        data: { stroke: "red", strokeWidth: 2 },*/}
                {/*        labels: { angle: -90, fill: "red", fontSize: 20 }*/}
                {/*    }}*/}
                {/*    labels={["Important"]}*/}
                {/*    labelComponent={<VictoryLabel/>}*/}
                {/*    // x={() => "15:27"}*/}

                {/*/>*/}
                <VictoryArea
                    name="graph"

                    labelComponent={
                        <CustomTooltip
                                                          />
                        // <VictoryTooltip/>
                            // <VictoryBar data={[{x: 1, y: 1}]}/>

                    }
                    // style={{ data: { fill: "linear-gradient(180deg, rgba(24, 158, 233, 0.33) 0%, rgba(24, 158, 233, 0) 100%)" } }}
                    style={{ data: { fill: "url(#myGradient)" } }}
                    data={graphDataNew}
                    x="time"
                    y="value"
                />
                <VictoryScatter
                    dataComponent={<ScatterPoint/>}
                />

                <VictoryAxis
                    style={{
                        axisLabel: { padding: 40, strokeWidth: 0 },
                        grid: {stroke: 'none'},
                    }}
                    label="Время"
                />
                <VictoryAxis

                    dependentAxis
                    label="Масса"
                    style={{
                        axisLabel: { padding: 40 },
                        grid: {stroke: 'none'},
                    }}

                />


            </VictoryChart>

        </div>
    )
}

export default Graph;
