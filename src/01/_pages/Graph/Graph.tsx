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
import {format, compareAsc, toDate, parseISO} from 'date-fns'
import styled from "styled-components";
import { zonedTimeToUtc } from 'date-fns-tz'

const readingsNew = {
    "resource": "Heat",
    "systemPipeCount": 2,
    "archiveEntries": [
        {
            "timestamp": "2021-01-25T00:00:00+00:00",
            "values": {
                "InputTemperature": 74.42235565185547,
                "OutputTemperature": 45.94313430786133,
                "DeltaTemperature": 28.48,
                "InputVolume": 6.485000133514404,
                "OutputVolume": 6.284999847412109,
                "DeltaVolume": 0.2,
                "InputMass": 6.325405120849609,
                "OutputMass": 6.223834991455078,
                "DeltaMass": 0.1,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.7549476623535156,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-25T01:00:00+00:00",
            "values": {
                "InputTemperature": 73.85824584960938,
                "OutputTemperature": 45.38827133178711,
                "DeltaTemperature": 28.47,
                "InputVolume": 6.039999961853027,
                "OutputVolume": 5.855000019073486,
                "DeltaVolume": 0.18,
                "InputMass": 5.89469051361084,
                "OutputMass": 5.799987316131592,
                "DeltaMass": 0.09,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.7032892107963562,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-25T02:00:00+00:00",
            "values": {
                "InputTemperature": 73.45772552490234,
                "OutputTemperature": 45.29898452758789,
                "DeltaTemperature": 28.16,
                "InputVolume": 6.650000095367432,
                "OutputVolume": 6.445000171661377,
                "DeltaVolume": 0.2,
                "InputMass": 6.490255832672119,
                "OutputMass": 6.382706165313721,
                "DeltaMass": 0.11,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.7658863663673401,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-25T03:00:00+00:00",
            "values": {
                "InputTemperature": 72.85111999511719,
                "OutputTemperature": 45.626243591308594,
                "DeltaTemperature": 27.22,
                "InputVolume": 6.380000114440918,
                "OutputVolume": 6.190000057220459,
                "DeltaVolume": 0.19,
                "InputMass": 6.228457927703857,
                "OutputMass": 6.130868434906006,
                "DeltaMass": 0.1,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.710602343082428,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-25T04:00:00+00:00",
            "values": {
                "InputTemperature": 77.29915618896484,
                "OutputTemperature": 45.22394943237305,
                "DeltaTemperature": 32.08,
                "InputVolume": 5.675000190734863,
                "OutputVolume": 5.494999885559082,
                "DeltaVolume": 0.18,
                "InputMass": 5.525693416595459,
                "OutputMass": 5.442052841186523,
                "DeltaMass": 0.08,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.7428062558174133,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-25T05:00:00+00:00",
            "values": {
                "InputTemperature": 79.39259338378906,
                "OutputTemperature": 44.858680725097656,
                "DeltaTemperature": 34.53,
                "InputVolume": 5.21999979019165,
                "OutputVolume": 5.050000190734863,
                "DeltaVolume": 0.17,
                "InputMass": 5.075403213500977,
                "OutputMass": 5.00269889831543,
                "DeltaMass": 0.07,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.7345924377441406,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-25T06:00:00+00:00",
            "values": {
                "InputTemperature": 78.11730194091797,
                "OutputTemperature": 45.24297332763672,
                "DeltaTemperature": 32.87,
                "InputVolume": 5.590000152587891,
                "OutputVolume": 5.400000095367432,
                "DeltaVolume": 0.19,
                "InputMass": 5.440544605255127,
                "OutputMass": 5.348210334777832,
                "DeltaMass": 0.09,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.7495682835578918,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-25T07:00:00+00:00",
            "values": {
                "InputTemperature": 80.59698486328125,
                "OutputTemperature": 45.06178283691406,
                "DeltaTemperature": 35.54,
                "InputVolume": 4.864999771118164,
                "OutputVolume": 4.699999809265137,
                "DeltaVolume": 0.16,
                "InputMass": 4.727359294891357,
                "OutputMass": 4.656224250793457,
                "DeltaMass": 0.07,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.7040684819221497,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-25T08:00:00+00:00",
            "values": {
                "InputTemperature": 80.92282104492188,
                "OutputTemperature": 45.00227355957031,
                "DeltaTemperature": 35.92,
                "InputVolume": 5.460000038146973,
                "OutputVolume": 5.269999980926514,
                "DeltaVolume": 0.19,
                "InputMass": 5.3041887283325195,
                "OutputMass": 5.220797061920166,
                "DeltaMass": 0.08,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.7985466718673706,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-25T09:00:00+00:00",
            "values": {
                "InputTemperature": 82.67616271972656,
                "OutputTemperature": 45.20569610595703,
                "DeltaTemperature": 37.47,
                "InputVolume": 4.610000133514404,
                "OutputVolume": 4.445000171661377,
                "DeltaVolume": 0.16,
                "InputMass": 4.474281311035156,
                "OutputMass": 4.403168201446533,
                "DeltaMass": 0.07,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.7027158141136169,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-25T10:00:00+00:00",
            "values": {
                "InputTemperature": 82.13167572021484,
                "OutputTemperature": 44.83206558227539,
                "DeltaTemperature": 37.3,
                "InputVolume": 5.215000152587891,
                "OutputVolume": 5.034999847412109,
                "DeltaVolume": 0.18,
                "InputMass": 5.061976909637451,
                "OutputMass": 4.988592624664307,
                "DeltaMass": 0.07,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.7913647294044495,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-25T11:00:00+00:00",
            "values": {
                "InputTemperature": 79.22642517089844,
                "OutputTemperature": 44.99049377441406,
                "DeltaTemperature": 34.24,
                "InputVolume": 5.385000228881836,
                "OutputVolume": 5.199999809265137,
                "DeltaVolume": 0.19,
                "InputMass": 5.236105442047119,
                "OutputMass": 5.152423858642578,
                "DeltaMass": 0.08,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.7513015270233154,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-25T12:00:00+00:00",
            "values": {
                "InputTemperature": 78.00382232666016,
                "OutputTemperature": 45.84528732299805,
                "DeltaTemperature": 32.16,
                "InputVolume": 6.144999980926514,
                "OutputVolume": 5.940000057220459,
                "DeltaVolume": 0.2,
                "InputMass": 5.980062961578369,
                "OutputMass": 5.8816142082214355,
                "DeltaMass": 0.1,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.8059841990470886,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-25T13:00:00+00:00",
            "values": {
                "InputTemperature": 77.4437484741211,
                "OutputTemperature": 45.6249885559082,
                "DeltaTemperature": 31.82,
                "InputVolume": 5.684999942779541,
                "OutputVolume": 5.494999885559082,
                "DeltaVolume": 0.19,
                "InputMass": 5.535121440887451,
                "OutputMass": 5.44209623336792,
                "DeltaMass": 0.09,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.7381200790405273,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-25T14:00:00+00:00",
            "values": {
                "InputTemperature": 77.65624237060547,
                "OutputTemperature": 45.67744827270508,
                "DeltaTemperature": 31.98,
                "InputVolume": 6.159999847412109,
                "OutputVolume": 5.960000038146973,
                "DeltaVolume": 0.2,
                "InputMass": 5.99730920791626,
                "OutputMass": 5.902798652648926,
                "DeltaMass": 0.09,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.8037952184677124,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-25T15:00:00+00:00",
            "values": {
                "InputTemperature": 77.59073638916016,
                "OutputTemperature": 46.224273681640625,
                "DeltaTemperature": 31.37,
                "InputVolume": 6.880000114440918,
                "OutputVolume": 6.650000095367432,
                "DeltaVolume": 0.23,
                "InputMass": 6.697920799255371,
                "OutputMass": 6.5834455490112305,
                "DeltaMass": 0.11,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.8805277943611145,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-25T16:00:00+00:00",
            "values": {
                "InputTemperature": 77.4806137084961,
                "OutputTemperature": 48.07600402832031,
                "DeltaTemperature": 29.4,
                "InputVolume": 7.400000095367432,
                "OutputVolume": 7.144999980926514,
                "DeltaVolume": 0.26,
                "InputMass": 7.20399808883667,
                "OutputMass": 7.067850589752197,
                "DeltaMass": 0.14,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.8879133462905884,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-25T17:00:00+00:00",
            "values": {
                "InputTemperature": 76.9441909790039,
                "OutputTemperature": 47.597564697265625,
                "DeltaTemperature": 29.35,
                "InputVolume": 6.900000095367432,
                "OutputVolume": 6.664999961853027,
                "DeltaVolume": 0.24,
                "InputMass": 6.721035480499268,
                "OutputMass": 6.595567226409912,
                "DeltaMass": 0.13,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.8267413973808289,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-25T18:00:00+00:00",
            "values": {
                "InputTemperature": 78.06266021728516,
                "OutputTemperature": 47.861568450927734,
                "DeltaTemperature": 30.2,
                "InputVolume": 6.914999961853027,
                "OutputVolume": 6.675000190734863,
                "DeltaVolume": 0.24,
                "InputMass": 6.729269504547119,
                "OutputMass": 6.603123188018799,
                "DeltaMass": 0.13,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.8518659472465515,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-25T19:00:00+00:00",
            "values": {
                "InputTemperature": 76.99251556396484,
                "OutputTemperature": 47.15358352661133,
                "DeltaTemperature": 29.84,
                "InputVolume": 6.840000152587891,
                "OutputVolume": 6.605000019073486,
                "DeltaVolume": 0.24,
                "InputMass": 6.661577224731445,
                "OutputMass": 6.5376200675964355,
                "DeltaMass": 0.12,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.8331319093704224,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-25T20:00:00+00:00",
            "values": {
                "InputTemperature": 77.06535339355469,
                "OutputTemperature": 47.84530258178711,
                "DeltaTemperature": 29.22,
                "InputVolume": 6.980000019073486,
                "OutputVolume": 6.744999885559082,
                "DeltaVolume": 0.24,
                "InputMass": 6.797294616699219,
                "OutputMass": 6.674181938171387,
                "DeltaMass": 0.12,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.8325188159942627,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-25T21:00:00+00:00",
            "values": {
                "InputTemperature": 77.41325378417969,
                "OutputTemperature": 47.35076141357422,
                "DeltaTemperature": 30.06,
                "InputVolume": 6.769999980926514,
                "OutputVolume": 6.539999961853027,
                "DeltaVolume": 0.23,
                "InputMass": 6.5910515785217285,
                "OutputMass": 6.471916675567627,
                "DeltaMass": 0.12,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.8305225968360901,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-25T22:00:00+00:00",
            "values": {
                "InputTemperature": 77.9713363647461,
                "OutputTemperature": 47.736778259277344,
                "DeltaTemperature": 30.23,
                "InputVolume": 7.275000095367432,
                "OutputVolume": 7.025000095367432,
                "DeltaVolume": 0.25,
                "InputMass": 7.080756664276123,
                "OutputMass": 6.951504230499268,
                "DeltaMass": 0.13,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.8973425626754761,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-25T23:00:00+00:00",
            "values": {
                "InputTemperature": 78.57377624511719,
                "OutputTemperature": 48.23319625854492,
                "DeltaTemperature": 30.34,
                "InputVolume": 6.75,
                "OutputVolume": 6.519999980926514,
                "DeltaVolume": 0.23,
                "InputMass": 6.5662384033203125,
                "OutputMass": 6.450087070465088,
                "DeltaMass": 0.12,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.8350937962532043,
                "TimeWork": 1
            }
        }
    ]
}

const readingsByHours = JSON.parse(JSON.stringify(readingsNew))

const formatDate = (timeStamp) => {
    const dateObject = new Date(timeStamp);
    const date = new Date(dateObject.valueOf() + dateObject.getTimezoneOffset() * 60 * 1000);
    return date
}

const isMultiplySix = (timeStamp) => {
    const date = formatDate(timeStamp);
    const dateFalse = new Date(timeStamp);
    const hour = +format(date, 'HH');
    const hourFalse = +format(dateFalse, 'HH');
    // debugger;

    return hour % 6 === 0;
}


    // const date = formatToTimeZone(date, format, { timeZone: 'Asia/Calcutta' })
    // const time = zonedTimeToUtc(dateObject,  'Europe/Moscow');
    // const norm = format(parseISO(timeStamp), 'HH');
    // const formatted = format(parsed, 'HH');

const formHourlyTicks = (archiveArr) => {
    // debugger;
    let ticks = [];
    if (archiveArr.length > 24) {
        return [...archiveArr.filter((entry) => isMultiplySix(entry.timestamp)), archiveArr[archiveArr.length-1]]
    }
    return archiveArr
}

const graphDataNew = formHourlyTicks(readingsByHours.archiveEntries).map((entry) => {
    return {
        time: entry.timestamp,
        value: entry.values.DeltaMass,
        // label: reading.Params.InputVolume + " м³"
    }
})


const formTicks = (min, max) => {
    let multipleFives = [];
    for (let i = min+2; i < max; i++) {
        if (i % 5 === 0) multipleFives.push(i)
    }
    return [min, min + 1, ...multipleFives, max]
}
//
// const formTickValues = (dateArr) => {
//     // const days = dateArr.map((data) => +format(new Date(data.time), 'dd'))
//     const filteredDates = dateArr.filter((date) => {
//         const day = +format(new Date(date), 'dd')
//         // return (dat)
//     }
// }



const tickValues = formHourlyTicks(readingsByHours.archiveEntries);

// debugger;

const CustomTooltip = (props) => {

    const [selected, setSelected] = React.useState(false);
    const [hovered, setHovered] = React.useState(false);

    const {x, y, active} = props;

    return (
        <g style={{pointerEvents: 'none'}} onMouseEnter={() => setHovered(true)}
           onMouseLeave={() => setHovered(false)} {...props}>
            {active ?
                <><line transform={`translate(${x}, 0)`} x1={0} y1={y} x2={0} y2={300} stroke='#000'
                        strokeWidth={0.5}
                        strokeDasharray={5}/>
                    <VictoryTooltip  {...props}/>
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


const GraphTooltip = (props) => {
    const { datum, x, y } = props;
    return (
        <g style={{pointerEvents: 'none'}}>


            <foreignObject
                x={x} y={y}
                width="100%" height="100%"
                style={{overflow: 'visible'}}
            >
                <TooltipBlock>
                    <DateBlock>{ format(new Date(datum.time), 'dd.MM.yyyy') }</DateBlock>
                    <Value>{ datum.value.toFixed(3) }м³</Value>
                    <Pointer />
                </TooltipBlock>
            </foreignObject>
        </g>
    );
}

const Graph: React.FC = () => {

    return (
        // <div style={{display: 'flex', justifyContent: 'center'}}>
        <GraphWrapper>
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
                width={600}
                theme={VictoryTheme.material} style={{parent: {
                    width: '900px',
                    height: '600px',
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
                    interpolation="natural"
                    labelComponent={<CustomTooltip
                        flyoutStyle={{ fill: "var(--main-100)"}} style={{ fill: "#fff" }} flyoutPadding={{top: 8, right: 16, bottom: 8, left: 16}}
                        flyoutComponent={<GraphTooltip/>}
                    />}
                    labels={() => ''}
                    style={{ parent: {overflow: 'visible'}, data: { fill: "url(#myGradient)", stroke: "var(--cold-water)", strokeWidth: 2  } }}
                    data={graphDataNew}
                    x="time"
                    y="value"
                />



                <VictoryAxis
                    // tickFormat={(x) => {const time = format(new Date(x), 'dd'); return time}}
                    tickFormat={(x) => format(formatDate(x), 'HH')}
                    tickValues={tickValues}
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

        </GraphWrapper>
    )
}

const GraphWrapper = styled.div`
    svg {
        overflow: visible !important;
    }

`

const TooltipBlock = styled.div`
display: inline-block;
position: relative;
background-color: var(--main-100);
padding: 8px 16px;
border-radius: 4px;
border: 0;
transform: translate(-15%, -135%);
`

const DateBlock = styled.div`
font-size: 12px;
line-height: 16px;
color: #fff;
`

const Value = styled.div`
color: #fff;
font-weight: 500;
font-size: 24px;
line-height: 32px;
`

const Pointer = styled.div`
//display: inline-block;
position: absolute;
left: 15%;
top: 95%;
margin: 0 auto;
width: 0;
height: 0;
border-style: solid;
border-width: 12px 6px 0 6px;
border-color: var(--main-100) transparent transparent transparent;
transform: translate(-50%, 0);
`

export default Graph;
