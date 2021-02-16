import * as V from 'victory';
import {
    VictoryChart,
    VictoryAxis,
    VictoryTheme,
    VictoryTooltip,
    VictoryVoronoiContainer, VictoryArea, VictoryLabelProps
} from 'victory';
import React, {useCallback, useEffect, useRef, useState} from "react";
import {format, compareAsc, toDate, parseISO} from 'date-fns'
import styled from "styled-components";
import { zonedTimeToUtc } from 'date-fns-tz'
import {useAsync} from "../../hooks/useAsync";
import GraphTooltip from "./components/GraphTooltip";
import {CustomTooltip} from "./components/CustomTooltip";
import Gradient from "./components/Gradient";
import {getResourceColor} from "../../utils/getResourceColor";
import {requestNodeReadings} from "../../_api/node_readings_page";
import maxBy from 'lodash/maxBy';
import _ from "lodash";
import {Formik} from "formik";
import {Form, Radio, DatePicker, FormikDebug, SubmitButton} from "formik-antd"
// import {Form, Radio, FormikDebug} from "formik-antd"
import moment from "moment";
// import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';
// import generatePicker from 'antd/es/date-picker/generatePicker';
import 'antd/es/date-picker/style/index';
import { Tooltip, Button } from 'antd';
import IconTT from "../../tt-components/IconTT";


// const DatePicker = generatePicker<Date>(dateFnsGenerateConfig);

