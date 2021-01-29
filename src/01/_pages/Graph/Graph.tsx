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
import React, {useCallback, useEffect, useRef, useState} from "react";
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
            DateTime: "2021-01-11T12:27:42.2387729+03:00",
            Params: {
                InputVolume: 0.313,
                OutputMass: 0.312
            }
        },
        {
            DateTime: "2021-01-12T13:27:42.241241+03:00",
            Params: {
                InputVolume: 0.317,
                OutputVolume: 0.319
            }
        },
        {
            DateTime: "2021-01-13T14:27:42.2387729+03:00",
            Params: {
                InputVolume: 0.323,
                OutputMass: 0.354
            }
        },
        {
            DateTime: "2021-01-14T15:27:42.241241+03:00",
            Params: {
                InputVolume: 0.366,
                OutputVolume: 0.378
            }
        },
        {
            DateTime: "2021-01-15T16:27:42.2387729+03:00",
            Params: {
                InputVolume: 0.399,
                OutputMass: 0.312
            }
        },
        {
            DateTime: "2021-01-16T17:27:42.2387729+03:00",
            Params: {
                InputVolume: 0.245,
                OutputMass: 0.312
            }
        },
        {
            DateTime: "2021-01-17T18:27:42.2387729+03:00",
            Params: {
                InputVolume: 0.100,
                OutputMass: 0.312
            }
        },
        {
            DateTime: "2021-01-18T19:27:42.2387729+03:00",
            Params: {
                InputVolume: 0.513,
                OutputMass: 0.312
            }
        },
        {
            DateTime: "2021-01-19T20:27:42.2387729+03:00",
            Params: {
                InputVolume: 0.613,
                OutputMass: 0.312
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
            time: format(new Date(reading.DateTime), 'dd'),
            value: reading.Params.InputVolume,
            label: reading.Params.InputVolume + " м³"
        }
    })

    console.log(graphDataNew)

    const getTooltip = (d) => {
        debugger;
        const { x, y } = d;
        return `${new Date(x)}\n ${y}`;
    };



    const CustomTooltip = (props) => {
        debugger;
        const [selected, setSelected] = React.useState(false);
        const [hovered, setHovered] = React.useState(false);

        const {x, y, active} = props;

        return (
            <g onMouseEnter={() => setHovered(true)}
               onMouseLeave={() => setHovered(false)} {...props}>
                {active ?
                    <><line transform={`translate(${x}, 0)`} x1={0} y1={y} x2={0} y2={300} stroke='#000'
                            strokeWidth={0.5}
                            strokeDasharray={5}/>
                        <VictoryTooltip  {...props} flyoutStyle={{ fill: "var(--main-100)"}} style={{ fill: "#fff" }} flyoutPadding={{top: 8, right: 16, bottom: 8, left: 16}}/>
                        {/*<line transform={`translate(${x}, 0)`} x1={0} y1={y} x2={0} y2={300} stroke='#000' strokeWidth={0.5} />*/}
                        <circle
                            cx={x}
                            cy={y}
                            r={6}
                            stroke={hovered ? "#fff" : "#fff"}
                            strokeWidth={2}
                            fill={selected ? "var(--main-100)" : "var(--main-100)"}
                            onClick={() => setSelected(!selected)}

                        />
                    </>
                    : null}

            </g>
        );
    }

    const ScatterPoint = ({ x, y }) => {
        const [selected, setSelected] = React.useState(false);
        const [hovered, setHovered] = React.useState(false);

        return (
            <>
                {hovered ? <line transform={`translate(${x}, 0)`} x1={0} y1={y} x2={0} y2={300} stroke='#000' strokeWidth={0.5} /> : null}

                <circle
                    cx={x}
                    cy={y}
                    r={8}
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
            <VictoryChart
                // domainPadding={50}
                theme={VictoryTheme.material} style={{parent: {
                    width: '600px',
                    height: '600px',
                },
            }}

                          containerComponent={
                              <VictoryVoronoiContainer
                              />
                          }
            >
                <VictoryArea
                    name="graph"
                    interpolation="natural"
                    // labelComponent={<CustomTooltip style={{fill: "var(--main-100)", padding: 8}}/>}
                    // labels={(d) => getTooltip(d)}
                    labels={ ({ datum }) => datum.time }
                    // style={{ data: { fill: "linear-gradient(180deg, rgba(24, 158, 233, 0.33) 0%, rgba(24, 158, 233, 0) 100%)" } }}
                    style={{ data: { fill: "url(#myGradient)", stroke: "var(--cold-water)", strokeWidth: 2 } }}
                    data={graphDataNew}
                    x="time"
                    y="value"
                />

                <VictoryAxis
                    style={{
                        axisLabel: { padding: 40, strokeWidth: 0 },
                        grid: {stroke: 'none'},
                    }}
                />
                <VictoryAxis

                    dependentAxis
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