interface ArchiveEntryInterface {
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

export type ResourceType = "Heat" | "ColdWater" | "HotWater" | "Electricity"

export interface ReadingsInterface {
    resource: ResourceType
    systemPipeCount: number
    archiveEntries: ArchiveEntryInterface[]
}

interface GraphDataInterface {
    time: string
    value: number
}



const readingsOneDayByHours = {
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
};

const readingsThreeDaysByHours = {
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
        },
        {
            "timestamp": "2021-01-26T00:00:00+00:00",
            "values": {
                "InputTemperature": 79.65541076660156,
                "OutputTemperature": 48.21012496948242,
                "DeltaTemperature": 31.45,
                "InputVolume": 6.889999866485596,
                "OutputVolume": 6.650000095367432,
                "DeltaVolume": 0.24,
                "InputMass": 6.69998836517334,
                "OutputMass": 6.578394889831543,
                "DeltaMass": 0.12,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.883151113986969,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-26T01:00:00+00:00",
            "values": {
                "InputTemperature": 78.96170043945312,
                "OutputTemperature": 48.36986541748047,
                "DeltaTemperature": 30.59,
                "InputVolume": 6.945000171661377,
                "OutputVolume": 6.710000038146973,
                "DeltaVolume": 0.24,
                "InputMass": 6.755703449249268,
                "OutputMass": 6.638250827789307,
                "DeltaMass": 0.12,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.8663219213485718,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-26T02:00:00+00:00",
            "values": {
                "InputTemperature": 79.42949676513672,
                "OutputTemperature": 48.695552825927734,
                "DeltaTemperature": 30.73,
                "InputVolume": 7.199999809265137,
                "OutputVolume": 6.954999923706055,
                "DeltaVolume": 0.24,
                "InputMass": 7.001673221588135,
                "OutputMass": 6.879284381866455,
                "DeltaMass": 0.12,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.9020464420318604,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-26T03:00:00+00:00",
            "values": {
                "InputTemperature": 81.11962127685547,
                "OutputTemperature": 48.99470901489258,
                "DeltaTemperature": 32.12,
                "InputVolume": 7.179999828338623,
                "OutputVolume": 6.929999828338623,
                "DeltaVolume": 0.25,
                "InputMass": 6.973968029022217,
                "OutputMass": 6.853628158569336,
                "DeltaMass": 0.12,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.9392029047012329,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-26T04:00:00+00:00",
            "values": {
                "InputTemperature": 78.92573547363281,
                "OutputTemperature": 49.026554107666016,
                "DeltaTemperature": 29.9,
                "InputVolume": 6.909999847412109,
                "OutputVolume": 6.675000190734863,
                "DeltaVolume": 0.23,
                "InputMass": 6.72130823135376,
                "OutputMass": 6.601887226104736,
                "DeltaMass": 0.12,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.8424262404441833,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-26T05:00:00+00:00",
            "values": {
                "InputTemperature": 81.3008804321289,
                "OutputTemperature": 49.44071578979492,
                "DeltaTemperature": 31.86,
                "InputVolume": 7.239999771118164,
                "OutputVolume": 6.985000133514404,
                "DeltaVolume": 0.25,
                "InputMass": 7.031516075134277,
                "OutputMass": 6.904900074005127,
                "DeltaMass": 0.13,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.9391807317733765,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-26T06:00:00+00:00",
            "values": {
                "InputTemperature": 79.87723541259766,
                "OutputTemperature": 48.86274337768555,
                "DeltaTemperature": 31.01,
                "InputVolume": 7.105000019073486,
                "OutputVolume": 6.855000019073486,
                "DeltaVolume": 0.25,
                "InputMass": 6.907342433929443,
                "OutputMass": 6.779300212860107,
                "DeltaMass": 0.13,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.8980309367179871,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-26T07:00:00+00:00",
            "values": {
                "InputTemperature": 79.13729858398438,
                "OutputTemperature": 49.58979797363281,
                "DeltaTemperature": 29.55,
                "InputVolume": 7.75,
                "OutputVolume": 7.480000019073486,
                "DeltaVolume": 0.27,
                "InputMass": 7.53671932220459,
                "OutputMass": 7.395898342132568,
                "DeltaMass": 0.14,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.933560311794281,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-26T08:00:00+00:00",
            "values": {
                "InputTemperature": 79.91236877441406,
                "OutputTemperature": 49.25150680541992,
                "DeltaTemperature": 30.66,
                "InputVolume": 7.179999828338623,
                "OutputVolume": 6.929999828338623,
                "DeltaVolume": 0.25,
                "InputMass": 6.980851173400879,
                "OutputMass": 6.852130889892578,
                "DeltaMass": 0.13,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.8972604274749756,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-26T09:00:00+00:00",
            "values": {
                "InputTemperature": 79.39987182617188,
                "OutputTemperature": 49.1129264831543,
                "DeltaTemperature": 30.29,
                "InputVolume": 7.389999866485596,
                "OutputVolume": 7.130000114440918,
                "DeltaVolume": 0.26,
                "InputMass": 7.185453414916992,
                "OutputMass": 7.048713207244873,
                "DeltaMass": 0.14,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.9122846126556396,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-26T10:00:00+00:00",
            "values": {
                "InputTemperature": 79.75726318359375,
                "OutputTemperature": 49.015357971191406,
                "DeltaTemperature": 30.74,
                "InputVolume": 7.34499979019165,
                "OutputVolume": 7.085000038146973,
                "DeltaVolume": 0.26,
                "InputMass": 7.141512870788574,
                "OutputMass": 7.005282402038574,
                "DeltaMass": 0.14,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.9203438758850098,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-26T11:00:00+00:00",
            "values": {
                "InputTemperature": 80.67074584960938,
                "OutputTemperature": 48.97136688232422,
                "DeltaTemperature": 31.7,
                "InputVolume": 6.885000228881836,
                "OutputVolume": 6.639999866485596,
                "DeltaVolume": 0.25,
                "InputMass": 6.688747406005859,
                "OutputMass": 6.567269325256348,
                "DeltaMass": 0.12,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.8888466954231262,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-26T12:00:00+00:00",
            "values": {
                "InputTemperature": 80.54273223876953,
                "OutputTemperature": 48.67721939086914,
                "DeltaTemperature": 31.87,
                "InputVolume": 6.815000057220459,
                "OutputVolume": 6.570000171661377,
                "DeltaVolume": 0.24,
                "InputMass": 6.622485637664795,
                "OutputMass": 6.498672008514404,
                "DeltaMass": 0.12,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.8846420049667358,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-26T13:00:00+00:00",
            "values": {
                "InputTemperature": 77.92868041992188,
                "OutputTemperature": 48.387847900390625,
                "DeltaTemperature": 29.54,
                "InputVolume": 7.275000095367432,
                "OutputVolume": 7.03000020980835,
                "DeltaVolume": 0.24,
                "InputMass": 7.0808892250061035,
                "OutputMass": 6.951681613922119,
                "DeltaMass": 0.13,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.8768002986907959,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-26T14:00:00+00:00",
            "values": {
                "InputTemperature": 77.90319061279297,
                "OutputTemperature": 49.3984375,
                "DeltaTemperature": 28.5,
                "InputVolume": 8.404999732971191,
                "OutputVolume": 8.114999771118164,
                "DeltaVolume": 0.29,
                "InputMass": 8.181314468383789,
                "OutputMass": 8.02266788482666,
                "DeltaMass": 0.16,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.9775965809822083,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-26T15:00:00+00:00",
            "values": {
                "InputTemperature": 78.30432891845703,
                "OutputTemperature": 49.494667053222656,
                "DeltaTemperature": 28.81,
                "InputVolume": 7.860000133514404,
                "OutputVolume": 7.619999885559082,
                "DeltaVolume": 0.24,
                "InputMass": 7.64715576171875,
                "OutputMass": 7.533243656158447,
                "DeltaMass": 0.11,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.9235658645629883,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-26T16:00:00+00:00",
            "values": {
                "InputTemperature": 82.39361572265625,
                "OutputTemperature": 49.77109146118164,
                "DeltaTemperature": 32.62,
                "InputVolume": 6.849999904632568,
                "OutputVolume": 6.619999885559082,
                "DeltaVolume": 0.23,
                "InputMass": 6.647351264953613,
                "OutputMass": 6.544186115264893,
                "DeltaMass": 0.1,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.9091495871543884,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-26T17:00:00+00:00",
            "values": {
                "InputTemperature": 81.09468078613281,
                "OutputTemperature": 49.405029296875,
                "DeltaTemperature": 31.69,
                "InputVolume": 7.130000114440918,
                "OutputVolume": 6.900000095367432,
                "DeltaVolume": 0.23,
                "InputMass": 6.927380084991455,
                "OutputMass": 6.821080684661865,
                "DeltaMass": 0.11,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.9203201532363892,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-26T18:00:00+00:00",
            "values": {
                "InputTemperature": 80.39173889160156,
                "OutputTemperature": 49.67384719848633,
                "DeltaTemperature": 30.72,
                "InputVolume": 7.554999828338623,
                "OutputVolume": 7.315000057220459,
                "DeltaVolume": 0.24,
                "InputMass": 7.344031810760498,
                "OutputMass": 7.231389999389648,
                "DeltaMass": 0.11,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.9457295536994934,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-26T19:00:00+00:00",
            "values": {
                "InputTemperature": 78.23209381103516,
                "OutputTemperature": 50.283321380615234,
                "DeltaTemperature": 27.95,
                "InputVolume": 8.539999961853027,
                "OutputVolume": 8.255000114440918,
                "DeltaVolume": 0.28,
                "InputMass": 8.31043815612793,
                "OutputMass": 8.158312797546387,
                "DeltaMass": 0.15,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.9737133979797363,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-26T20:00:00+00:00",
            "values": {
                "InputTemperature": 77.74011993408203,
                "OutputTemperature": 50.80677032470703,
                "DeltaTemperature": 26.93,
                "InputVolume": 9.239999771118164,
                "OutputVolume": 8.9399995803833,
                "DeltaVolume": 0.3,
                "InputMass": 8.995630264282227,
                "OutputMass": 8.83449649810791,
                "DeltaMass": 0.16,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 1.015712857246399,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-26T21:00:00+00:00",
            "values": {
                "InputTemperature": 78.07830810546875,
                "OutputTemperature": 51.52994918823242,
                "DeltaTemperature": 26.55,
                "InputVolume": 9.319999694824219,
                "OutputVolume": 9.020000457763672,
                "DeltaVolume": 0.3,
                "InputMass": 9.06987476348877,
                "OutputMass": 8.909395217895508,
                "DeltaMass": 0.16,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 1.0095235109329224,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-26T22:00:00+00:00",
            "values": {
                "InputTemperature": 78.04296875,
                "OutputTemperature": 51.40606689453125,
                "DeltaTemperature": 26.64,
                "InputVolume": 9.045000076293945,
                "OutputVolume": 8.760000228881836,
                "DeltaVolume": 0.28,
                "InputMass": 8.801928520202637,
                "OutputMass": 8.65284252166748,
                "DeltaMass": 0.15,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.9829745888710022,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-26T23:00:00+00:00",
            "values": {
                "InputTemperature": 78.88692474365234,
                "OutputTemperature": 51.44511795043945,
                "DeltaTemperature": 27.44,
                "InputVolume": 9.100000381469727,
                "OutputVolume": 8.805000305175781,
                "DeltaVolume": 0.3,
                "InputMass": 8.85282039642334,
                "OutputMass": 8.698734283447266,
                "DeltaMass": 0.15,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 1.0185245275497437,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-27T00:00:00+00:00",
            "values": {
                "InputTemperature": 80.44418334960938,
                "OutputTemperature": 51.66667175292969,
                "DeltaTemperature": 28.78,
                "InputVolume": 8.595000267028809,
                "OutputVolume": 8.3149995803833,
                "DeltaVolume": 0.28,
                "InputMass": 8.353504180908203,
                "OutputMass": 8.210936546325684,
                "DeltaMass": 0.14,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 1.0078932046890259,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-27T01:00:00+00:00",
            "values": {
                "InputTemperature": 80.18134307861328,
                "OutputTemperature": 51.641448974609375,
                "DeltaTemperature": 28.54,
                "InputVolume": 8.5649995803833,
                "OutputVolume": 8.289999961853027,
                "DeltaVolume": 0.27,
                "InputMass": 8.326353073120117,
                "OutputMass": 8.187050819396973,
                "DeltaMass": 0.14,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.9963200092315674,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-27T02:00:00+00:00",
            "values": {
                "InputTemperature": 78.40141296386719,
                "OutputTemperature": 51.43818664550781,
                "DeltaTemperature": 26.96,
                "InputVolume": 8.795000076293945,
                "OutputVolume": 8.520000457763672,
                "DeltaVolume": 0.27,
                "InputMass": 8.558869361877441,
                "OutputMass": 8.414763450622559,
                "DeltaMass": 0.14,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.9675400257110596,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-27T03:00:00+00:00",
            "values": {
                "InputTemperature": 79.4561767578125,
                "OutputTemperature": 51.36517333984375,
                "DeltaTemperature": 28.09,
                "InputVolume": 9.135000228881836,
                "OutputVolume": 8.850000381469727,
                "DeltaVolume": 0.28,
                "InputMass": 8.883077621459961,
                "OutputMass": 8.740226745605469,
                "DeltaMass": 0.14,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 1.0461878776550293,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-27T04:00:00+00:00",
            "values": {
                "InputTemperature": 81.34844970703125,
                "OutputTemperature": 52.29463195800781,
                "DeltaTemperature": 29.05,
                "InputVolume": 8.739999771118164,
                "OutputVolume": 8.454999923706055,
                "DeltaVolume": 0.28,
                "InputMass": 8.489738464355469,
                "OutputMass": 8.346424102783203,
                "DeltaMass": 0.14,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 1.034225583076477,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-27T05:00:00+00:00",
            "values": {
                "InputTemperature": 80.45865631103516,
                "OutputTemperature": 51.7446174621582,
                "DeltaTemperature": 28.71,
                "InputVolume": 8.4399995803833,
                "OutputVolume": 8.164999961853027,
                "DeltaVolume": 0.27,
                "InputMass": 8.201581001281738,
                "OutputMass": 8.06269359588623,
                "DeltaMass": 0.14,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.9873961210250854,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-27T06:00:00+00:00",
            "values": {
                "InputTemperature": 81.24116516113281,
                "OutputTemperature": 51.74562072753906,
                "DeltaTemperature": 29.5,
                "InputVolume": 8.739999771118164,
                "OutputVolume": 8.454999923706055,
                "DeltaVolume": 0.28,
                "InputMass": 8.488794326782227,
                "OutputMass": 8.34861946105957,
                "DeltaMass": 0.14,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 1.0498087406158447,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-27T07:00:00+00:00",
            "values": {
                "InputTemperature": 81.61368560791016,
                "OutputTemperature": 51.96894073486328,
                "DeltaTemperature": 29.64,
                "InputVolume": 8.149999618530273,
                "OutputVolume": 7.880000114440918,
                "DeltaVolume": 0.27,
                "InputMass": 7.915046691894531,
                "OutputMass": 7.781442165374756,
                "DeltaMass": 0.13,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.98382568359375,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-27T08:00:00+00:00",
            "values": {
                "InputTemperature": 81.84893798828125,
                "OutputTemperature": 51.211185455322266,
                "DeltaTemperature": 30.64,
                "InputVolume": 7.775000095367432,
                "OutputVolume": 7.514999866485596,
                "DeltaVolume": 0.26,
                "InputMass": 7.5504655838012695,
                "OutputMass": 7.421504497528076,
                "DeltaMass": 0.13,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.9699028134346008,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-27T09:00:00+00:00",
            "values": {
                "InputTemperature": 84.56600189208984,
                "OutputTemperature": 49.9423713684082,
                "DeltaTemperature": 34.62,
                "InputVolume": 7.085000038146973,
                "OutputVolume": 6.849999904632568,
                "DeltaVolume": 0.24,
                "InputMass": 6.867384910583496,
                "OutputMass": 6.770634174346924,
                "DeltaMass": 0.1,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.9969197511672974,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-27T10:00:00+00:00",
            "values": {
                "InputTemperature": 87.01836395263672,
                "OutputTemperature": 50.39765930175781,
                "DeltaTemperature": 36.62,
                "InputVolume": 5.610000133514404,
                "OutputVolume": 5.409999847412109,
                "DeltaVolume": 0.2,
                "InputMass": 5.428230285644531,
                "OutputMass": 5.345829486846924,
                "DeltaMass": 0.08,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.8335464000701904,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-27T11:00:00+00:00",
            "values": {
                "InputTemperature": 80.31373596191406,
                "OutputTemperature": 49.01559066772461,
                "DeltaTemperature": 31.3,
                "InputVolume": 6.994999885559082,
                "OutputVolume": 6.775000095367432,
                "DeltaVolume": 0.22,
                "InputMass": 6.798131942749023,
                "OutputMass": 6.700589656829834,
                "DeltaMass": 0.1,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.8919421434402466,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-27T12:00:00+00:00",
            "values": {
                "InputTemperature": 80.30052947998047,
                "OutputTemperature": 49.46324157714844,
                "DeltaTemperature": 30.84,
                "InputVolume": 7.755000114440918,
                "OutputVolume": 7.505000114440918,
                "DeltaVolume": 0.25,
                "InputMass": 7.536378860473633,
                "OutputMass": 7.420783519744873,
                "DeltaMass": 0.12,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.9742366671562195,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-27T13:00:00+00:00",
            "values": {
                "InputTemperature": 84.15167999267578,
                "OutputTemperature": 49.21717071533203,
                "DeltaTemperature": 34.93,
                "InputVolume": 6.164999961853027,
                "OutputVolume": 5.960000038146973,
                "DeltaVolume": 0.2,
                "InputMass": 5.977787494659424,
                "OutputMass": 5.892674922943115,
                "DeltaMass": 0.09,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.8755226135253906,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-27T14:00:00+00:00",
            "values": {
                "InputTemperature": 83.78809356689453,
                "OutputTemperature": 49.507896423339844,
                "DeltaTemperature": 34.28,
                "InputVolume": 7.139999866485596,
                "OutputVolume": 6.90500020980835,
                "DeltaVolume": 0.23,
                "InputMass": 6.924205303192139,
                "OutputMass": 6.8264360427856445,
                "DeltaMass": 0.1,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.9951478242874146,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-27T15:00:00+00:00",
            "values": {
                "InputTemperature": 83.4330825805664,
                "OutputTemperature": 50.19954299926758,
                "DeltaTemperature": 33.23,
                "InputVolume": 6.965000152587891,
                "OutputVolume": 6.724999904632568,
                "DeltaVolume": 0.24,
                "InputMass": 6.755995273590088,
                "OutputMass": 6.645981788635254,
                "DeltaMass": 0.11,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.941361665725708,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-27T16:00:00+00:00",
            "values": {
                "InputTemperature": 83.09767150878906,
                "OutputTemperature": 50.587276458740234,
                "DeltaTemperature": 32.51,
                "InputVolume": 7.760000228881836,
                "OutputVolume": 7.5,
                "DeltaVolume": 0.26,
                "InputMass": 7.527556896209717,
                "OutputMass": 7.409867286682129,
                "DeltaMass": 0.12,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 1.0260534286499023,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-27T17:00:00+00:00",
            "values": {
                "InputTemperature": 82.92391967773438,
                "OutputTemperature": 50.92914962768555,
                "DeltaTemperature": 31.99,
                "InputVolume": 7.684999942779541,
                "OutputVolume": 7.425000190734863,
                "DeltaVolume": 0.26,
                "InputMass": 7.455577373504639,
                "OutputMass": 7.336048603057861,
                "DeltaMass": 0.12,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 1.000150442123413,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-27T18:00:00+00:00",
            "values": {
                "InputTemperature": 83.30726623535156,
                "OutputTemperature": 51.38141632080078,
                "DeltaTemperature": 31.93,
                "InputVolume": 7.804999828338623,
                "OutputVolume": 7.534999847412109,
                "DeltaVolume": 0.27,
                "InputMass": 7.569947719573975,
                "OutputMass": 7.441929817199707,
                "DeltaMass": 0.13,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 1.0133423805236816,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-27T19:00:00+00:00",
            "values": {
                "InputTemperature": 83.2850341796875,
                "OutputTemperature": 51.3235969543457,
                "DeltaTemperature": 31.96,
                "InputVolume": 8.020000457763672,
                "OutputVolume": 7.739999771118164,
                "DeltaVolume": 0.28,
                "InputMass": 7.778906345367432,
                "OutputMass": 7.645318984985352,
                "DeltaMass": 0.13,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 1.0424649715423584,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-27T20:00:00+00:00",
            "values": {
                "InputTemperature": 82.66529846191406,
                "OutputTemperature": 51.8575553894043,
                "DeltaTemperature": 30.81,
                "InputVolume": 7.909999847412109,
                "OutputVolume": 7.639999866485596,
                "DeltaVolume": 0.27,
                "InputMass": 7.675849437713623,
                "OutputMass": 7.544045448303223,
                "DeltaMass": 0.13,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.9915282726287842,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-27T21:00:00+00:00",
            "values": {
                "InputTemperature": 81.6989974975586,
                "OutputTemperature": 51.203857421875,
                "DeltaTemperature": 30.5,
                "InputVolume": 8.0649995803833,
                "OutputVolume": 7.789999961853027,
                "DeltaVolume": 0.27,
                "InputMass": 7.830495834350586,
                "OutputMass": 7.698651313781738,
                "DeltaMass": 0.13,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 1.001206398010254,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-27T22:00:00+00:00",
            "values": {
                "InputTemperature": 81.0708236694336,
                "OutputTemperature": 51.70677185058594,
                "DeltaTemperature": 29.36,
                "InputVolume": 8.654999732971191,
                "OutputVolume": 8.364999771118164,
                "DeltaVolume": 0.29,
                "InputMass": 8.408355712890625,
                "OutputMass": 8.259190559387207,
                "DeltaMass": 0.15,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 1.0352197885513306,
                "TimeWork": 1
            }
        },
        {
            "timestamp": "2021-01-27T23:00:00+00:00",
            "values": {
                "InputTemperature": 83.00418853759766,
                "OutputTemperature": 51.613136291503906,
                "DeltaTemperature": 31.39,
                "InputVolume": 7.460000038146973,
                "OutputVolume": 7.215000152587891,
                "DeltaVolume": 0.24,
                "InputMass": 7.237910270690918,
                "OutputMass": 7.127441883087158,
                "DeltaMass": 0.11,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.1,
                "Energy": 0.9526549577713013,
                "TimeWork": 1
            }
        }
    ]
};

const readingsSevenDaysByDays = {
    "resource": "Heat",
    "systemPipeCount": 2,
    "archiveEntries": [
        {
            "timestamp": "2021-01-01T23:00:00+00:00",
            "values": {
                "InputTemperature": 91.30854797363281,
                "OutputTemperature": 52.38545227050781,
                "DeltaTemperature": 38.92,
                "InputVolume": 143.5850067138672,
                "OutputVolume": 138.81500244140625,
                "DeltaVolume": 4.77,
                "InputMass": 138.5260467529297,
                "OutputMass": 137.0455322265625,
                "DeltaMass": 1.48,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 22.615036010742188,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-02T23:00:00+00:00",
            "values": {
                "InputTemperature": 86.55547332763672,
                "OutputTemperature": 52.28786087036133,
                "DeltaTemperature": 34.27,
                "InputVolume": 164.11000061035156,
                "OutputVolume": 158.7449951171875,
                "DeltaVolume": 5.37,
                "InputMass": 158.84677124023438,
                "OutputMass": 156.7331085205078,
                "DeltaMass": 2.11,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 22.826635360717773,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-03T23:00:00+00:00",
            "values": {
                "InputTemperature": 86.39665222167969,
                "OutputTemperature": 52.389041900634766,
                "DeltaTemperature": 34.01,
                "InputVolume": 164.55999755859375,
                "OutputVolume": 159.26499938964844,
                "DeltaVolume": 5.29,
                "InputMass": 159.29541015625,
                "OutputMass": 157.2328338623047,
                "DeltaMass": 2.06,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 22.717586517333984,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-04T23:00:00+00:00",
            "values": {
                "InputTemperature": 82.20222473144531,
                "OutputTemperature": 49.19820785522461,
                "DeltaTemperature": 33,
                "InputVolume": 144.53500366210938,
                "OutputVolume": 140.35499572753906,
                "DeltaVolume": 4.18,
                "InputMass": 140.29727172851562,
                "OutputMass": 138.78021240234375,
                "DeltaMass": 1.52,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 19.412019729614258,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-05T23:00:00+00:00",
            "values": {
                "InputTemperature": 81.43883514404297,
                "OutputTemperature": 48.673561096191406,
                "DeltaTemperature": 32.77,
                "InputVolume": 141.9499969482422,
                "OutputVolume": 137.9250030517578,
                "DeltaVolume": 4.02,
                "InputMass": 137.85763549804688,
                "OutputMass": 136.40826416015625,
                "DeltaMass": 1.45,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 18.935518264770508,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-06T23:00:00+00:00",
            "values": {
                "InputTemperature": 89.54032897949219,
                "OutputTemperature": 52.455116271972656,
                "DeltaTemperature": 37.09,
                "InputVolume": 154.65499877929688,
                "OutputVolume": 149.57000732421875,
                "DeltaVolume": 5.08,
                "InputMass": 149.39515686035156,
                "OutputMass": 147.66197204589844,
                "DeltaMass": 1.73,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 23.236310958862305,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-07T23:00:00+00:00",
            "values": {
                "InputTemperature": 89.81693267822266,
                "OutputTemperature": 53.29865646362305,
                "DeltaTemperature": 36.52,
                "InputVolume": 163.14999389648438,
                "OutputVolume": 157.61000061035156,
                "DeltaVolume": 5.54,
                "InputMass": 157.56619262695312,
                "OutputMass": 155.53985595703125,
                "DeltaMass": 2.03,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 24.13385009765625,
                "TimeWork": 24
            }
        }
    ]
};

const readingsOneMonthByDays = {
    "resource": "Heat",
    "systemPipeCount": 2,
    "archiveEntries": [
        {
            "timestamp": "2021-01-01T23:00:00+00:00",
            "values": {
                "InputTemperature": 91.30854797363281,
                "OutputTemperature": 52.38545227050781,
                "DeltaTemperature": 38.92,
                "InputVolume": 143.5850067138672,
                "OutputVolume": 138.81500244140625,
                "DeltaVolume": 4.77,
                "InputMass": 138.5260467529297,
                "OutputMass": 137.0455322265625,
                "DeltaMass": 1.48,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 22.615036010742188,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-02T23:00:00+00:00",
            "values": {
                "InputTemperature": 86.55547332763672,
                "OutputTemperature": 52.28786087036133,
                "DeltaTemperature": 34.27,
                "InputVolume": 164.11000061035156,
                "OutputVolume": 158.7449951171875,
                "DeltaVolume": 5.37,
                "InputMass": 158.84677124023438,
                "OutputMass": 156.7331085205078,
                "DeltaMass": 2.11,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 22.826635360717773,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-03T23:00:00+00:00",
            "values": {
                "InputTemperature": 86.39665222167969,
                "OutputTemperature": 52.389041900634766,
                "DeltaTemperature": 34.01,
                "InputVolume": 164.55999755859375,
                "OutputVolume": 159.26499938964844,
                "DeltaVolume": 5.29,
                "InputMass": 159.29541015625,
                "OutputMass": 157.2328338623047,
                "DeltaMass": 2.06,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 22.717586517333984,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-04T23:00:00+00:00",
            "values": {
                "InputTemperature": 82.20222473144531,
                "OutputTemperature": 49.19820785522461,
                "DeltaTemperature": 33,
                "InputVolume": 144.53500366210938,
                "OutputVolume": 140.35499572753906,
                "DeltaVolume": 4.18,
                "InputMass": 140.29727172851562,
                "OutputMass": 138.78021240234375,
                "DeltaMass": 1.52,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 19.412019729614258,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-05T23:00:00+00:00",
            "values": {
                "InputTemperature": 81.43883514404297,
                "OutputTemperature": 48.673561096191406,
                "DeltaTemperature": 32.77,
                "InputVolume": 141.9499969482422,
                "OutputVolume": 137.9250030517578,
                "DeltaVolume": 4.02,
                "InputMass": 137.85763549804688,
                "OutputMass": 136.40826416015625,
                "DeltaMass": 1.45,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 18.935518264770508,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-06T23:00:00+00:00",
            "values": {
                "InputTemperature": 89.54032897949219,
                "OutputTemperature": 52.455116271972656,
                "DeltaTemperature": 37.09,
                "InputVolume": 154.65499877929688,
                "OutputVolume": 149.57000732421875,
                "DeltaVolume": 5.08,
                "InputMass": 149.39515686035156,
                "OutputMass": 147.66197204589844,
                "DeltaMass": 1.73,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 23.236310958862305,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-07T23:00:00+00:00",
            "values": {
                "InputTemperature": 89.81693267822266,
                "OutputTemperature": 53.29865646362305,
                "DeltaTemperature": 36.52,
                "InputVolume": 163.14999389648438,
                "OutputVolume": 157.61000061035156,
                "DeltaVolume": 5.54,
                "InputMass": 157.56619262695312,
                "OutputMass": 155.53985595703125,
                "DeltaMass": 2.03,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 24.13385009765625,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-08T23:00:00+00:00",
            "values": {
                "InputTemperature": 86.8895492553711,
                "OutputTemperature": 51.977272033691406,
                "DeltaTemperature": 34.91,
                "InputVolume": 158.58999633789062,
                "OutputVolume": 153.3350067138672,
                "DeltaVolume": 5.25,
                "InputMass": 153.47093200683594,
                "OutputMass": 151.4032440185547,
                "DeltaMass": 2.07,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 22.46904754638672,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-09T23:00:00+00:00",
            "values": {
                "InputTemperature": 86.22206115722656,
                "OutputTemperature": 50.911434173583984,
                "DeltaTemperature": 35.31,
                "InputVolume": 148.28500366210938,
                "OutputVolume": 143.38999938964844,
                "DeltaVolume": 4.9,
                "InputMass": 143.5594940185547,
                "OutputMass": 141.6596221923828,
                "DeltaMass": 1.9,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 21.255908966064453,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-10T23:00:00+00:00",
            "values": {
                "InputTemperature": 86.06217956542969,
                "OutputTemperature": 52.519325256347656,
                "DeltaTemperature": 33.54,
                "InputVolume": 166.6699981689453,
                "OutputVolume": 160.97500610351562,
                "DeltaVolume": 5.69,
                "InputMass": 161.37368774414062,
                "OutputMass": 158.90753173828125,
                "DeltaMass": 2.47,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 22.69924545288086,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-11T23:00:00+00:00",
            "values": {
                "InputTemperature": 101.04224395751953,
                "OutputTemperature": 59.451656341552734,
                "DeltaTemperature": 41.59,
                "InputVolume": 187.10499572753906,
                "OutputVolume": 179.18499755859375,
                "DeltaVolume": 7.92,
                "InputMass": 179.23854064941406,
                "OutputMass": 176.2792205810547,
                "DeltaMass": 2.96,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 31.2965030670166,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-12T23:00:00+00:00",
            "values": {
                "InputTemperature": 109.58167266845703,
                "OutputTemperature": 61.79902267456055,
                "DeltaTemperature": 47.78,
                "InputVolume": 175.5850067138672,
                "OutputVolume": 167.4149932861328,
                "DeltaVolume": 8.17,
                "InputMass": 167.1074981689453,
                "OutputMass": 164.47598266601562,
                "DeltaMass": 2.63,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 33.546607971191406,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-13T23:00:00+00:00",
            "values": {
                "InputTemperature": 111.66014862060547,
                "OutputTemperature": 65.93968963623047,
                "DeltaTemperature": 45.72,
                "InputVolume": 231.78500366210938,
                "OutputVolume": 220.66000366210938,
                "DeltaVolume": 11.12,
                "InputMass": 220.2338104248047,
                "OutputMass": 216.3050079345703,
                "DeltaMass": 3.93,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 42.322879791259766,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-14T23:00:00+00:00",
            "values": {
                "InputTemperature": 106.3511962890625,
                "OutputTemperature": 57.942466735839844,
                "DeltaTemperature": 48.41,
                "InputVolume": 165.31500244140625,
                "OutputVolume": 157.60000610351562,
                "DeltaVolume": 7.71,
                "InputMass": 157.72317504882812,
                "OutputMass": 155.1438446044922,
                "DeltaMass": 2.58,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 32.063785552978516,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-15T23:00:00+00:00",
            "values": {
                "InputTemperature": 93.25048065185547,
                "OutputTemperature": 50.941158294677734,
                "DeltaTemperature": 42.31,
                "InputVolume": 145.3300018310547,
                "OutputVolume": 138.875,
                "DeltaVolume": 6.46,
                "InputMass": 140.0200653076172,
                "OutputMass": 137.20518493652344,
                "DeltaMass": 2.81,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 24.8480224609375,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-16T23:00:00+00:00",
            "values": {
                "InputTemperature": 90.59664916992188,
                "OutputTemperature": 50.14306640625,
                "DeltaTemperature": 40.45,
                "InputVolume": 145.6999969482422,
                "OutputVolume": 139.94500732421875,
                "DeltaVolume": 5.75,
                "InputMass": 140.63656616210938,
                "OutputMass": 138.31202697753906,
                "DeltaMass": 2.32,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 23.859132766723633,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-17T23:00:00+00:00",
            "values": {
                "InputTemperature": 102.04714965820312,
                "OutputTemperature": 55.621070861816406,
                "DeltaTemperature": 46.43,
                "InputVolume": 166.86500549316406,
                "OutputVolume": 159.4499969482422,
                "DeltaVolume": 7.42,
                "InputMass": 159.73675537109375,
                "OutputMass": 157.16920471191406,
                "DeltaMass": 2.57,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 31.128204345703125,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-18T23:00:00+00:00",
            "values": {
                "InputTemperature": 112.0982437133789,
                "OutputTemperature": 61.267581939697266,
                "DeltaTemperature": 50.83,
                "InputVolume": 189.0850067138672,
                "OutputVolume": 179.77499389648438,
                "DeltaVolume": 9.31,
                "InputMass": 179.597412109375,
                "OutputMass": 176.68077087402344,
                "DeltaMass": 2.92,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 38.36100769042969,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-19T23:00:00+00:00",
            "values": {
                "InputTemperature": 112.18697357177734,
                "OutputTemperature": 59.51128005981445,
                "DeltaTemperature": 52.68,
                "InputVolume": 167.41000366210938,
                "OutputVolume": 159.0500030517578,
                "DeltaVolume": 8.36,
                "InputMass": 158.99447631835938,
                "OutputMass": 156.452880859375,
                "DeltaMass": 2.54,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 35.18937683105469,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-20T23:00:00+00:00",
            "values": {
                "InputTemperature": 110.92921447753906,
                "OutputTemperature": 60.842288970947266,
                "DeltaTemperature": 50.09,
                "InputVolume": 188.64999389648438,
                "OutputVolume": 179.36000061035156,
                "DeltaVolume": 9.29,
                "InputMass": 179.3507843017578,
                "OutputMass": 176.3083038330078,
                "DeltaMass": 3.04,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 37.74273681640625,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-21T23:00:00+00:00",
            "values": {
                "InputTemperature": 104.19404602050781,
                "OutputTemperature": 54.9267692565918,
                "DeltaTemperature": 49.27,
                "InputVolume": 150.99000549316406,
                "OutputVolume": 143.8699951171875,
                "DeltaVolume": 7.12,
                "InputMass": 144.30494689941406,
                "OutputMass": 141.84811401367188,
                "DeltaMass": 2.46,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 29.84528350830078,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-22T23:00:00+00:00",
            "values": {
                "InputTemperature": 101.0163803100586,
                "OutputTemperature": 53.927284240722656,
                "DeltaTemperature": 47.09,
                "InputVolume": 153.1300048828125,
                "OutputVolume": 146.11500549316406,
                "DeltaVolume": 7.01,
                "InputMass": 146.70443725585938,
                "OutputMass": 144.14627075195312,
                "DeltaMass": 2.56,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 28.991928100585938,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-23T23:00:00+00:00",
            "values": {
                "InputTemperature": 101.00366973876953,
                "OutputTemperature": 56.47611618041992,
                "DeltaTemperature": 44.53,
                "InputVolume": 174.0850067138672,
                "OutputVolume": 166.08999633789062,
                "DeltaVolume": 8,
                "InputMass": 166.78164672851562,
                "OutputMass": 163.6332550048828,
                "DeltaMass": 3.15,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 31.172229766845703,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-24T23:00:00+00:00",
            "values": {
                "InputTemperature": 84.75853729248047,
                "OutputTemperature": 49.7490119934082,
                "DeltaTemperature": 35.01,
                "InputVolume": 154.11500549316406,
                "OutputVolume": 148.27999877929688,
                "DeltaVolume": 5.84,
                "InputMass": 149.33773803710938,
                "OutputMass": 146.57461547851562,
                "DeltaMass": 2.76,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 21.921350479125977,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-25T23:00:00+00:00",
            "values": {
                "InputTemperature": 77.58181762695312,
                "OutputTemperature": 46.2865104675293,
                "DeltaTemperature": 31.3,
                "InputVolume": 148.27499389648438,
                "OutputVolume": 143.3350067138672,
                "DeltaVolume": 4.94,
                "InputMass": 144.3459930419922,
                "OutputMass": 141.9133758544922,
                "DeltaMass": 2.43,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 18.933246612548828,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-26T23:00:00+00:00",
            "values": {
                "InputTemperature": 79.39667510986328,
                "OutputTemperature": 49.58212661743164,
                "DeltaTemperature": 29.81,
                "InputVolume": 183.15499877929688,
                "OutputVolume": 176.97500610351562,
                "DeltaVolume": 6.18,
                "InputMass": 178.1060791015625,
                "OutputMass": 174.96163940429688,
                "DeltaMass": 3.14,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 22.260910034179688,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-27T23:00:00+00:00",
            "values": {
                "InputTemperature": 81.90367889404297,
                "OutputTemperature": 51.04888916015625,
                "DeltaTemperature": 30.85,
                "InputVolume": 188.00999450683594,
                "OutputVolume": 181.78500366210938,
                "DeltaVolume": 6.22,
                "InputMass": 182.54014587402344,
                "OutputMass": 179.57908630371094,
                "DeltaMass": 2.96,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 23.614397048950195,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-28T23:00:00+00:00",
            "values": {
                "InputTemperature": 83.86156463623047,
                "OutputTemperature": 51.04117202758789,
                "DeltaTemperature": 32.82,
                "InputVolume": 178.22000122070312,
                "OutputVolume": 172.14999389648438,
                "DeltaVolume": 6.07,
                "InputMass": 172.8122100830078,
                "OutputMass": 170.06863403320312,
                "DeltaMass": 2.74,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 23.781219482421875,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-29T23:00:00+00:00",
            "values": {
                "InputTemperature": 84.27535247802734,
                "OutputTemperature": 50.05216598510742,
                "DeltaTemperature": 34.22,
                "InputVolume": 159.4550018310547,
                "OutputVolume": 154.00999450683594,
                "DeltaVolume": 5.45,
                "InputMass": 154.56813049316406,
                "OutputMass": 152.21456909179688,
                "DeltaMass": 2.35,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 22.17882537841797,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-30T23:00:00+00:00",
            "values": {
                "InputTemperature": 81.11154174804688,
                "OutputTemperature": 48.867305755615234,
                "DeltaTemperature": 32.24,
                "InputVolume": 159.4499969482422,
                "OutputVolume": 154.0749969482422,
                "DeltaVolume": 5.38,
                "InputMass": 154.8833465576172,
                "OutputMass": 152.36566162109375,
                "DeltaMass": 2.52,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 20.93589973449707,
                "TimeWork": 24
            }
        },
        {
            "timestamp": "2021-01-31T23:00:00+00:00",
            "values": {
                "InputTemperature": 77.1357421875,
                "OutputTemperature": 47.609962463378906,
                "DeltaTemperature": 29.53,
                "InputVolume": 162.06500244140625,
                "OutputVolume": 156.77000427246094,
                "DeltaVolume": 5.29,
                "InputMass": 157.82579040527344,
                "OutputMass": 155.12232971191406,
                "DeltaMass": 2.7,
                "InputPressure": 0.6000001430511475,
                "OutputPressure": 0.5019339919090271,
                "DeltaPressure": 0.1,
                "Energy": 19.532047271728516,
                "TimeWork": 24
            }
        }
    ]
};

const readings: ReadingsInterface = JSON.parse(JSON.stringify(readingsOneMonthByDays))

const formatDate = (timeStamp: string): Date => {
    const dateObject = new Date(timeStamp);
    const millisecondsInHour = 60 * 1000;
    const date = new Date(dateObject.valueOf() + dateObject.getTimezoneOffset() * millisecondsInHour);
    return date;
}

const getHourFromTimeStamp = (timeStamp: string): number => {
    const date = formatDate(timeStamp);
    return +format(date, 'HH');
}

const isHourMultiplySix = (timeStamp: string): boolean => {
    const hour = getHourFromTimeStamp(timeStamp)
    return hour % 6 === 0;
}

const getDayFromTimeStamp = (timeStamp: string): number => {
    const date = formatDate(timeStamp);
    return +format(date, 'dd');
}

const isDayMultiplyFive = (timeStamp: string): boolean => {
    const day = getDayFromTimeStamp(timeStamp)
    return day % 5 === 0;
}

const formHourlyTicks = (archiveArr: ArchiveEntryInterface[]): ArchiveEntryInterface[] => {
    if (archiveArr.length <= 24) return archiveArr;
    return [...archiveArr.filter((entry) => isHourMultiplySix(entry.timestamp)), archiveArr[archiveArr.length-1]]
}

const formDailyTicks = (archiveArr: ArchiveEntryInterface[]): ArchiveEntryInterface[]  => {
    if (archiveArr.length <= 14) return archiveArr

    const length = archiveArr.length;
    const multipleFives = archiveArr.filter((entry) => isDayMultiplyFive(entry.timestamp));
    const delta1 = getDayFromTimeStamp(multipleFives[0].timestamp) - getDayFromTimeStamp(archiveArr[0].timestamp);
    const delta2 = getDayFromTimeStamp(archiveArr[length - 1].timestamp) - getDayFromTimeStamp(multipleFives[multipleFives.length - 1].timestamp);
    const sliceParam1 = delta1 < 2 ? 1 : 0;
    const sliceParam2 = delta2 < 2 ? multipleFives.length - 1 : multipleFives.length;

    return [archiveArr[0], ...multipleFives.slice(sliceParam1, sliceParam2), archiveArr[length - 1]]
}

export type ReportType = 'hourly' | 'daily'| 'monthly'

const formTicks = (archiveArr: ArchiveEntryInterface[], reportType: ReportType): ArchiveEntryInterface[] => {
    switch (reportType) {
        case 'hourly':
            return formHourlyTicks(archiveArr);
        case 'daily':
            return formDailyTicks(archiveArr);
        default:
            throw new Error('Неправильный тип!')
    }
}

const getTickFormat = (archiveArr: ArchiveEntryInterface[], reportType: ReportType) => {
    if (reportType === 'daily') {
        return (x: string) => format(formatDate(x), 'dd.MM')
    }
    if (archiveArr.length <=24) {
        return (x: string) => format(formatDate(x), 'HH')
    }
    return (x: string) => format(formatDate(x), 'HH:mm')
}

// const graphDataNew = formHourlyTicks(readings.archiveEntries).map((entry) => {
//     return {
//         time: entry.timestamp,
//         value: entry.values.DeltaMass,
//     }
// })





// const tickValues = formHourlyTicks(readingsByHours.archiveEntries);


const Graph: React.FC = () => {

    // http://84.201.132.164:8080/api/archivesCalculator/getArchive?nodeId=1935&reportType=daily&from=2021-01-20T00:00:00Z&to=2021-02-10T23:00:00Z

    const nodeId = 1935;

    const reportType = 'daily' as ReportType;

    const resource = "Heat";

    const graphParam = 'DeltaMass';

    const from = '2021-01-25T00:00:00Z';

    const to = '2021-01-25T23:00:00Z';

    const getInitialState = () => {
        return {
            nodeId,
            reportType,
            from,
            to
        }
    }

    const [searchQuery, setSearchQuery] = useState(getInitialState);


    const getReadings = useCallback(
        () => {
            // return requestNodeReadings(deviceId, reportType, resource, from, to);
            return requestNodeReadings(searchQuery);
        },
        [searchQuery],
    );

    const { execute, status, value: data, error } = useAsync<ReadingsInterface, {message: string}>(getReadings, true);

    useEffect(() => {
        console.log(searchQuery);
    }, [searchQuery])

    if (status === 'pending') return <>'ЗАГРУЗКА...'</>

    const archiveEntries = _.get(data, 'archiveEntries', []);
    // const archiveEntries = data?.archiveEntries || [];


    const tickValues = formTicks(archiveEntries, reportType);


    const formGraphData = (ticks: ArchiveEntryInterface[]): GraphDataInterface[] => {
        return ticks.map((entry) => {
            return {
                time: entry.timestamp,
                value: entry.values[graphParam],
            }
        })
    }

    const graphDataNew = formGraphData(tickValues);

    const maxElement = maxBy(graphDataNew, (obj) => obj.value);

    const maxValue = maxElement?.value;

    const handleSubmit = (values, actions) => {
        setSearchQuery((prevQuery) => ({
            ...prevQuery,
            from: values.dateRange[0].toISOString(),
            to: values.dateRange[1].toISOString(),
            reportType: values.reportType
        }))
        actions.setSubmitting(false);
    }

    // console.log(new Date().toISOString())


    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    // const formInitialDates = () => {
    //     // Прибавить сюда 3 часа с помощью formatDate()
    //     const date = new Date();
    //     return [new Date(date), new Date(date.setDate(date.getDate() + 7))]
    // }

    return (
        <>
            <Tooltip title="search">
                <Button style={{display: 'flex', justifyContent: 'center'}} shape="circle" icon={<IconTT icon="searchFilter"/>} />
            </Tooltip>
            <Formik
                initialValues={{
                    // dateRange: formInitialDates(),
                    dateRange: [moment(), moment()],
                    reportType: "daily"
                }}
                onSubmit={handleSubmit}
                // validate={values => {
                //     if (!values.userName) {
                //         return { userName: "required" }
                //     }
                //     return undefined
                // }}
                render={formik => (
                    <Form>
                        <DatePicker.RangePicker
                            name="dateRange"
                        />
                        <Radio.Group
                            name="reportType"
                            options={[
                                {label: "Часовой", value: "hourly"},
                                {label: "Суточный", value: "daily"},
                            ]}
                        />
                        <SubmitButton disabled={false}>Отправить</SubmitButton>
                        {/*<FormikDebug style={{ maxWidth: 400 }} />*/}
                    </Form>
                )
                }
                />


            {status === 'idle' && <div>Start your journey by clicking a button</div>}
            {status === 'success' && <GraphWrapper>
                <Gradient resource={resource}/>
                <VictoryChart
                    domain={{ y: [0, 1.1*maxValue!] }}
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
                        style={{ parent: {overflow: 'visible'}, data: { fill: `url(#${resource})`, stroke: getResourceColor(resource), strokeWidth: 2  } }}
                        data={graphDataNew}
                        x="time"
                        y="value"
                    />



                    <VictoryAxis
                        // tickFormat={(x) => {const time = format(new Date(x), 'dd'); return time}}
                        // tickFormat={(x) => format(formatDate(x), 'HH')}
                        // tickFormat={(x) => format(formatDate(x), 'HH:mm')}
                        // tickFormat={(x) => format(formatDate(x), 'dd.MM')}
                        tickFormat={getTickFormat(data!.archiveEntries, reportType)}
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
            </GraphWrapper>}
            {status === 'error' && <div>{error?.message}</div>}
            {/*<button onClick={execute} disabled={status === 'pending'}>*/}
            {/*    {status !== 'pending' ? 'Click me' : 'Loading...'}*/}
            {/*</button>*/}
        </>
    )
}

const GraphWrapper = styled.div`
    svg {
        overflow: visible !important;
    }

`

export default Graph;
