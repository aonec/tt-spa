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

const readingsNew = {
    "ResourceType": "Heat",
    "SystemPipeCount": 2,
    "ArchiveEntries": [
        // {
        //     "Timestamp": "2021-01-15T03:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 92.04765319824219,
        //         "OutputTemperature": 50.691429138183594,
        //         "DeltaTemperature": 41.356224060058594,
        //         "InputVolume": 6.215000152587891,
        //         "OutputVolume": 5.974999904632568,
        //         "DeltaVolume": 0.24000024795532227,
        //         "InputMass": 5.99193811416626,
        //         "OutputMass": 5.9046196937561035,
        //         "DeltaMass": 0.08731842041015625,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.0393081903457642,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-15T04:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 93.08071899414062,
        //         "OutputTemperature": 51.26436233520508,
        //         "DeltaTemperature": 41.81635665893555,
        //         "InputVolume": 6.065000057220459,
        //         "OutputVolume": 5.815000057220459,
        //         "DeltaVolume": 0.25,
        //         "InputMass": 5.844996929168701,
        //         "OutputMass": 5.7426981925964355,
        //         "DeltaMass": 0.10229873657226562,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.0251669883728027,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-15T05:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 95.1644515991211,
        //         "OutputTemperature": 50.803131103515625,
        //         "DeltaTemperature": 44.36132049560547,
        //         "InputVolume": 5.820000171661377,
        //         "OutputVolume": 5.585000038146973,
        //         "DeltaVolume": 0.2350001335144043,
        //         "InputMass": 5.600499153137207,
        //         "OutputMass": 5.519921779632568,
        //         "DeltaMass": 0.08057737350463867,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.0421514511108398,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-15T06:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 94.26116943359375,
        //         "OutputTemperature": 50.79997253417969,
        //         "DeltaTemperature": 43.46119689941406,
        //         "InputVolume": 5.739999771118164,
        //         "OutputVolume": 5.505000114440918,
        //         "DeltaVolume": 0.2349996566772461,
        //         "InputMass": 5.526054382324219,
        //         "OutputMass": 5.437655925750732,
        //         "DeltaMass": 0.08839845657348633,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.0074007511138916,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-15T07:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 92.33848571777344,
        //         "OutputTemperature": 50.67459487915039,
        //         "DeltaTemperature": 41.66389083862305,
        //         "InputVolume": 6.465000152587891,
        //         "OutputVolume": 6.210000038146973,
        //         "DeltaVolume": 0.25500011444091797,
        //         "InputMass": 6.233354568481445,
        //         "OutputMass": 6.135278224945068,
        //         "DeltaMass": 0.09807634353637695,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.0892248153686523,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-15T08:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 91.57601928710938,
        //         "OutputTemperature": 51.42014694213867,
        //         "DeltaTemperature": 40.1558723449707,
        //         "InputVolume": 6.434999942779541,
        //         "OutputVolume": 6.170000076293945,
        //         "DeltaVolume": 0.2649998664855957,
        //         "InputMass": 6.206851482391357,
        //         "OutputMass": 6.0953521728515625,
        //         "DeltaMass": 0.11149930953979492,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.0453667640686035,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-15T09:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 91.4227523803711,
        //         "OutputTemperature": 50.978477478027344,
        //         "DeltaTemperature": 40.44427490234375,
        //         "InputVolume": 6.050000190734863,
        //         "OutputVolume": 5.809999942779541,
        //         "DeltaVolume": 0.24000024795532227,
        //         "InputMass": 5.837005138397217,
        //         "OutputMass": 5.741175651550293,
        //         "DeltaMass": 0.09582948684692383,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 0.9900863170623779,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-15T10:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 91.56558990478516,
        //         "OutputTemperature": 49.759822845458984,
        //         "DeltaTemperature": 41.80576705932617,
        //         "InputVolume": 5.710000038146973,
        //         "OutputVolume": 5.489999771118164,
        //         "DeltaVolume": 0.2200002670288086,
        //         "InputMass": 5.507312774658203,
        //         "OutputMass": 5.427291393280029,
        //         "DeltaMass": 0.08002138137817383,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 0.9655689001083374,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-15T11:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 91.82064056396484,
        //         "OutputTemperature": 49.27982711791992,
        //         "DeltaTemperature": 42.54081344604492,
        //         "InputVolume": 5.514999866485596,
        //         "OutputVolume": 5.300000190734863,
        //         "DeltaVolume": 0.21499967575073242,
        //         "InputMass": 5.317962169647217,
        //         "OutputMass": 5.241079330444336,
        //         "DeltaMass": 0.07688283920288086,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 0.948754072189331,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-15T12:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 91.64328002929688,
        //         "OutputTemperature": 49.72945022583008,
        //         "DeltaTemperature": 41.9138298034668,
        //         "InputVolume": 5.525000095367432,
        //         "OutputVolume": 5.304999828338623,
        //         "DeltaVolume": 0.2200002670288086,
        //         "InputMass": 5.329781532287598,
        //         "OutputMass": 5.243928909301758,
        //         "DeltaMass": 0.08585262298583984,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 0.9368607997894287,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-15T13:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 90.85664367675781,
        //         "OutputTemperature": 49.926273345947266,
        //         "DeltaTemperature": 40.93037033081055,
        //         "InputVolume": 4.25,
        //         "OutputVolume": 4.050000190734863,
        //         "DeltaVolume": 0.19999980926513672,
        //         "InputMass": 4.101539134979248,
        //         "OutputMass": 4.003347873687744,
        //         "DeltaMass": 0.0981912612915039,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 0.7040261030197144,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-15T14:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 92.06338500976562,
        //         "OutputTemperature": 47.81391906738281,
        //         "DeltaTemperature": 44.24946594238281,
        //         "InputVolume": 6.150000095367432,
        //         "OutputVolume": 5.420000076293945,
        //         "DeltaVolume": 0.7300000190734863,
        //         "InputMass": 5.9310383796691895,
        //         "OutputMass": 5.362405776977539,
        //         "DeltaMass": 0.5686326026916504,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.1005446910858154,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-15T15:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 93.4775390625,
        //         "OutputTemperature": 50.255577087402344,
        //         "DeltaTemperature": 43.221961975097656,
        //         "InputVolume": 5.739999771118164,
        //         "OutputVolume": 5.510000228881836,
        //         "DeltaVolume": 0.22999954223632812,
        //         "InputMass": 5.5294671058654785,
        //         "OutputMass": 5.445998191833496,
        //         "DeltaMass": 0.08346891403198242,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.002425193786621,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-15T16:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 94.66360473632812,
        //         "OutputTemperature": 50.09037780761719,
        //         "DeltaTemperature": 44.57322692871094,
        //         "InputVolume": 5.960000038146973,
        //         "OutputVolume": 5.710000038146973,
        //         "DeltaVolume": 0.25,
        //         "InputMass": 5.737515449523926,
        //         "OutputMass": 5.643120765686035,
        //         "DeltaMass": 0.09439468383789062,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.0726858377456665,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-15T17:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 94.81159210205078,
        //         "OutputTemperature": 51.51103210449219,
        //         "DeltaTemperature": 43.300559997558594,
        //         "InputVolume": 6.519999980926514,
        //         "OutputVolume": 6.239999771118164,
        //         "DeltaVolume": 0.2800002098083496,
        //         "InputMass": 6.274560451507568,
        //         "OutputMass": 6.1623687744140625,
        //         "DeltaMass": 0.11219167709350586,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.1396945714950562,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-15T18:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 95.32100677490234,
        //         "OutputTemperature": 51.727088928222656,
        //         "DeltaTemperature": 43.59391784667969,
        //         "InputVolume": 6.119999885559082,
        //         "OutputVolume": 5.849999904632568,
        //         "DeltaVolume": 0.26999998092651367,
        //         "InputMass": 5.8873467445373535,
        //         "OutputMass": 5.778005599975586,
        //         "DeltaMass": 0.10934114456176758,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.0766345262527466,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-15T19:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 94.27661895751953,
        //         "OutputTemperature": 51.95656204223633,
        //         "DeltaTemperature": 42.3200569152832,
        //         "InputVolume": 6.59499979019165,
        //         "OutputVolume": 6.315000057220459,
        //         "DeltaVolume": 0.2799997329711914,
        //         "InputMass": 6.349209308624268,
        //         "OutputMass": 6.235734462738037,
        //         "DeltaMass": 0.11347484588623047,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.127133846282959,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-15T20:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 94.57412719726562,
        //         "OutputTemperature": 51.65922546386719,
        //         "DeltaTemperature": 42.91490173339844,
        //         "InputVolume": 6.15500020980835,
        //         "OutputVolume": 5.894999980926514,
        //         "DeltaVolume": 0.26000022888183594,
        //         "InputMass": 5.925389766693115,
        //         "OutputMass": 5.821354866027832,
        //         "DeltaMass": 0.1040349006652832,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.0666736364364624,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-15T21:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 93.6443862915039,
        //         "OutputTemperature": 52.3095703125,
        //         "DeltaTemperature": 41.334815979003906,
        //         "InputVolume": 6.860000133514404,
        //         "OutputVolume": 6.565000057220459,
        //         "DeltaVolume": 0.2950000762939453,
        //         "InputMass": 6.606980323791504,
        //         "OutputMass": 6.48118257522583,
        //         "DeltaMass": 0.12579774856567383,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.1455494165420532,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-15T22:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 92.39356231689453,
        //         "OutputTemperature": 52.37605285644531,
        //         "DeltaTemperature": 40.01750946044922,
        //         "InputVolume": 6.795000076293945,
        //         "OutputVolume": 6.514999866485596,
        //         "DeltaVolume": 0.2800002098083496,
        //         "InputMass": 6.550300598144531,
        //         "OutputMass": 6.432936191558838,
        //         "DeltaMass": 0.11736440658569336,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.0994936227798462,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-15T23:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 92.84696960449219,
        //         "OutputTemperature": 52.531978607177734,
        //         "DeltaTemperature": 40.31499099731445,
        //         "InputVolume": 6.764999866485596,
        //         "OutputVolume": 6.485000133514404,
        //         "DeltaVolume": 0.2799997329711914,
        //         "InputMass": 6.519606113433838,
        //         "OutputMass": 6.402977466583252,
        //         "DeltaMass": 0.11662864685058594,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.10250985622406,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-16T00:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 93.22022247314453,
        //         "OutputTemperature": 51.9140739440918,
        //         "DeltaTemperature": 41.306148529052734,
        //         "InputVolume": 6.125,
        //         "OutputVolume": 5.880000114440918,
        //         "DeltaVolume": 0.24499988555908203,
        //         "InputMass": 5.901714324951172,
        //         "OutputMass": 5.806718826293945,
        //         "DeltaMass": 0.09499549865722656,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.0225294828414917,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-16T01:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 94.7996826171875,
        //         "OutputTemperature": 51.599449157714844,
        //         "DeltaTemperature": 43.200233459472656,
        //         "InputVolume": 6.019999980926514,
        //         "OutputVolume": 5.775000095367432,
        //         "DeltaVolume": 0.24499988555908203,
        //         "InputMass": 5.79365873336792,
        //         "OutputMass": 5.702811241149902,
        //         "DeltaMass": 0.09084749221801758,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.0498994588851929,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-16T02:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 94.42798614501953,
        //         "OutputTemperature": 51.01802444458008,
        //         "DeltaTemperature": 43.40996170043945,
        //         "InputVolume": 5.510000228881836,
        //         "OutputVolume": 5.284999847412109,
        //         "DeltaVolume": 0.22500038146972656,
        //         "InputMass": 5.305562496185303,
        //         "OutputMass": 5.220269680023193,
        //         "DeltaMass": 0.08529281616210938,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 0.966065526008606,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-16T03:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 93.40498352050781,
        //         "OutputTemperature": 50.47514343261719,
        //         "DeltaTemperature": 42.929840087890625,
        //         "InputVolume": 6.005000114440918,
        //         "OutputVolume": 5.775000095367432,
        //         "DeltaVolume": 0.23000001907348633,
        //         "InputMass": 5.7847065925598145,
        //         "OutputMass": 5.70706033706665,
        //         "DeltaMass": 0.07764625549316406,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.0415778160095215,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-16T04:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 93.72968292236328,
        //         "OutputTemperature": 50.940155029296875,
        //         "DeltaTemperature": 42.789527893066406,
        //         "InputVolume": 5.650000095367432,
        //         "OutputVolume": 5.420000076293945,
        //         "DeltaVolume": 0.23000001907348633,
        //         "InputMass": 5.442488670349121,
        //         "OutputMass": 5.3544230461120605,
        //         "DeltaMass": 0.08806562423706055,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 0.9767916798591614,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-16T05:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 92.87208557128906,
        //         "OutputTemperature": 50.34495162963867,
        //         "DeltaTemperature": 42.52713394165039,
        //         "InputVolume": 6.235000133514404,
        //         "OutputVolume": 5.985000133514404,
        //         "DeltaVolume": 0.25,
        //         "InputMass": 6.007903575897217,
        //         "OutputMass": 5.914142608642578,
        //         "DeltaMass": 0.09376096725463867,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.0716034173965454,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-16T06:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 89.23125457763672,
        //         "OutputTemperature": 51.24650955200195,
        //         "DeltaTemperature": 37.984745025634766,
        //         "InputVolume": 6.440000057220459,
        //         "OutputVolume": 6.190000057220459,
        //         "DeltaVolume": 0.25,
        //         "InputMass": 6.222878456115723,
        //         "OutputMass": 6.1140947341918945,
        //         "DeltaMass": 0.10878372192382812,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 0.9912726283073425,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-16T07:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 88.8191909790039,
        //         "OutputTemperature": 50.902137756347656,
        //         "DeltaTemperature": 37.91705322265625,
        //         "InputVolume": 6.965000152587891,
        //         "OutputVolume": 6.695000171661377,
        //         "DeltaVolume": 0.26999998092651367,
        //         "InputMass": 6.730279445648193,
        //         "OutputMass": 6.6150922775268555,
        //         "DeltaMass": 0.11518716812133789,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.0701558589935303,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-16T08:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 89.1511459350586,
        //         "OutputTemperature": 51.1208610534668,
        //         "DeltaTemperature": 38.0302848815918,
        //         "InputVolume": 6.304999828338623,
        //         "OutputVolume": 6.059999942779541,
        //         "DeltaVolume": 0.24499988555908203,
        //         "InputMass": 6.091351509094238,
        //         "OutputMass": 5.987583160400391,
        //         "DeltaMass": 0.10376834869384766,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 0.9714820981025696,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-16T09:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 89.0909423828125,
        //         "OutputTemperature": 50.3253059387207,
        //         "DeltaTemperature": 38.7656364440918,
        //         "InputVolume": 6.170000076293945,
        //         "OutputVolume": 5.929999828338623,
        //         "DeltaVolume": 0.24000024795532227,
        //         "InputMass": 5.96165132522583,
        //         "OutputMass": 5.861340522766113,
        //         "DeltaMass": 0.1003108024597168,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 0.9691488146781921,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-16T10:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 89.1193618774414,
        //         "OutputTemperature": 49.3023567199707,
        //         "DeltaTemperature": 39.8170051574707,
        //         "InputVolume": 5.590000152587891,
        //         "OutputVolume": 5.375,
        //         "DeltaVolume": 0.21500015258789062,
        //         "InputMass": 5.400818824768066,
        //         "OutputMass": 5.315647125244141,
        //         "DeltaMass": 0.08517169952392578,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 0.9017335176467896,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-16T11:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 89.01419830322266,
        //         "OutputTemperature": 48.35292053222656,
        //         "DeltaTemperature": 40.661277770996094,
        //         "InputVolume": 5.130000114440918,
        //         "OutputVolume": 4.925000190734863,
        //         "DeltaVolume": 0.2049999237060547,
        //         "InputMass": 4.95755672454834,
        //         "OutputMass": 4.871492862701416,
        //         "DeltaMass": 0.08606386184692383,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 0.845226526260376,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-16T12:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 88.66564178466797,
        //         "OutputTemperature": 47.239620208740234,
        //         "DeltaTemperature": 41.426021575927734,
        //         "InputVolume": 5.199999809265137,
        //         "OutputVolume": 5,
        //         "DeltaVolume": 0.19999980926513672,
        //         "InputMass": 5.02590799331665,
        //         "OutputMass": 4.94891881942749,
        //         "DeltaMass": 0.07698917388916016,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 0.8729488849639893,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-16T13:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 88.01219940185547,
        //         "OutputTemperature": 47.42431640625,
        //         "DeltaTemperature": 40.58788299560547,
        //         "InputVolume": 5.25,
        //         "OutputVolume": 5.045000076293945,
        //         "DeltaVolume": 0.2049999237060547,
        //         "InputMass": 5.077193737030029,
        //         "OutputMass": 4.992556095123291,
        //         "DeltaMass": 0.08463764190673828,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 0.864008903503418,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-16T14:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 87.10874938964844,
        //         "OutputTemperature": 47.26372146606445,
        //         "DeltaTemperature": 39.845027923583984,
        //         "InputVolume": 5.795000076293945,
        //         "OutputVolume": 5.574999809265137,
        //         "DeltaVolume": 0.2200002670288086,
        //         "InputMass": 5.607090473175049,
        //         "OutputMass": 5.5171284675598145,
        //         "DeltaMass": 0.08996200561523438,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 0.9366716742515564,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-16T15:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 88.44538879394531,
        //         "OutputTemperature": 48.41118621826172,
        //         "DeltaTemperature": 40.034202575683594,
        //         "InputVolume": 6.335000038146973,
        //         "OutputVolume": 6.09499979019165,
        //         "DeltaVolume": 0.24000024795532227,
        //         "InputMass": 6.122954845428467,
        //         "OutputMass": 6.029145240783691,
        //         "DeltaMass": 0.09380960464477539,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.0278220176696777,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-16T16:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 89.48057556152344,
        //         "OutputTemperature": 50.05726623535156,
        //         "DeltaTemperature": 39.423309326171875,
        //         "InputVolume": 6.525000095367432,
        //         "OutputVolume": 6.264999866485596,
        //         "DeltaVolume": 0.26000022888183594,
        //         "InputMass": 6.303942680358887,
        //         "OutputMass": 6.191572189331055,
        //         "DeltaMass": 0.11237049102783203,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.0421890020370483,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-16T17:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 89.92792510986328,
        //         "OutputTemperature": 50.22380065917969,
        //         "DeltaTemperature": 39.704124450683594,
        //         "InputVolume": 6.304999828338623,
        //         "OutputVolume": 6.045000076293945,
        //         "DeltaVolume": 0.25999975204467773,
        //         "InputMass": 6.0891499519348145,
        //         "OutputMass": 5.974557399749756,
        //         "DeltaMass": 0.1145925521850586,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.0138577222824097,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-16T18:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 89.8812026977539,
        //         "OutputTemperature": 50.1109733581543,
        //         "DeltaTemperature": 39.77022933959961,
        //         "InputVolume": 6.309999942779541,
        //         "OutputVolume": 6.059999942779541,
        //         "DeltaVolume": 0.25,
        //         "InputMass": 6.093418121337891,
        //         "OutputMass": 5.9900593757629395,
        //         "DeltaMass": 0.10335874557495117,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.0162473917007446,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-16T19:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 89.8317642211914,
        //         "OutputTemperature": 50.59932327270508,
        //         "DeltaTemperature": 39.23244094848633,
        //         "InputVolume": 6.78000020980835,
        //         "OutputVolume": 6.510000228881836,
        //         "DeltaVolume": 0.26999998092651367,
        //         "InputMass": 6.5478410720825195,
        //         "OutputMass": 6.4316205978393555,
        //         "DeltaMass": 0.11622047424316406,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.0772877931594849,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-16T20:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 89.22098541259766,
        //         "OutputTemperature": 50.83445358276367,
        //         "DeltaTemperature": 38.386531829833984,
        //         "InputVolume": 6.364999771118164,
        //         "OutputVolume": 6.110000133514404,
        //         "DeltaVolume": 0.25499963760375977,
        //         "InputMass": 6.149681091308594,
        //         "OutputMass": 6.03584623336792,
        //         "DeltaMass": 0.11383485794067383,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 0.9899516701698303,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-16T21:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 89.56887817382812,
        //         "OutputTemperature": 50.581233978271484,
        //         "DeltaTemperature": 38.98764419555664,
        //         "InputVolume": 6.619999885559082,
        //         "OutputVolume": 6.364999771118164,
        //         "DeltaVolume": 0.25500011444091797,
        //         "InputMass": 6.394993305206299,
        //         "OutputMass": 6.290072441101074,
        //         "DeltaMass": 0.10492086410522461,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.0455836057662964,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-16T22:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 91.6659164428711,
        //         "OutputTemperature": 50.815887451171875,
        //         "DeltaTemperature": 40.85002899169922,
        //         "InputVolume": 6.190000057220459,
        //         "OutputVolume": 5.945000171661377,
        //         "DeltaVolume": 0.24499988555908203,
        //         "InputMass": 5.9707136154174805,
        //         "OutputMass": 5.872672080993652,
        //         "DeltaMass": 0.09804153442382812,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.0229343175888062,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-16T23:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 96.18917846679688,
        //         "OutputTemperature": 50.97892761230469,
        //         "DeltaTemperature": 45.21025085449219,
        //         "InputVolume": 5.880000114440918,
        //         "OutputVolume": 5.635000228881836,
        //         "DeltaVolume": 0.24499988555908203,
        //         "InputMass": 5.653107643127441,
        //         "OutputMass": 5.567200183868408,
        //         "DeltaMass": 0.0859074592590332,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.0721428394317627,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-17T00:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 96.91938781738281,
        //         "OutputTemperature": 50.834957122802734,
        //         "DeltaTemperature": 46.08443069458008,
        //         "InputVolume": 5.610000133514404,
        //         "OutputVolume": 5.375,
        //         "DeltaVolume": 0.2350001335144043,
        //         "InputMass": 5.3903021812438965,
        //         "OutputMass": 5.310647010803223,
        //         "DeltaMass": 0.07965517044067383,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.0421028137207031,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-17T01:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 96.67467498779297,
        //         "OutputTemperature": 51.58429718017578,
        //         "DeltaTemperature": 45.09037780761719,
        //         "InputVolume": 6.164999961853027,
        //         "OutputVolume": 5.914999961853027,
        //         "DeltaVolume": 0.25,
        //         "InputMass": 5.925783157348633,
        //         "OutputMass": 5.842909336090088,
        //         "DeltaMass": 0.08287382125854492,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.120924472808838,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-17T02:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 97.00696563720703,
        //         "OutputTemperature": 52.064666748046875,
        //         "DeltaTemperature": 44.942298889160156,
        //         "InputVolume": 6.059999942779541,
        //         "OutputVolume": 5.809999942779541,
        //         "DeltaVolume": 0.25,
        //         "InputMass": 5.823362350463867,
        //         "OutputMass": 5.737203121185303,
        //         "DeltaMass": 0.08615922927856445,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.0979959964752197,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-17T03:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 97.4520492553711,
        //         "OutputTemperature": 52.549129486083984,
        //         "DeltaTemperature": 44.90291976928711,
        //         "InputVolume": 6.545000076293945,
        //         "OutputVolume": 6.275000095367432,
        //         "DeltaVolume": 0.26999998092651367,
        //         "InputMass": 6.286840438842773,
        //         "OutputMass": 6.195119857788086,
        //         "DeltaMass": 0.0917205810546875,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.1843993663787842,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-17T04:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 100.3369369506836,
        //         "OutputTemperature": 53.064605712890625,
        //         "DeltaTemperature": 47.27233123779297,
        //         "InputVolume": 5.934999942779541,
        //         "OutputVolume": 5.684999942779541,
        //         "DeltaVolume": 0.25,
        //         "InputMass": 5.68832540512085,
        //         "OutputMass": 5.610309600830078,
        //         "DeltaMass": 0.07801580429077148,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.128399133682251,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-17T05:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 102.66075134277344,
        //         "OutputTemperature": 52.9844970703125,
        //         "DeltaTemperature": 49.67625427246094,
        //         "InputVolume": 6.010000228881836,
        //         "OutputVolume": 5.744999885559082,
        //         "DeltaVolume": 0.2650003433227539,
        //         "InputMass": 5.75105619430542,
        //         "OutputMass": 5.670032978057861,
        //         "DeltaMass": 0.0810232162475586,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.1990399360656738,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-17T06:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 101.44599914550781,
        //         "OutputTemperature": 54.010257720947266,
        //         "DeltaTemperature": 47.43574142456055,
        //         "InputVolume": 6.284999847412109,
        //         "OutputVolume": 6.014999866485596,
        //         "DeltaVolume": 0.26999998092651367,
        //         "InputMass": 6.018758296966553,
        //         "OutputMass": 5.932897090911865,
        //         "DeltaMass": 0.0858612060546875,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.1982296705245972,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-17T07:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 102.25969696044922,
        //         "OutputTemperature": 54.01249313354492,
        //         "DeltaTemperature": 48.2472038269043,
        //         "InputVolume": 6.519999980926514,
        //         "OutputVolume": 6.235000133514404,
        //         "DeltaVolume": 0.2849998474121094,
        //         "InputMass": 6.240359306335449,
        //         "OutputMass": 6.151885032653809,
        //         "DeltaMass": 0.08847427368164062,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.2636651992797852,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-17T08:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 103.01541137695312,
        //         "OutputTemperature": 55.1721076965332,
        //         "DeltaTemperature": 47.84330368041992,
        //         "InputVolume": 6.715000152587891,
        //         "OutputVolume": 6.414999961853027,
        //         "DeltaVolume": 0.3000001907348633,
        //         "InputMass": 6.423968315124512,
        //         "OutputMass": 6.325492858886719,
        //         "DeltaMass": 0.09847545623779297,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.2900831699371338,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-17T09:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 102.78352355957031,
        //         "OutputTemperature": 54.73075485229492,
        //         "DeltaTemperature": 48.05276870727539,
        //         "InputVolume": 6.570000171661377,
        //         "OutputVolume": 6.284999847412109,
        //         "DeltaVolume": 0.2850003242492676,
        //         "InputMass": 6.286492824554443,
        //         "OutputMass": 6.197770595550537,
        //         "DeltaMass": 0.08872222900390625,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.267966866493225,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-17T10:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 102.29926300048828,
        //         "OutputTemperature": 55.497276306152344,
        //         "DeltaTemperature": 46.80198669433594,
        //         "InputVolume": 6.559999942779541,
        //         "OutputVolume": 6.260000228881836,
        //         "DeltaVolume": 0.2999997138977051,
        //         "InputMass": 6.277795791625977,
        //         "OutputMass": 6.17163610458374,
        //         "DeltaMass": 0.10615968704223633,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.2332741022109985,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-17T11:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 102.50985717773438,
        //         "OutputTemperature": 54.65810775756836,
        //         "DeltaTemperature": 47.851749420166016,
        //         "InputVolume": 6.755000114440918,
        //         "OutputVolume": 6.460000038146973,
        //         "DeltaVolume": 0.2950000762939453,
        //         "InputMass": 6.463462829589844,
        //         "OutputMass": 6.370628356933594,
        //         "DeltaMass": 0.09283447265625,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.2981600761413574,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-17T12:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 102.03244018554688,
        //         "OutputTemperature": 55.41078567504883,
        //         "DeltaTemperature": 46.62165451049805,
        //         "InputVolume": 6.440000057220459,
        //         "OutputVolume": 6.139999866485596,
        //         "DeltaVolume": 0.3000001907348633,
        //         "InputMass": 6.1659746170043945,
        //         "OutputMass": 6.0530104637146,
        //         "DeltaMass": 0.11296415328979492,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.206586480140686,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-17T13:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 102.29058837890625,
        //         "OutputTemperature": 54.30332946777344,
        //         "DeltaTemperature": 47.98725891113281,
        //         "InputVolume": 6.75,
        //         "OutputVolume": 6.449999809265137,
        //         "DeltaVolume": 0.3000001907348633,
        //         "InputMass": 6.460659980773926,
        //         "OutputMass": 6.361482620239258,
        //         "DeltaMass": 0.09917736053466797,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.3012566566467285,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-17T14:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 102.2925796508789,
        //         "OutputTemperature": 55.49897003173828,
        //         "DeltaTemperature": 46.793609619140625,
        //         "InputVolume": 6.755000114440918,
        //         "OutputVolume": 6.454999923706055,
        //         "DeltaVolume": 0.3000001907348633,
        //         "InputMass": 6.465115070343018,
        //         "OutputMass": 6.363500595092773,
        //         "DeltaMass": 0.10161447525024414,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.2698314189910889,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-17T15:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 102.77323150634766,
        //         "OutputTemperature": 55.716190338134766,
        //         "DeltaTemperature": 47.05704116821289,
        //         "InputVolume": 7.335000038146973,
        //         "OutputVolume": 7.005000114440918,
        //         "DeltaVolume": 0.3299999237060547,
        //         "InputMass": 7.018737316131592,
        //         "OutputMass": 6.906068801879883,
        //         "DeltaMass": 0.11266851425170898,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.3863918781280518,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-17T16:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 102.5574951171875,
        //         "OutputTemperature": 56.51591491699219,
        //         "DeltaTemperature": 46.04158020019531,
        //         "InputVolume": 7.320000171661377,
        //         "OutputVolume": 6.989999771118164,
        //         "DeltaVolume": 0.3300004005432129,
        //         "InputMass": 7.005484580993652,
        //         "OutputMass": 6.889212608337402,
        //         "DeltaMass": 0.11627197265625,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.3539680242538452,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-17T17:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 101.72177124023438,
        //         "OutputTemperature": 57.27712631225586,
        //         "DeltaTemperature": 44.444644927978516,
        //         "InputVolume": 8.194999694824219,
        //         "OutputVolume": 7.820000171661377,
        //         "DeltaVolume": 0.3749995231628418,
        //         "InputMass": 7.846327781677246,
        //         "OutputMass": 7.701343059539795,
        //         "DeltaMass": 0.14498472213745117,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.4638351202011108,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-17T18:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 101.68104553222656,
        //         "OutputTemperature": 58.36810302734375,
        //         "DeltaTemperature": 43.31294250488281,
        //         "InputVolume": 8.279999732971191,
        //         "OutputVolume": 7.909999847412109,
        //         "DeltaVolume": 0.36999988555908203,
        //         "InputMass": 7.9286088943481445,
        //         "OutputMass": 7.783374786376953,
        //         "DeltaMass": 0.1452341079711914,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.4416176080703735,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-17T19:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 103.02340698242188,
        //         "OutputTemperature": 58.35865783691406,
        //         "DeltaTemperature": 44.66474914550781,
        //         "InputVolume": 7.974999904632568,
        //         "OutputVolume": 7.610000133514404,
        //         "DeltaVolume": 0.36499977111816406,
        //         "InputMass": 7.628969192504883,
        //         "OutputMass": 7.491271018981934,
        //         "DeltaMass": 0.13769817352294922,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.4305497407913208,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-17T20:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 100.7694091796875,
        //         "OutputTemperature": 58.228599548339844,
        //         "DeltaTemperature": 42.540809631347656,
        //         "InputVolume": 8.4399995803833,
        //         "OutputVolume": 8.0600004196167,
        //         "DeltaVolume": 0.37999916076660156,
        //         "InputMass": 8.086991310119629,
        //         "OutputMass": 7.932581424713135,
        //         "DeltaMass": 0.15440988540649414,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.4441063404083252,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-17T21:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 102.01226043701172,
        //         "OutputTemperature": 59.07412338256836,
        //         "DeltaTemperature": 42.93813705444336,
        //         "InputVolume": 8.880000114440918,
        //         "OutputVolume": 8.479999542236328,
        //         "DeltaVolume": 0.40000057220458984,
        //         "InputMass": 8.501591682434082,
        //         "OutputMass": 8.344191551208496,
        //         "DeltaMass": 0.15740013122558594,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.5325030088424683,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-17T22:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 109.02513885498047,
        //         "OutputTemperature": 59.55604553222656,
        //         "DeltaTemperature": 49.469093322753906,
        //         "InputVolume": 7.420000076293945,
        //         "OutputVolume": 7.059999942779541,
        //         "DeltaVolume": 0.3600001335144043,
        //         "InputMass": 7.064910411834717,
        //         "OutputMass": 6.9449543952941895,
        //         "DeltaMass": 0.11995601654052734,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.4680356979370117,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-17T23:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 110.40293884277344,
        //         "OutputTemperature": 59.116458892822266,
        //         "DeltaTemperature": 51.28647994995117,
        //         "InputVolume": 7.34499979019165,
        //         "OutputVolume": 6.994999885559082,
        //         "DeltaVolume": 0.34999990463256836,
        //         "InputMass": 6.986874103546143,
        //         "OutputMass": 6.881682395935059,
        //         "DeltaMass": 0.10519170761108398,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.5052825212478638,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-18T00:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 111.4213638305664,
        //         "OutputTemperature": 60.288326263427734,
        //         "DeltaTemperature": 51.13303756713867,
        //         "InputVolume": 7.565000057220459,
        //         "OutputVolume": 7.204999923706055,
        //         "DeltaVolume": 0.3600001335144043,
        //         "InputMass": 7.189911842346191,
        //         "OutputMass": 7.084563732147217,
        //         "DeltaMass": 0.10534811019897461,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.5446544885635376,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-18T01:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 110.85652160644531,
        //         "OutputTemperature": 60.74272537231445,
        //         "DeltaTemperature": 50.11379623413086,
        //         "InputVolume": 7.75,
        //         "OutputVolume": 7.385000228881836,
        //         "DeltaVolume": 0.36499977111816406,
        //         "InputMass": 7.369533538818359,
        //         "OutputMass": 7.260032653808594,
        //         "DeltaMass": 0.10950088500976562,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.5516606569290161,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-18T02:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 109.53763580322266,
        //         "OutputTemperature": 60.58972930908203,
        //         "DeltaTemperature": 48.947906494140625,
        //         "InputVolume": 8.114999771118164,
        //         "OutputVolume": 7.730000019073486,
        //         "DeltaVolume": 0.38499975204467773,
        //         "InputMass": 7.7227783203125,
        //         "OutputMass": 7.599194526672363,
        //         "DeltaMass": 0.12358379364013672,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.5879946947097778,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-18T03:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 111.53459167480469,
        //         "OutputTemperature": 61.43179702758789,
        //         "DeltaTemperature": 50.1027946472168,
        //         "InputVolume": 7.809999942779541,
        //         "OutputVolume": 7.434999942779541,
        //         "DeltaVolume": 0.375,
        //         "InputMass": 7.422333717346191,
        //         "OutputMass": 7.305572032928467,
        //         "DeltaMass": 0.11676168441772461,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.5625735521316528,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-18T04:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 111.51651763916016,
        //         "OutputTemperature": 61.1245002746582,
        //         "DeltaTemperature": 50.39201736450195,
        //         "InputVolume": 7.965000152587891,
        //         "OutputVolume": 7.579999923706055,
        //         "DeltaVolume": 0.38500022888183594,
        //         "InputMass": 7.568761825561523,
        //         "OutputMass": 7.450393199920654,
        //         "DeltaMass": 0.11836862564086914,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.602606177330017,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-18T05:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 111.9955825805664,
        //         "OutputTemperature": 61.941246032714844,
        //         "DeltaTemperature": 50.05433654785156,
        //         "InputVolume": 8.475000381469727,
        //         "OutputVolume": 8.069999694824219,
        //         "DeltaVolume": 0.4050006866455078,
        //         "InputMass": 8.049684524536133,
        //         "OutputMass": 7.927025318145752,
        //         "DeltaMass": 0.12265920639038086,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.6931686401367188,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-18T06:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 112.4969482421875,
        //         "OutputTemperature": 62.52223587036133,
        //         "DeltaTemperature": 49.97471237182617,
        //         "InputVolume": 8.024999618530273,
        //         "OutputVolume": 7.630000114440918,
        //         "DeltaVolume": 0.39499950408935547,
        //         "InputMass": 7.619202136993408,
        //         "OutputMass": 7.494878768920898,
        //         "DeltaMass": 0.12432336807250977,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.6002057790756226,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-18T07:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 113.2405776977539,
        //         "OutputTemperature": 62.21110153198242,
        //         "DeltaTemperature": 51.029476165771484,
        //         "InputVolume": 8.270000457763672,
        //         "OutputVolume": 7.860000133514404,
        //         "DeltaVolume": 0.4100003242492676,
        //         "InputMass": 7.8478922843933105,
        //         "OutputMass": 7.720688819885254,
        //         "DeltaMass": 0.12720346450805664,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.6831049919128418,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-18T08:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 113.01853942871094,
        //         "OutputTemperature": 62.557106018066406,
        //         "DeltaTemperature": 50.46143341064453,
        //         "InputVolume": 8.039999961853027,
        //         "OutputVolume": 7.644999980926514,
        //         "DeltaVolume": 0.39499998092651367,
        //         "InputMass": 7.630432605743408,
        //         "OutputMass": 7.507644176483154,
        //         "DeltaMass": 0.1227884292602539,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.618250846862793,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-18T09:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 111.97399139404297,
        //         "OutputTemperature": 61.609901428222656,
        //         "DeltaTemperature": 50.36408996582031,
        //         "InputVolume": 7.954999923706055,
        //         "OutputVolume": 7.559999942779541,
        //         "DeltaVolume": 0.39499998092651367,
        //         "InputMass": 7.557313919067383,
        //         "OutputMass": 7.428731441497803,
        //         "DeltaMass": 0.12858247756958008,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.5993995666503906,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-18T10:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 111.96597290039062,
        //         "OutputTemperature": 61.39407730102539,
        //         "DeltaTemperature": 50.571895599365234,
        //         "InputVolume": 7.744999885559082,
        //         "OutputVolume": 7.360000133514404,
        //         "DeltaVolume": 0.38499975204467773,
        //         "InputMass": 7.356852054595947,
        //         "OutputMass": 7.2325286865234375,
        //         "DeltaMass": 0.12432336807250977,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.5633784532546997,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-18T11:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 111.08809661865234,
        //         "OutputTemperature": 60.2231559753418,
        //         "DeltaTemperature": 50.86494064331055,
        //         "InputVolume": 7.235000133514404,
        //         "OutputVolume": 6.875,
        //         "DeltaVolume": 0.3600001335144043,
        //         "InputMass": 6.877920627593994,
        //         "OutputMass": 6.761449337005615,
        //         "DeltaMass": 0.1164712905883789,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.4698351621627808,
        //         "TimeWork": 1
        //     }
        // },
        {
            "Timestamp": "2021-01-18T12:00:00+03:00",
            "Values": {
                "InputTemperature": 110.69325256347656,
                "OutputTemperature": 59.53517150878906,
                "DeltaTemperature": 51.1580810546875,
                "InputVolume": 7.434999942779541,
                "OutputVolume": 7.070000171661377,
                "DeltaVolume": 0.36499977111816406,
                "InputMass": 7.070228576660156,
                "OutputMass": 6.955679416656494,
                "DeltaMass": 0.11454916000366211,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.5195387601852417,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-18T13:00:00+03:00",
            "Values": {
                "InputTemperature": 111.15055084228516,
                "OutputTemperature": 59.23396682739258,
                "DeltaTemperature": 51.91658401489258,
                "InputVolume": 7.539999961853027,
                "OutputVolume": 7.175000190734863,
                "DeltaVolume": 0.36499977111816406,
                "InputMass": 7.167891979217529,
                "OutputMass": 7.058820724487305,
                "DeltaMass": 0.10907125473022461,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.563389778137207,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-18T14:00:00+03:00",
            "Values": {
                "InputTemperature": 110.80947875976562,
                "OutputTemperature": 60.11214065551758,
                "DeltaTemperature": 50.69733810424805,
                "InputVolume": 7.574999809265137,
                "OutputVolume": 7.204999923706055,
                "DeltaVolume": 0.36999988555908203,
                "InputMass": 7.201974868774414,
                "OutputMass": 7.085307598114014,
                "DeltaMass": 0.11666727066040039,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.5339651107788086,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-18T15:00:00+03:00",
            "Values": {
                "InputTemperature": 110.9279556274414,
                "OutputTemperature": 60.66444778442383,
                "DeltaTemperature": 50.26350784301758,
                "InputVolume": 8.109999656677246,
                "OutputVolume": 7.710000038146973,
                "DeltaVolume": 0.39999961853027344,
                "InputMass": 7.70945405960083,
                "OutputMass": 7.581693649291992,
                "DeltaMass": 0.1277604103088379,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.6280792951583862,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-18T16:00:00+03:00",
            "Values": {
                "InputTemperature": 112.46385192871094,
                "OutputTemperature": 61.845706939697266,
                "DeltaTemperature": 50.61814498901367,
                "InputVolume": 7.71999979019165,
                "OutputVolume": 7.335000038146973,
                "DeltaVolume": 0.38499975204467773,
                "InputMass": 7.329812049865723,
                "OutputMass": 7.206180572509766,
                "DeltaMass": 0.12363147735595703,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.5591580867767334,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-18T17:00:00+03:00",
            "Values": {
                "InputTemperature": 112.52507781982422,
                "OutputTemperature": 60.57075881958008,
                "DeltaTemperature": 51.95431900024414,
                "InputVolume": 7.815000057220459,
                "OutputVolume": 7.425000190734863,
                "DeltaVolume": 0.3899998664855957,
                "InputMass": 7.419875144958496,
                "OutputMass": 7.29973840713501,
                "DeltaMass": 0.12013673782348633,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.619843602180481,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-18T18:00:00+03:00",
            "Values": {
                "InputTemperature": 113.01997375488281,
                "OutputTemperature": 61.05167007446289,
                "DeltaTemperature": 51.96830368041992,
                "InputVolume": 7.764999866485596,
                "OutputVolume": 7.375,
                "DeltaVolume": 0.3899998664855957,
                "InputMass": 7.3698410987854,
                "OutputMass": 7.249006748199463,
                "DeltaMass": 0.1208343505859375,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.6095163822174072,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-18T19:00:00+03:00",
            "Values": {
                "InputTemperature": 113.44750213623047,
                "OutputTemperature": 62.08211898803711,
                "DeltaTemperature": 51.36538314819336,
                "InputVolume": 7.829999923706055,
                "OutputVolume": 7.420000076293945,
                "DeltaVolume": 0.4099998474121094,
                "InputMass": 7.429327964782715,
                "OutputMass": 7.288759708404541,
                "DeltaMass": 0.14056825637817383,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.6038455963134766,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-18T20:00:00+03:00",
            "Values": {
                "InputTemperature": 112.94869232177734,
                "OutputTemperature": 61.56311798095703,
                "DeltaTemperature": 51.38557434082031,
                "InputVolume": 8.21500015258789,
                "OutputVolume": 7.804999828338623,
                "DeltaVolume": 0.4100003242492676,
                "InputMass": 7.797533988952637,
                "OutputMass": 7.668270111083984,
                "DeltaMass": 0.12926387786865234,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.6838347911834717,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-18T21:00:00+03:00",
            "Values": {
                "InputTemperature": 113.56623077392578,
                "OutputTemperature": 62.09904098510742,
                "DeltaTemperature": 51.46718978881836,
                "InputVolume": 7.755000114440918,
                "OutputVolume": 7.360000133514404,
                "DeltaVolume": 0.39499998092651367,
                "InputMass": 7.357340335845947,
                "OutputMass": 7.229063034057617,
                "DeltaMass": 0.12827730178833008,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.5914784669876099,
                "TimeWork": 1
            }
        },
        // {
        //     "Timestamp": "2021-01-18T22:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 113.34115600585938,
        //         "OutputTemperature": 61.6934928894043,
        //         "DeltaTemperature": 51.64766311645508,
        //         "InputVolume": 7.980000019073486,
        //         "OutputVolume": 7.579999923706055,
        //         "DeltaVolume": 0.40000009536743164,
        //         "InputMass": 7.572693824768066,
        //         "OutputMass": 7.448217391967773,
        //         "DeltaMass": 0.12447643280029297,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.6437194347381592,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-18T23:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 114.43058776855469,
        //         "OutputTemperature": 62.78396224975586,
        //         "DeltaTemperature": 51.64662551879883,
        //         "InputVolume": 8.395000457763672,
        //         "OutputVolume": 7.980000019073486,
        //         "DeltaVolume": 0.41500043869018555,
        //         "InputMass": 7.958820819854736,
        //         "OutputMass": 7.837329864501953,
        //         "DeltaMass": 0.1214909553527832,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.7278048992156982,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-19T00:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 113.83826446533203,
        //         "OutputTemperature": 63.21251678466797,
        //         "DeltaTemperature": 50.62574768066406,
        //         "InputVolume": 7.954999923706055,
        //         "OutputVolume": 7.554999828338623,
        //         "DeltaVolume": 0.40000009536743164,
        //         "InputMass": 7.544954776763916,
        //         "OutputMass": 7.4167070388793945,
        //         "DeltaMass": 0.12824773788452148,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.605527639389038,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-19T01:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 113.61767578125,
        //         "OutputTemperature": 62.11501693725586,
        //         "DeltaTemperature": 51.50265884399414,
        //         "InputVolume": 8.0600004196167,
        //         "OutputVolume": 7.664999961853027,
        //         "DeltaVolume": 0.3950004577636719,
        //         "InputMass": 7.645483493804932,
        //         "OutputMass": 7.529540061950684,
        //         "DeltaMass": 0.11594343185424805,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.6549346446990967,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-19T02:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 113.65560150146484,
        //         "OutputTemperature": 62.74740219116211,
        //         "DeltaTemperature": 50.908199310302734,
        //         "InputVolume": 7.824999809265137,
        //         "OutputVolume": 7.434999942779541,
        //         "DeltaVolume": 0.3899998664855957,
        //         "InputMass": 7.4232401847839355,
        //         "OutputMass": 7.300487995147705,
        //         "DeltaMass": 0.12275218963623047,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.588362455368042,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-19T03:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 114.35093688964844,
        //         "OutputTemperature": 62.45874786376953,
        //         "DeltaTemperature": 51.892189025878906,
        //         "InputVolume": 7.954999923706055,
        //         "OutputVolume": 7.559999942779541,
        //         "DeltaVolume": 0.39499998092651367,
        //         "InputMass": 7.542335510253906,
        //         "OutputMass": 7.424838542938232,
        //         "DeltaMass": 0.11749696731567383,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.6451194286346436,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-19T04:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 113.7716293334961,
        //         "OutputTemperature": 61.976871490478516,
        //         "DeltaTemperature": 51.79475784301758,
        //         "InputVolume": 7.59499979019165,
        //         "OutputVolume": 7.215000152587891,
        //         "DeltaVolume": 0.37999963760375977,
        //         "InputMass": 7.20330286026001,
        //         "OutputMass": 7.088819980621338,
        //         "DeltaMass": 0.11448287963867188,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.5681052207946777,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-19T05:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 112.06059265136719,
        //         "OutputTemperature": 61.54628372192383,
        //         "DeltaTemperature": 50.51430892944336,
        //         "InputVolume": 7.664999961853027,
        //         "OutputVolume": 7.284999847412109,
        //         "DeltaVolume": 0.38000011444091797,
        //         "InputMass": 7.280808448791504,
        //         "OutputMass": 7.157594203948975,
        //         "DeltaMass": 0.1232142448425293,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.5454750061035156,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-19T06:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 112.22871398925781,
        //         "OutputTemperature": 60.94282150268555,
        //         "DeltaTemperature": 51.285892486572266,
        //         "InputVolume": 7.53000020980835,
        //         "OutputVolume": 7.159999847412109,
        //         "DeltaVolume": 0.37000036239624023,
        //         "InputMass": 7.150218486785889,
        //         "OutputMass": 7.038207054138184,
        //         "DeltaMass": 0.11201143264770508,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.5408929586410522,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-19T07:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 112.43646240234375,
        //         "OutputTemperature": 60.81036376953125,
        //         "DeltaTemperature": 51.6260986328125,
        //         "InputVolume": 7.534999847412109,
        //         "OutputVolume": 7.15500020980835,
        //         "DeltaVolume": 0.37999963760375977,
        //         "InputMass": 7.15574312210083,
        //         "OutputMass": 7.032922267913818,
        //         "DeltaMass": 0.12282085418701172,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.5523452758789062,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-19T08:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 112.18305206298828,
        //         "OutputTemperature": 60.59199905395508,
        //         "DeltaTemperature": 51.5910530090332,
        //         "InputVolume": 7.275000095367432,
        //         "OutputVolume": 6.914999961853027,
        //         "DeltaVolume": 0.3600001335144043,
        //         "InputMass": 6.908604621887207,
        //         "OutputMass": 6.797780990600586,
        //         "DeltaMass": 0.1108236312866211,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.4976667165756226,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-19T09:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 111.84700012207031,
        //         "OutputTemperature": 59.826229095458984,
        //         "DeltaTemperature": 52.02077102661133,
        //         "InputVolume": 7.375,
        //         "OutputVolume": 7.010000228881836,
        //         "DeltaVolume": 0.36499977111816406,
        //         "InputMass": 7.006156921386719,
        //         "OutputMass": 6.8949432373046875,
        //         "DeltaMass": 0.11121368408203125,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.5313385725021362,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-19T10:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 111.45263671875,
        //         "OutputTemperature": 59.25680923461914,
        //         "DeltaTemperature": 52.19582748413086,
        //         "InputVolume": 6.639999866485596,
        //         "OutputVolume": 6.309999942779541,
        //         "DeltaVolume": 0.3299999237060547,
        //         "InputMass": 6.310774803161621,
        //         "OutputMass": 6.207500457763672,
        //         "DeltaMass": 0.10327434539794922,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.3838744163513184,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-19T11:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 111.21634674072266,
        //         "OutputTemperature": 58.35811996459961,
        //         "DeltaTemperature": 52.85822677612305,
        //         "InputVolume": 6.855000019073486,
        //         "OutputVolume": 6.514999866485596,
        //         "DeltaVolume": 0.3400001525878906,
        //         "InputMass": 6.516343116760254,
        //         "OutputMass": 6.4117655754089355,
        //         "DeltaMass": 0.10457754135131836,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.4469795227050781,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-19T12:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 111.82345581054688,
        //         "OutputTemperature": 57.80794906616211,
        //         "DeltaTemperature": 54.015506744384766,
        //         "InputVolume": 6.480000019073486,
        //         "OutputVolume": 6.150000095367432,
        //         "DeltaVolume": 0.3299999237060547,
        //         "InputMass": 6.156364440917969,
        //         "OutputMass": 6.0554118156433105,
        //         "DeltaMass": 0.1009526252746582,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.3970190286636353,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-19T13:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 112.4623031616211,
        //         "OutputTemperature": 57.59233093261719,
        //         "DeltaTemperature": 54.869972229003906,
        //         "InputVolume": 6.099999904632568,
        //         "OutputVolume": 5.789999961853027,
        //         "DeltaVolume": 0.309999942779541,
        //         "InputMass": 5.791984558105469,
        //         "OutputMass": 5.701418399810791,
        //         "DeltaMass": 0.09056615829467773,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.3351835012435913,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-19T14:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 113.24846649169922,
        //         "OutputTemperature": 57.038082122802734,
        //         "DeltaTemperature": 56.210384368896484,
        //         "InputVolume": 6.204999923706055,
        //         "OutputVolume": 5.894999980926514,
        //         "DeltaVolume": 0.309999942779541,
        //         "InputMass": 5.887247085571289,
        //         "OutputMass": 5.806903839111328,
        //         "DeltaMass": 0.08034324645996094,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.3903584480285645,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-19T15:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 113.10456848144531,
        //         "OutputTemperature": 57.4398078918457,
        //         "DeltaTemperature": 55.66476058959961,
        //         "InputVolume": 6.480000019073486,
        //         "OutputVolume": 6.15500020980835,
        //         "DeltaVolume": 0.3249998092651367,
        //         "InputMass": 6.149433612823486,
        //         "OutputMass": 6.061061382293701,
        //         "DeltaMass": 0.08837223052978516,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.4381821155548096,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-19T16:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 112.71694946289062,
        //         "OutputTemperature": 57.71858215332031,
        //         "DeltaTemperature": 54.99836730957031,
        //         "InputVolume": 6.184999942779541,
        //         "OutputVolume": 5.869999885559082,
        //         "DeltaVolume": 0.315000057220459,
        //         "InputMass": 5.871862888336182,
        //         "OutputMass": 5.778458595275879,
        //         "DeltaMass": 0.09340429306030273,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.356806755065918,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-19T17:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 111.68468475341797,
        //         "OutputTemperature": 57.595550537109375,
        //         "DeltaTemperature": 54.089134216308594,
        //         "InputVolume": 6.465000152587891,
        //         "OutputVolume": 6.139999866485596,
        //         "DeltaVolume": 0.3250002861022949,
        //         "InputMass": 6.1422247886657715,
        //         "OutputMass": 6.044882774353027,
        //         "DeltaMass": 0.09734201431274414,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.395685076713562,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-19T18:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 111.21875,
        //         "OutputTemperature": 57.113739013671875,
        //         "DeltaTemperature": 54.105010986328125,
        //         "InputVolume": 6.420000076293945,
        //         "OutputVolume": 6.09499979019165,
        //         "DeltaVolume": 0.3250002861022949,
        //         "InputMass": 6.101992607116699,
        //         "OutputMass": 6.004185676574707,
        //         "DeltaMass": 0.09780693054199219,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.3868488073349,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-19T19:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 110.73937225341797,
        //         "OutputTemperature": 57.59487533569336,
        //         "DeltaTemperature": 53.14449691772461,
        //         "InputVolume": 6.369999885559082,
        //         "OutputVolume": 6.045000076293945,
        //         "DeltaVolume": 0.3249998092651367,
        //         "InputMass": 6.057061672210693,
        //         "OutputMass": 5.952517032623291,
        //         "DeltaMass": 0.10454463958740234,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.352166771888733,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-19T20:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 110.41278076171875,
        //         "OutputTemperature": 57.059539794921875,
        //         "DeltaTemperature": 53.353240966796875,
        //         "InputVolume": 6.764999866485596,
        //         "OutputVolume": 6.429999828338623,
        //         "DeltaVolume": 0.33500003814697266,
        //         "InputMass": 6.433823108673096,
        //         "OutputMass": 6.333098888397217,
        //         "DeltaMass": 0.1007242202758789,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.4418452978134155,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-19T21:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 110.20024871826172,
        //         "OutputTemperature": 57.76750946044922,
        //         "DeltaTemperature": 52.4327392578125,
        //         "InputVolume": 6.489999771118164,
        //         "OutputVolume": 6.164999961853027,
        //         "DeltaVolume": 0.3249998092651367,
        //         "InputMass": 6.174121856689453,
        //         "OutputMass": 6.070544719696045,
        //         "DeltaMass": 0.1035771369934082,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.359796166419983,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-19T22:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 110.5445327758789,
        //         "OutputTemperature": 57.4196662902832,
        //         "DeltaTemperature": 53.1248664855957,
        //         "InputVolume": 6.764999866485596,
        //         "OutputVolume": 6.434999942779541,
        //         "DeltaVolume": 0.3299999237060547,
        //         "InputMass": 6.433169841766357,
        //         "OutputMass": 6.336740016937256,
        //         "DeltaMass": 0.09642982482910156,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.4355645179748535,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-19T23:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 110.19234466552734,
        //         "OutputTemperature": 57.98495864868164,
        //         "DeltaTemperature": 52.2073860168457,
        //         "InputVolume": 6.420000076293945,
        //         "OutputVolume": 6.099999904632568,
        //         "DeltaVolume": 0.32000017166137695,
        //         "InputMass": 6.107219219207764,
        //         "OutputMass": 6.006542682647705,
        //         "DeltaMass": 0.1006765365600586,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.339298129081726,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-20T00:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 110.56724548339844,
        //         "OutputTemperature": 57.9743537902832,
        //         "DeltaTemperature": 52.592891693115234,
        //         "InputVolume": 6.965000152587891,
        //         "OutputVolume": 6.630000114440918,
        //         "DeltaVolume": 0.33500003814697266,
        //         "InputMass": 6.623984336853027,
        //         "OutputMass": 6.5284223556518555,
        //         "DeltaMass": 0.09556198120117188,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.4634071588516235,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-20T01:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 110.79583740234375,
        //         "OutputTemperature": 58.814964294433594,
        //         "DeltaTemperature": 51.980873107910156,
        //         "InputVolume": 7.425000190734863,
        //         "OutputVolume": 7.070000171661377,
        //         "DeltaVolume": 0.35500001907348633,
        //         "InputMass": 7.05961799621582,
        //         "OutputMass": 6.9571380615234375,
        //         "DeltaMass": 0.10247993469238281,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.541590690612793,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-20T02:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 110.82814025878906,
        //         "OutputTemperature": 60.07782745361328,
        //         "DeltaTemperature": 50.75031280517578,
        //         "InputVolume": 7.46999979019165,
        //         "OutputVolume": 7.110000133514404,
        //         "DeltaVolume": 0.3599996566772461,
        //         "InputMass": 7.101346969604492,
        //         "OutputMass": 6.992725372314453,
        //         "DeltaMass": 0.10862159729003906,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.5141403675079346,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-20T03:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 111.10240936279297,
        //         "OutputTemperature": 60.21660614013672,
        //         "DeltaTemperature": 50.88580322265625,
        //         "InputVolume": 7.739999771118164,
        //         "OutputVolume": 7.364999771118164,
        //         "DeltaVolume": 0.375,
        //         "InputMass": 7.357461452484131,
        //         "OutputMass": 7.243138790130615,
        //         "DeltaMass": 0.11432266235351562,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.5729619264602661,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-20T04:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 112.44084167480469,
        //         "OutputTemperature": 61.47884750366211,
        //         "DeltaTemperature": 50.96199417114258,
        //         "InputVolume": 8.0649995803833,
        //         "OutputVolume": 7.670000076293945,
        //         "DeltaVolume": 0.39499950408935547,
        //         "InputMass": 7.6578168869018555,
        //         "OutputMass": 7.537386417388916,
        //         "DeltaMass": 0.12043046951293945,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.639950156211853,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-20T05:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 112.34330749511719,
        //         "OutputTemperature": 61.55943298339844,
        //         "DeltaTemperature": 50.78387451171875,
        //         "InputVolume": 8.045000076293945,
        //         "OutputVolume": 7.650000095367432,
        //         "DeltaVolume": 0.39499998092651367,
        //         "InputMass": 7.640267372131348,
        //         "OutputMass": 7.515929222106934,
        //         "DeltaMass": 0.12433815002441406,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.6304900646209717,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-20T06:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 112.44142150878906,
        //         "OutputTemperature": 62.456424713134766,
        //         "DeltaTemperature": 49.9849967956543,
        //         "InputVolume": 8.359999656677246,
        //         "OutputVolume": 7.945000171661377,
        //         "DeltaVolume": 0.41499948501586914,
        //         "InputMass": 7.938383102416992,
        //         "OutputMass": 7.801435470581055,
        //         "DeltaMass": 0.1369476318359375,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.6675465106964111,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-20T07:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 112.23648834228516,
        //         "OutputTemperature": 62.396728515625,
        //         "DeltaTemperature": 49.839759826660156,
        //         "InputVolume": 8.335000038146973,
        //         "OutputVolume": 7.925000190734863,
        //         "DeltaVolume": 0.4099998474121094,
        //         "InputMass": 7.915103435516357,
        //         "OutputMass": 7.78424596786499,
        //         "DeltaMass": 0.1308574676513672,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.657798171043396,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-20T08:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 112.47932434082031,
        //         "OutputTemperature": 62.819766998291016,
        //         "DeltaTemperature": 49.6595573425293,
        //         "InputVolume": 8.399999618530273,
        //         "OutputVolume": 7.980000019073486,
        //         "DeltaVolume": 0.4199995994567871,
        //         "InputMass": 7.975961208343506,
        //         "OutputMass": 7.836097717285156,
        //         "DeltaMass": 0.1398634910583496,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.6645814180374146,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-20T09:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 112.87879943847656,
        //         "OutputTemperature": 62.136085510253906,
        //         "DeltaTemperature": 50.742713928222656,
        //         "InputVolume": 8.015000343322754,
        //         "OutputVolume": 7.614999771118164,
        //         "DeltaVolume": 0.40000057220458984,
        //         "InputMass": 7.607999801635742,
        //         "OutputMass": 7.480423450469971,
        //         "DeltaMass": 0.12757635116577148,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.6223974227905273,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-20T10:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 111.47212982177734,
        //         "OutputTemperature": 61.50764846801758,
        //         "DeltaTemperature": 49.964481353759766,
        //         "InputVolume": 7.849999904632568,
        //         "OutputVolume": 7.460000038146973,
        //         "DeltaVolume": 0.3899998664855957,
        //         "InputMass": 7.460266590118408,
        //         "OutputMass": 7.328489780426025,
        //         "DeltaMass": 0.1317768096923828,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.5662347078323364,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-20T11:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 111.35823059082031,
        //         "OutputTemperature": 61.06378936767578,
        //         "DeltaTemperature": 50.29444122314453,
        //         "InputVolume": 7.855000019073486,
        //         "OutputVolume": 7.465000152587891,
        //         "DeltaVolume": 0.3899998664855957,
        //         "InputMass": 7.465289115905762,
        //         "OutputMass": 7.336864471435547,
        //         "DeltaMass": 0.12842464447021484,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.5775892734527588,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-20T12:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 111.19855499267578,
        //         "OutputTemperature": 60.654869079589844,
        //         "DeltaTemperature": 50.54368591308594,
        //         "InputVolume": 7.630000114440918,
        //         "OutputVolume": 7.260000228881836,
        //         "DeltaVolume": 0.36999988555908203,
        //         "InputMass": 7.25205659866333,
        //         "OutputMass": 7.137469291687012,
        //         "DeltaMass": 0.11458730697631836,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.5400512218475342,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-20T13:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 111.29414367675781,
        //         "OutputTemperature": 60.70246505737305,
        //         "DeltaTemperature": 50.591678619384766,
        //         "InputVolume": 7.900000095367432,
        //         "OutputVolume": 7.510000228881836,
        //         "DeltaVolume": 0.3899998664855957,
        //         "InputMass": 7.508519649505615,
        //         "OutputMass": 7.38269567489624,
        //         "DeltaMass": 0.125823974609375,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.596069097518921,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-20T14:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 110.60020446777344,
        //         "OutputTemperature": 60.612422943115234,
        //         "DeltaTemperature": 49.9877815246582,
        //         "InputVolume": 7.800000190734863,
        //         "OutputVolume": 7.414999961853027,
        //         "DeltaVolume": 0.38500022888183594,
        //         "InputMass": 7.417671203613281,
        //         "OutputMass": 7.289305210113525,
        //         "DeltaMass": 0.12836599349975586,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.557812213897705,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-20T15:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 110.28719329833984,
        //         "OutputTemperature": 61.161014556884766,
        //         "DeltaTemperature": 49.12617874145508,
        //         "InputVolume": 8.34000015258789,
        //         "OutputVolume": 7.934999942779541,
        //         "DeltaVolume": 0.4050002098083496,
        //         "InputMass": 7.933447360992432,
        //         "OutputMass": 7.7976861000061035,
        //         "DeltaMass": 0.13576126098632812,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.6374356746673584,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-20T16:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 109.97870635986328,
        //         "OutputTemperature": 61.36180877685547,
        //         "DeltaTemperature": 48.61689758300781,
        //         "InputVolume": 8.274999618530273,
        //         "OutputVolume": 7.864999771118164,
        //         "DeltaVolume": 0.4099998474121094,
        //         "InputMass": 7.873044490814209,
        //         "OutputMass": 7.728318214416504,
        //         "DeltaMass": 0.14472627639770508,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.6081140041351318,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-20T17:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 110.02954864501953,
        //         "OutputTemperature": 61.39325714111328,
        //         "DeltaTemperature": 48.63629150390625,
        //         "InputVolume": 8.125,
        //         "OutputVolume": 7.71999979019165,
        //         "DeltaVolume": 0.4050002098083496,
        //         "InputMass": 7.730330944061279,
        //         "OutputMass": 7.588341236114502,
        //         "DeltaMass": 0.14198970794677734,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.5795824527740479,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-20T18:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 109.93365478515625,
        //         "OutputTemperature": 60.59349060058594,
        //         "DeltaTemperature": 49.34016418457031,
        //         "InputVolume": 7.755000114440918,
        //         "OutputVolume": 7.369999885559082,
        //         "DeltaVolume": 0.38500022888183594,
        //         "InputMass": 7.378464698791504,
        //         "OutputMass": 7.24501371383667,
        //         "DeltaMass": 0.13345098495483398,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.5294225215911865,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-20T19:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 109.83534240722656,
        //         "OutputTemperature": 60.32365417480469,
        //         "DeltaTemperature": 49.511688232421875,
        //         "InputVolume": 7.889999866485596,
        //         "OutputVolume": 7.5,
        //         "DeltaVolume": 0.3899998664855957,
        //         "InputMass": 7.507808685302734,
        //         "OutputMass": 7.373471736907959,
        //         "DeltaMass": 0.1343369483947754,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.5615955591201782,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-20T20:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 109.58846282958984,
        //         "OutputTemperature": 60.40730285644531,
        //         "DeltaTemperature": 49.18115997314453,
        //         "InputVolume": 7.735000133514404,
        //         "OutputVolume": 7.34499979019165,
        //         "DeltaVolume": 0.3900003433227539,
        //         "InputMass": 7.362295150756836,
        //         "OutputMass": 7.222712516784668,
        //         "DeltaMass": 0.13958263397216797,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.5211013555526733,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-20T21:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 109.46166229248047,
        //         "OutputTemperature": 59.969703674316406,
        //         "DeltaTemperature": 49.49195861816406,
        //         "InputVolume": 7.710000038146973,
        //         "OutputVolume": 7.324999809265137,
        //         "DeltaVolume": 0.38500022888183594,
        //         "InputMass": 7.33828592300415,
        //         "OutputMass": 7.203367710113525,
        //         "DeltaMass": 0.134918212890625,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.525638461112976,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-20T22:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 109.19719696044922,
        //         "OutputTemperature": 59.900508880615234,
        //         "DeltaTemperature": 49.296688079833984,
        //         "InputVolume": 7.619999885559082,
        //         "OutputVolume": 7.239999771118164,
        //         "DeltaVolume": 0.38000011444091797,
        //         "InputMass": 7.253942966461182,
        //         "OutputMass": 7.121007442474365,
        //         "DeltaMass": 0.1329355239868164,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.5021342039108276,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-20T23:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 109.44789123535156,
        //         "OutputTemperature": 59.561004638671875,
        //         "DeltaTemperature": 49.88688659667969,
        //         "InputVolume": 7.34499979019165,
        //         "OutputVolume": 6.989999771118164,
        //         "DeltaVolume": 0.35500001907348633,
        //         "InputMass": 6.9914164543151855,
        //         "OutputMass": 6.876611232757568,
        //         "DeltaMass": 0.11480522155761719,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.465092420578003,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-21T00:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 110.35681915283203,
        //         "OutputTemperature": 58.96829605102539,
        //         "DeltaTemperature": 51.38852310180664,
        //         "InputVolume": 6.974999904632568,
        //         "OutputVolume": 6.625,
        //         "DeltaVolume": 0.34999990463256836,
        //         "InputMass": 6.634336948394775,
        //         "OutputMass": 6.516845226287842,
        //         "DeltaMass": 0.1174917221069336,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.4321730136871338,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-21T01:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 109.5298843383789,
        //         "OutputTemperature": 58.136043548583984,
        //         "DeltaTemperature": 51.39384078979492,
        //         "InputVolume": 6.994999885559082,
        //         "OutputVolume": 6.659999847412109,
        //         "DeltaVolume": 0.33500003814697266,
        //         "InputMass": 6.657710075378418,
        //         "OutputMass": 6.556288719177246,
        //         "DeltaMass": 0.10142135620117188,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.437206506729126,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-21T02:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 109.37960052490234,
        //         "OutputTemperature": 58.49355697631836,
        //         "DeltaTemperature": 50.886043548583984,
        //         "InputVolume": 6.96999979019165,
        //         "OutputVolume": 6.630000114440918,
        //         "DeltaVolume": 0.3399996757507324,
        //         "InputMass": 6.635168075561523,
        //         "OutputMass": 6.523376941680908,
        //         "DeltaMass": 0.11179113388061523,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.4181913137435913,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-21T03:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 109.20826721191406,
        //         "OutputTemperature": 58.041934967041016,
        //         "DeltaTemperature": 51.16633224487305,
        //         "InputVolume": 6.894999980926514,
        //         "OutputVolume": 6.559999942779541,
        //         "DeltaVolume": 0.33500003814697266,
        //         "InputMass": 6.564295291900635,
        //         "OutputMass": 6.459251880645752,
        //         "DeltaMass": 0.10504341125488281,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.4107091426849365,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-21T04:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 108.39014434814453,
        //         "OutputTemperature": 57.85508346557617,
        //         "DeltaTemperature": 50.53506088256836,
        //         "InputVolume": 6.869999885559082,
        //         "OutputVolume": 6.545000076293945,
        //         "DeltaVolume": 0.3249998092651367,
        //         "InputMass": 6.543892860412598,
        //         "OutputMass": 6.442594051361084,
        //         "DeltaMass": 0.10129880905151367,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.3888757228851318,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-21T05:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 104.78974151611328,
        //         "OutputTemperature": 57.80803298950195,
        //         "DeltaTemperature": 46.98170852661133,
        //         "InputVolume": 7.639999866485596,
        //         "OutputVolume": 7.284999847412109,
        //         "DeltaVolume": 0.35500001907348633,
        //         "InputMass": 7.297927379608154,
        //         "OutputMass": 7.1725239753723145,
        //         "DeltaMass": 0.12540340423583984,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.4395900964736938,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-21T06:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 104.86612701416016,
        //         "OutputTemperature": 57.8526725769043,
        //         "DeltaTemperature": 47.01345443725586,
        //         "InputVolume": 7.034999847412109,
        //         "OutputVolume": 6.695000171661377,
        //         "DeltaVolume": 0.3399996757507324,
        //         "InputMass": 6.720553874969482,
        //         "OutputMass": 6.59287166595459,
        //         "DeltaMass": 0.12768220901489258,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.3266181945800781,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-21T07:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 105.38755798339844,
        //         "OutputTemperature": 57.211204528808594,
        //         "DeltaTemperature": 48.176353454589844,
        //         "InputVolume": 7.204999923706055,
        //         "OutputVolume": 6.864999771118164,
        //         "DeltaVolume": 0.3400001525878906,
        //         "InputMass": 6.880697727203369,
        //         "OutputMass": 6.760528087615967,
        //         "DeltaMass": 0.12016963958740234,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.3918148279190063,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-21T08:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 105.48379516601562,
        //         "OutputTemperature": 56.56309127807617,
        //         "DeltaTemperature": 48.92070388793945,
        //         "InputVolume": 6.679999828338623,
        //         "OutputVolume": 6.360000133514404,
        //         "DeltaVolume": 0.31999969482421875,
        //         "InputMass": 6.377678871154785,
        //         "OutputMass": 6.264857769012451,
        //         "DeltaMass": 0.11282110214233398,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.3099714517593384,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-21T09:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 104.78560638427734,
        //         "OutputTemperature": 55.646827697753906,
        //         "DeltaTemperature": 49.13877868652344,
        //         "InputVolume": 6.235000133514404,
        //         "OutputVolume": 5.940000057220459,
        //         "DeltaVolume": 0.2950000762939453,
        //         "InputMass": 5.95681095123291,
        //         "OutputMass": 5.855581283569336,
        //         "DeltaMass": 0.10122966766357422,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.2288541793823242,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-21T10:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 103.65906524658203,
        //         "OutputTemperature": 54.07726287841797,
        //         "DeltaTemperature": 49.58180236816406,
        //         "InputVolume": 5.940000057220459,
        //         "OutputVolume": 5.659999847412109,
        //         "DeltaVolume": 0.2800002098083496,
        //         "InputMass": 5.6795501708984375,
        //         "OutputMass": 5.5829949378967285,
        //         "DeltaMass": 0.09655523300170898,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.182017207145691,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-21T11:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 103.30418395996094,
        //         "OutputTemperature": 53.58340835571289,
        //         "DeltaTemperature": 49.72077560424805,
        //         "InputVolume": 5.925000190734863,
        //         "OutputVolume": 5.639999866485596,
        //         "DeltaVolume": 0.2850003242492676,
        //         "InputMass": 5.666469573974609,
        //         "OutputMass": 5.562929630279541,
        //         "DeltaMass": 0.10353994369506836,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.1825425624847412,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-21T12:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 102.93827819824219,
        //         "OutputTemperature": 53.04646301269531,
        //         "DeltaTemperature": 49.891815185546875,
        //         "InputVolume": 5.664999961853027,
        //         "OutputVolume": 5.400000095367432,
        //         "DeltaVolume": 0.2649998664855957,
        //         "InputMass": 5.419673919677734,
        //         "OutputMass": 5.329174518585205,
        //         "DeltaMass": 0.0904994010925293,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.1348748207092285,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-21T13:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 104.18363189697266,
        //         "OutputTemperature": 52.2802619934082,
        //         "DeltaTemperature": 51.90336990356445,
        //         "InputVolume": 5.494999885559082,
        //         "OutputVolume": 5.239999771118164,
        //         "DeltaVolume": 0.25500011444091797,
        //         "InputMass": 5.251743316650391,
        //         "OutputMass": 5.173995494842529,
        //         "DeltaMass": 0.07774782180786133,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.144103765487671,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-21T14:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 104.93399810791016,
        //         "OutputTemperature": 52.70793151855469,
        //         "DeltaTemperature": 52.22606658935547,
        //         "InputVolume": 5.724999904632568,
        //         "OutputVolume": 5.454999923706055,
        //         "DeltaVolume": 0.26999998092651367,
        //         "InputMass": 5.468409538269043,
        //         "OutputMass": 5.384545803070068,
        //         "DeltaMass": 0.08386373519897461,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.1988083124160767,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-21T15:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 101.49077606201172,
        //         "OutputTemperature": 52.8304443359375,
        //         "DeltaTemperature": 48.66033172607422,
        //         "InputVolume": 6.079999923706055,
        //         "OutputVolume": 5.804999828338623,
        //         "DeltaVolume": 0.27500009536743164,
        //         "InputMass": 5.823484897613525,
        //         "OutputMass": 5.730069160461426,
        //         "DeltaMass": 0.09341573715209961,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.1892073154449463,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-21T16:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 101.67939758300781,
        //         "OutputTemperature": 53.282875061035156,
        //         "DeltaTemperature": 48.396522521972656,
        //         "InputVolume": 5.974999904632568,
        //         "OutputVolume": 5.690000057220459,
        //         "DeltaVolume": 0.2849998474121094,
        //         "InputMass": 5.721534252166748,
        //         "OutputMass": 5.6152448654174805,
        //         "DeltaMass": 0.10628938674926758,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.1620805263519287,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-21T17:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 101.18123626708984,
        //         "OutputTemperature": 52.40459060668945,
        //         "DeltaTemperature": 48.77664566040039,
        //         "InputVolume": 5.704999923706055,
        //         "OutputVolume": 5.445000171661377,
        //         "DeltaVolume": 0.25999975204467773,
        //         "InputMass": 5.464885234832764,
        //         "OutputMass": 5.374875545501709,
        //         "DeltaMass": 0.09000968933105469,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.1185901165008545,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-21T18:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 101.45278930664062,
        //         "OutputTemperature": 52.367095947265625,
        //         "DeltaTemperature": 49.085693359375,
        //         "InputVolume": 5.855000019073486,
        //         "OutputVolume": 5.574999809265137,
        //         "DeltaVolume": 0.2800002098083496,
        //         "InputMass": 5.608038902282715,
        //         "OutputMass": 5.503573417663574,
        //         "DeltaMass": 0.10446548461914062,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.1551756858825684,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-21T19:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 100.07313537597656,
        //         "OutputTemperature": 51.988948822021484,
        //         "DeltaTemperature": 48.08418655395508,
        //         "InputVolume": 5.570000171661377,
        //         "OutputVolume": 5.315000057220459,
        //         "DeltaVolume": 0.25500011444091797,
        //         "InputMass": 5.339375019073486,
        //         "OutputMass": 5.248998165130615,
        //         "DeltaMass": 0.0903768539428711,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.0772912502288818,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-21T20:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 99.30563354492188,
        //         "OutputTemperature": 51.43073272705078,
        //         "DeltaTemperature": 47.874900817871094,
        //         "InputVolume": 5.789999961853027,
        //         "OutputVolume": 5.519999980926514,
        //         "DeltaVolume": 0.26999998092651367,
        //         "InputMass": 5.554838180541992,
        //         "OutputMass": 5.452681541442871,
        //         "DeltaMass": 0.1021566390991211,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.115805983543396,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-21T21:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 100.21450805664062,
        //         "OutputTemperature": 51.9536018371582,
        //         "DeltaTemperature": 48.26090621948242,
        //         "InputVolume": 6.019999980926514,
        //         "OutputVolume": 5.744999885559082,
        //         "DeltaVolume": 0.27500009536743164,
        //         "InputMass": 5.770467758178711,
        //         "OutputMass": 5.672931671142578,
        //         "DeltaMass": 0.09753608703613281,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.16856849193573,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-21T22:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 99.5550765991211,
        //         "OutputTemperature": 52.25566864013672,
        //         "DeltaTemperature": 47.299407958984375,
        //         "InputVolume": 5.769999980926514,
        //         "OutputVolume": 5.5,
        //         "DeltaVolume": 0.26999998092651367,
        //         "InputMass": 5.534130573272705,
        //         "OutputMass": 5.429943561553955,
        //         "DeltaMass": 0.10418701171875,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.0983532667160034,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-21T23:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 99.07292175292969,
        //         "OutputTemperature": 51.938053131103516,
        //         "DeltaTemperature": 47.13486862182617,
        //         "InputVolume": 5.974999904632568,
        //         "OutputVolume": 5.715000152587891,
        //         "DeltaVolume": 0.25999975204467773,
        //         "InputMass": 5.733269691467285,
        //         "OutputMass": 5.641437530517578,
        //         "DeltaMass": 0.09183216094970703,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.1338599920272827,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-22T00:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 102.29792785644531,
        //         "OutputTemperature": 52.623985290527344,
        //         "DeltaTemperature": 49.67394256591797,
        //         "InputVolume": 5.690000057220459,
        //         "OutputVolume": 5.425000190734863,
        //         "DeltaVolume": 0.2649998664855957,
        //         "InputMass": 5.445620059967041,
        //         "OutputMass": 5.355255603790283,
        //         "DeltaMass": 0.09036445617675781,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.1352616548538208,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-22T01:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 102.2046127319336,
        //         "OutputTemperature": 52.03474426269531,
        //         "DeltaTemperature": 50.16986846923828,
        //         "InputVolume": 5.65500020980835,
        //         "OutputVolume": 5.40500020980835,
        //         "DeltaVolume": 0.25,
        //         "InputMass": 5.412478923797607,
        //         "OutputMass": 5.336594581604004,
        //         "DeltaMass": 0.07588434219360352,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.139559268951416,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-22T02:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 101.81446838378906,
        //         "OutputTemperature": 52.74507141113281,
        //         "DeltaTemperature": 49.06939697265625,
        //         "InputVolume": 5.755000114440918,
        //         "OutputVolume": 5.494999885559082,
        //         "DeltaVolume": 0.26000022888183594,
        //         "InputMass": 5.510303020477295,
        //         "OutputMass": 5.423416614532471,
        //         "DeltaMass": 0.08688640594482422,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.1347284317016602,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-22T03:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 101.01132202148438,
        //         "OutputTemperature": 52.29955291748047,
        //         "DeltaTemperature": 48.711769104003906,
        //         "InputVolume": 5.829999923706055,
        //         "OutputVolume": 5.574999809265137,
        //         "DeltaVolume": 0.25500011444091797,
        //         "InputMass": 5.586033344268799,
        //         "OutputMass": 5.503573417663574,
        //         "DeltaMass": 0.08245992660522461,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.1418548822402954,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-22T04:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 101.05096435546875,
        //         "OutputTemperature": 52.89857482910156,
        //         "DeltaTemperature": 48.15238952636719,
        //         "InputVolume": 5.78000020980835,
        //         "OutputVolume": 5.514999866485596,
        //         "DeltaVolume": 0.2650003433227539,
        //         "InputMass": 5.537417411804199,
        //         "OutputMass": 5.444057941436768,
        //         "DeltaMass": 0.09335947036743164,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.1189604997634888,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-22T05:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 101.00554656982422,
        //         "OutputTemperature": 52.31665802001953,
        //         "DeltaTemperature": 48.68888854980469,
        //         "InputVolume": 5.994999885559082,
        //         "OutputVolume": 5.735000133514404,
        //         "DeltaVolume": 0.25999975204467773,
        //         "InputMass": 5.744044780731201,
        //         "OutputMass": 5.661396026611328,
        //         "DeltaMass": 0.08264875411987305,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.1736077070236206,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-22T06:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 100.77732849121094,
        //         "OutputTemperature": 52.794471740722656,
        //         "DeltaTemperature": 47.98285675048828,
        //         "InputVolume": 5.735000133514404,
        //         "OutputVolume": 5.46999979019165,
        //         "DeltaVolume": 0.2650003433227539,
        //         "InputMass": 5.495410919189453,
        //         "OutputMass": 5.399473667144775,
        //         "DeltaMass": 0.09593725204467773,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.106540322303772,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-22T07:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 100.66851043701172,
        //         "OutputTemperature": 52.338443756103516,
        //         "DeltaTemperature": 48.3300666809082,
        //         "InputVolume": 5.994999885559082,
        //         "OutputVolume": 5.730000019073486,
        //         "DeltaVolume": 0.2649998664855957,
        //         "InputMass": 5.744717121124268,
        //         "OutputMass": 5.657780647277832,
        //         "DeltaMass": 0.08693647384643555,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.1650813817977905,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-22T08:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 100.96793365478516,
        //         "OutputTemperature": 52.6570930480957,
        //         "DeltaTemperature": 48.31084060668945,
        //         "InputVolume": 5.605000019073486,
        //         "OutputVolume": 5.34499979019165,
        //         "DeltaVolume": 0.26000022888183594,
        //         "InputMass": 5.3705668449401855,
        //         "OutputMass": 5.277475357055664,
        //         "DeltaMass": 0.09309148788452148,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.0887975692749023,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-22T09:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 101.30795288085938,
        //         "OutputTemperature": 51.703529357910156,
        //         "DeltaTemperature": 49.60442352294922,
        //         "InputVolume": 5.489999771118164,
        //         "OutputVolume": 5.235000133514404,
        //         "DeltaVolume": 0.25499963760375977,
        //         "InputMass": 5.258876323699951,
        //         "OutputMass": 5.170963764190674,
        //         "DeltaMass": 0.08791255950927734,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.0946729183197021,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-22T10:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 100.71167755126953,
        //         "OutputTemperature": 51.02785110473633,
        //         "DeltaTemperature": 49.6838264465332,
        //         "InputVolume": 5.369999885559082,
        //         "OutputVolume": 5.125,
        //         "DeltaVolume": 0.24499988555908203,
        //         "InputMass": 5.145659446716309,
        //         "OutputMass": 5.062801837921143,
        //         "DeltaMass": 0.08285760879516602,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.0727301836013794,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-22T11:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 99.38484191894531,
        //         "OutputTemperature": 51.4146614074707,
        //         "DeltaTemperature": 47.97018051147461,
        //         "InputVolume": 5.590000152587891,
        //         "OutputVolume": 5.335000038146973,
        //         "DeltaVolume": 0.25500011444091797,
        //         "InputMass": 5.3613715171813965,
        //         "OutputMass": 5.269223213195801,
        //         "DeltaMass": 0.0921483039855957,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.0790934562683105,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-22T12:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 99.63707733154297,
        //         "OutputTemperature": 51.248939514160156,
        //         "DeltaTemperature": 48.38813781738281,
        //         "InputVolume": 5.679999828338623,
        //         "OutputVolume": 5.429999828338623,
        //         "DeltaVolume": 0.25,
        //         "InputMass": 5.447849273681641,
        //         "OutputMass": 5.364343643188477,
        //         "DeltaMass": 0.08350563049316406,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.1060645580291748,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-22T13:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 99.68020629882812,
        //         "OutputTemperature": 51.573848724365234,
        //         "DeltaTemperature": 48.10635757446289,
        //         "InputVolume": 5.664999961853027,
        //         "OutputVolume": 5.409999847412109,
        //         "DeltaVolume": 0.25500011444091797,
        //         "InputMass": 5.433303356170654,
        //         "OutputMass": 5.344103813171387,
        //         "DeltaMass": 0.08919954299926758,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.0967135429382324,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-22T14:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 100.53581237792969,
        //         "OutputTemperature": 52.093505859375,
        //         "DeltaTemperature": 48.44230651855469,
        //         "InputVolume": 6.994999885559082,
        //         "OutputVolume": 6.635000228881836,
        //         "DeltaVolume": 0.3599996566772461,
        //         "InputMass": 6.705493927001953,
        //         "OutputMass": 6.55250883102417,
        //         "DeltaMass": 0.1529850959777832,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.3630567789077759,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-22T15:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 100.62847137451172,
        //         "OutputTemperature": 55.58720397949219,
        //         "DeltaTemperature": 45.04126739501953,
        //         "InputVolume": 7.005000114440918,
        //         "OutputVolume": 6.690000057220459,
        //         "DeltaVolume": 0.315000057220459,
        //         "InputMass": 6.713189601898193,
        //         "OutputMass": 6.595764636993408,
        //         "DeltaMass": 0.11742496490478516,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.269047498703003,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-22T16:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 100.40135955810547,
        //         "OutputTemperature": 55.4534912109375,
        //         "DeltaTemperature": 44.94786834716797,
        //         "InputVolume": 7.539999961853027,
        //         "OutputVolume": 7.204999923706055,
        //         "DeltaVolume": 0.33500003814697266,
        //         "InputMass": 7.22629976272583,
        //         "OutputMass": 7.102974891662598,
        //         "DeltaMass": 0.12332487106323242,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.3631718158721924,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-22T17:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 100.13480377197266,
        //         "OutputTemperature": 56.14537048339844,
        //         "DeltaTemperature": 43.98943328857422,
        //         "InputVolume": 7.315000057220459,
        //         "OutputVolume": 6.985000133514404,
        //         "DeltaVolume": 0.3299999237060547,
        //         "InputMass": 7.0118408203125,
        //         "OutputMass": 6.882988929748535,
        //         "DeltaMass": 0.12885189056396484,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.294554591178894,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-22T18:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 99.69852447509766,
        //         "OutputTemperature": 55.905311584472656,
        //         "DeltaTemperature": 43.793212890625,
        //         "InputVolume": 7.559999942779541,
        //         "OutputVolume": 7.210000038146973,
        //         "DeltaVolume": 0.34999990463256836,
        //         "InputMass": 7.248491287231445,
        //         "OutputMass": 7.1041131019592285,
        //         "DeltaMass": 0.1443781852722168,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.3322335481643677,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-22T19:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 100.00018310546875,
        //         "OutputTemperature": 56.53797912597656,
        //         "DeltaTemperature": 43.46220397949219,
        //         "InputVolume": 7.565000057220459,
        //         "OutputVolume": 7.21999979019165,
        //         "DeltaVolume": 0.3450002670288086,
        //         "InputMass": 7.252833366394043,
        //         "OutputMass": 7.114451885223389,
        //         "DeltaMass": 0.1383814811706543,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.3230304718017578,
        //         "TimeWork": 1
        //     }
        // },
        // {
        //     "Timestamp": "2021-01-22T20:00:00+03:00",
        //     "Values": {
        //         "InputTemperature": 100.1432113647461,
        //         "OutputTemperature": 56.2568359375,
        //         "DeltaTemperature": 43.886375427246094,
        //         "InputVolume": 7.84499979019165,
        //         "OutputVolume": 7.485000133514404,
        //         "DeltaVolume": 0.3599996566772461,
        //         "InputMass": 7.520893096923828,
        //         "OutputMass": 7.375687599182129,
        //         "DeltaMass": 0.14520549774169922,
        //         "InputPressure": 0.6000000238418579,
        //         "OutputPressure": 0.5019338726997375,
        //         "DeltaPressure": 0.09806615114212036,
        //         "Energy": 1.385298252105713,
        //         "TimeWork": 1
        //     }
        // },
        {
            "Timestamp": "2021-01-22T21:00:00+03:00",
            "Values": {
                "InputTemperature": 99.95034790039062,
                "OutputTemperature": 56.9176025390625,
                "DeltaTemperature": 43.032745361328125,
                "InputVolume": 7.445000171661377,
                "OutputVolume": 7.099999904632568,
                "DeltaVolume": 0.3450002670288086,
                "InputMass": 7.138072490692139,
                "OutputMass": 6.99294900894165,
                "DeltaMass": 0.14512348175048828,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.2892382144927979,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-22T22:00:00+03:00",
            "Values": {
                "InputTemperature": 103.02013397216797,
                "OutputTemperature": 56.791500091552734,
                "DeltaTemperature": 46.228633880615234,
                "InputVolume": 7.489999771118164,
                "OutputVolume": 7.139999866485596,
                "DeltaVolume": 0.34999990463256836,
                "InputMass": 7.164829730987549,
                "OutputMass": 7.034406661987305,
                "DeltaMass": 0.13042306900024414,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.3904248476028442,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-22T23:00:00+03:00",
            "Values": {
                "InputTemperature": 107.8257064819336,
                "OutputTemperature": 57.049041748046875,
                "DeltaTemperature": 50.77666473388672,
                "InputVolume": 6.534999847412109,
                "OutputVolume": 6.215000152587891,
                "DeltaVolume": 0.31999969482421875,
                "InputMass": 6.228847503662109,
                "OutputMass": 6.119959831237793,
                "DeltaMass": 0.1088876724243164,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.3282065391540527,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-23T00:00:00+03:00",
            "Values": {
                "InputTemperature": 108.73836517333984,
                "OutputTemperature": 56.96127700805664,
                "DeltaTemperature": 51.7770881652832,
                "InputVolume": 6.550000190734863,
                "OutputVolume": 6.239999771118164,
                "DeltaVolume": 0.3100004196166992,
                "InputMass": 6.237881660461426,
                "OutputMass": 6.146054267883301,
                "DeltaMass": 0.091827392578125,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.3564332723617554,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-23T01:00:00+03:00",
            "Values": {
                "InputTemperature": 108.28164672851562,
                "OutputTemperature": 57.30070495605469,
                "DeltaTemperature": 50.98094177246094,
                "InputVolume": 6.710000038146973,
                "OutputVolume": 6.389999866485596,
                "DeltaVolume": 0.32000017166137695,
                "InputMass": 6.393649578094482,
                "OutputMass": 6.291386604309082,
                "DeltaMass": 0.10226297378540039,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.3688936233520508,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-23T02:00:00+03:00",
            "Values": {
                "InputTemperature": 108.12462615966797,
                "OutputTemperature": 57.69155502319336,
                "DeltaTemperature": 50.43307113647461,
                "InputVolume": 6.875,
                "OutputVolume": 6.545000076293945,
                "DeltaVolume": 0.3299999237060547,
                "InputMass": 6.550036907196045,
                "OutputMass": 6.444577693939209,
                "DeltaMass": 0.10545921325683594,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.3873395919799805,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-23T03:00:00+03:00",
            "Values": {
                "InputTemperature": 108.42524719238281,
                "OutputTemperature": 58.174530029296875,
                "DeltaTemperature": 50.25071716308594,
                "InputVolume": 7.269999980926514,
                "OutputVolume": 6.925000190734863,
                "DeltaVolume": 0.3449997901916504,
                "InputMass": 6.925056457519531,
                "OutputMass": 6.814551830291748,
                "DeltaMass": 0.1105046272277832,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.4615284204483032,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-23T04:00:00+03:00",
            "Values": {
                "InputTemperature": 107.25355529785156,
                "OutputTemperature": 58.810028076171875,
                "DeltaTemperature": 48.44352722167969,
                "InputVolume": 7.420000076293945,
                "OutputVolume": 7.070000171661377,
                "DeltaVolume": 0.34999990463256836,
                "InputMass": 7.075887203216553,
                "OutputMass": 6.955310344696045,
                "DeltaMass": 0.12057685852050781,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.4395798444747925,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-23T05:00:00+03:00",
            "Values": {
                "InputTemperature": 103.43378448486328,
                "OutputTemperature": 59.20081329345703,
                "DeltaTemperature": 44.23297119140625,
                "InputVolume": 8.095000267028809,
                "OutputVolume": 7.715000152587891,
                "DeltaVolume": 0.38000011444091797,
                "InputMass": 7.740683078765869,
                "OutputMass": 7.590304851531982,
                "DeltaMass": 0.15037822723388672,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.437570333480835,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-23T06:00:00+03:00",
            "Values": {
                "InputTemperature": 102.14634704589844,
                "OutputTemperature": 59.12812805175781,
                "DeltaTemperature": 43.018218994140625,
                "InputVolume": 8.53499984741211,
                "OutputVolume": 8.149999618530273,
                "DeltaVolume": 0.38500022888183594,
                "InputMass": 8.170994758605957,
                "OutputMass": 8.019116401672363,
                "DeltaMass": 0.15187835693359375,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.4756892919540405,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-23T07:00:00+03:00",
            "Values": {
                "InputTemperature": 103.42450714111328,
                "OutputTemperature": 59.284812927246094,
                "DeltaTemperature": 44.13969421386719,
                "InputVolume": 8.015000343322754,
                "OutputVolume": 7.635000228881836,
                "DeltaVolume": 0.38000011444091797,
                "InputMass": 7.666030406951904,
                "OutputMass": 7.510809421539307,
                "DeltaMass": 0.15522098541259766,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.4207245111465454,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-23T08:00:00+03:00",
            "Values": {
                "InputTemperature": 101.10559844970703,
                "OutputTemperature": 58.480289459228516,
                "DeltaTemperature": 42.625308990478516,
                "InputVolume": 7.829999923706055,
                "OutputVolume": 7.46999979019165,
                "DeltaVolume": 0.3600001335144043,
                "InputMass": 7.501791954040527,
                "OutputMass": 7.352958679199219,
                "DeltaMass": 0.1488332748413086,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.3423092365264893,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-23T09:00:00+03:00",
            "Values": {
                "InputTemperature": 99.44440460205078,
                "OutputTemperature": 58.10013198852539,
                "DeltaTemperature": 41.34427261352539,
                "InputVolume": 8.345000267028809,
                "OutputVolume": 7.965000152587891,
                "DeltaVolume": 0.38000011444091797,
                "InputMass": 8.005041122436523,
                "OutputMass": 7.84096622467041,
                "DeltaMass": 0.16407489776611328,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.3891561031341553,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-23T10:00:00+03:00",
            "Values": {
                "InputTemperature": 98.90277862548828,
                "OutputTemperature": 57.34184646606445,
                "DeltaTemperature": 41.56093215942383,
                "InputVolume": 7.760000228881836,
                "OutputVolume": 7.409999847412109,
                "DeltaVolume": 0.35000038146972656,
                "InputMass": 7.446244239807129,
                "OutputMass": 7.29740047454834,
                "DeltaMass": 0.14884376525878906,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.2988344430923462,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-23T11:00:00+03:00",
            "Values": {
                "InputTemperature": 99.22969055175781,
                "OutputTemperature": 55.81535720825195,
                "DeltaTemperature": 43.41433334350586,
                "InputVolume": 6.519999980926514,
                "OutputVolume": 6.21999979019165,
                "DeltaVolume": 0.3000001907348633,
                "InputMass": 6.2552809715271,
                "OutputMass": 6.131556034088135,
                "DeltaMass": 0.12372493743896484,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.1397004127502441,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-23T12:00:00+03:00",
            "Values": {
                "InputTemperature": 99.40235137939453,
                "OutputTemperature": 54.483055114746094,
                "DeltaTemperature": 44.91929626464844,
                "InputVolume": 7.15500020980835,
                "OutputVolume": 6.829999923706055,
                "DeltaVolume": 0.3250002861022949,
                "InputMass": 6.862815856933594,
                "OutputMass": 6.736167907714844,
                "DeltaMass": 0.12664794921875,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.293654441833496,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-23T13:00:00+03:00",
            "Values": {
                "InputTemperature": 99.09355926513672,
                "OutputTemperature": 54.876224517822266,
                "DeltaTemperature": 44.21733474731445,
                "InputVolume": 6.65500020980835,
                "OutputVolume": 6.349999904632568,
                "DeltaVolume": 0.30500030517578125,
                "InputMass": 6.386109352111816,
                "OutputMass": 6.261821746826172,
                "DeltaMass": 0.12428760528564453,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.1849703788757324,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-23T14:00:00+03:00",
            "Values": {
                "InputTemperature": 99.3984375,
                "OutputTemperature": 54.82844161987305,
                "DeltaTemperature": 44.56999588012695,
                "InputVolume": 7.09499979019165,
                "OutputVolume": 6.764999866485596,
                "DeltaVolume": 0.3299999237060547,
                "InputMass": 6.805489540100098,
                "OutputMass": 6.6704559326171875,
                "DeltaMass": 0.13503360748291016,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.2728890180587769,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-23T15:00:00+03:00",
            "Values": {
                "InputTemperature": 99.30682373046875,
                "OutputTemperature": 55.18740463256836,
                "DeltaTemperature": 44.11941909790039,
                "InputVolume": 6.994999885559082,
                "OutputVolume": 6.675000190734863,
                "DeltaVolume": 0.31999969482421875,
                "InputMass": 6.710037708282471,
                "OutputMass": 6.580825328826904,
                "DeltaMass": 0.1292123794555664,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.2423806190490723,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-23T16:00:00+03:00",
            "Values": {
                "InputTemperature": 99.25431823730469,
                "OutputTemperature": 54.99798583984375,
                "DeltaTemperature": 44.25633239746094,
                "InputVolume": 7.170000076293945,
                "OutputVolume": 6.84499979019165,
                "DeltaVolume": 0.3250002861022949,
                "InputMass": 6.878890037536621,
                "OutputMass": 6.749999523162842,
                "DeltaMass": 0.1288905143737793,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.2775825262069702,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-23T17:00:00+03:00",
            "Values": {
                "InputTemperature": 99.1516342163086,
                "OutputTemperature": 55.452613830566406,
                "DeltaTemperature": 43.69902038574219,
                "InputVolume": 6.880000114440918,
                "OutputVolume": 6.559999942779541,
                "DeltaVolume": 0.32000017166137695,
                "InputMass": 6.601944923400879,
                "OutputMass": 6.4661359786987305,
                "DeltaMass": 0.13580894470214844,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.210709810256958,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-23T18:00:00+03:00",
            "Values": {
                "InputTemperature": 98.81940460205078,
                "OutputTemperature": 54.93943405151367,
                "DeltaTemperature": 43.87997055053711,
                "InputVolume": 6.925000190734863,
                "OutputVolume": 6.610000133514404,
                "DeltaVolume": 0.315000057220459,
                "InputMass": 6.645784378051758,
                "OutputMass": 6.518261432647705,
                "DeltaMass": 0.12752294540405273,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.223740816116333,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-23T19:00:00+03:00",
            "Values": {
                "InputTemperature": 98.6123275756836,
                "OutputTemperature": 54.83626937866211,
                "DeltaTemperature": 43.776058197021484,
                "InputVolume": 6.880000114440918,
                "OutputVolume": 6.565000057220459,
                "DeltaVolume": 0.315000057220459,
                "InputMass": 6.6021881103515625,
                "OutputMass": 6.473787784576416,
                "DeltaMass": 0.12840032577514648,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.2128134965896606,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-23T20:00:00+03:00",
            "Values": {
                "InputTemperature": 98.2231216430664,
                "OutputTemperature": 54.6221923828125,
                "DeltaTemperature": 43.600929260253906,
                "InputVolume": 6.849999904632568,
                "OutputVolume": 6.534999847412109,
                "DeltaVolume": 0.315000057220459,
                "InputMass": 6.5764336585998535,
                "OutputMass": 6.44439697265625,
                "DeltaMass": 0.13203668594360352,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.2032220363616943,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-23T21:00:00+03:00",
            "Values": {
                "InputTemperature": 97.9666519165039,
                "OutputTemperature": 54.583229064941406,
                "DeltaTemperature": 43.3834228515625,
                "InputVolume": 6.860000133514404,
                "OutputVolume": 6.550000190734863,
                "DeltaVolume": 0.309999942779541,
                "InputMass": 6.5864691734313965,
                "OutputMass": 6.45714807510376,
                "DeltaMass": 0.12932109832763672,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.1990184783935547,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-23T22:00:00+03:00",
            "Values": {
                "InputTemperature": 96.49161529541016,
                "OutputTemperature": 54.46781921386719,
                "DeltaTemperature": 42.02379608154297,
                "InputVolume": 6.71999979019165,
                "OutputVolume": 6.420000076293945,
                "DeltaVolume": 0.2999997138977051,
                "InputMass": 6.459603786468506,
                "OutputMass": 6.330894470214844,
                "DeltaMass": 0.1287093162536621,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.1389766931533813,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-23T23:00:00+03:00",
            "Values": {
                "InputTemperature": 90.89727783203125,
                "OutputTemperature": 53.90060806274414,
                "DeltaTemperature": 36.99666976928711,
                "InputVolume": 7.974999904632568,
                "OutputVolume": 7.650000095367432,
                "DeltaVolume": 0.3249998092651367,
                "InputMass": 7.697296619415283,
                "OutputMass": 7.548363208770752,
                "DeltaMass": 0.14893341064453125,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.194511890411377,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-24T00:00:00+03:00",
            "Values": {
                "InputTemperature": 90.40692901611328,
                "OutputTemperature": 54.54936218261719,
                "DeltaTemperature": 35.857566833496094,
                "InputVolume": 7.829999923706055,
                "OutputVolume": 7.505000114440918,
                "DeltaVolume": 0.3249998092651367,
                "InputMass": 7.558877468109131,
                "OutputMass": 7.40078067779541,
                "DeltaMass": 0.1580967903137207,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.1369317770004272,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-24T01:00:00+03:00",
            "Values": {
                "InputTemperature": 90.50409698486328,
                "OutputTemperature": 53.89695358276367,
                "DeltaTemperature": 36.60714340209961,
                "InputVolume": 7.590000152587891,
                "OutputVolume": 7.284999847412109,
                "DeltaVolume": 0.30500030517578125,
                "InputMass": 7.327457904815674,
                "OutputMass": 7.187562465667725,
                "DeltaMass": 0.13989543914794922,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.1251262426376343,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-24T02:00:00+03:00",
            "Values": {
                "InputTemperature": 91.04306030273438,
                "OutputTemperature": 53.50810241699219,
                "DeltaTemperature": 37.53495788574219,
                "InputVolume": 7.284999847412109,
                "OutputVolume": 6.994999885559082,
                "DeltaVolume": 0.28999996185302734,
                "InputMass": 7.029821395874023,
                "OutputMass": 6.901334762573242,
                "DeltaMass": 0.12848663330078125,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.1067728996276855,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-24T03:00:00+03:00",
            "Values": {
                "InputTemperature": 89.95687103271484,
                "OutputTemperature": 53.566871643066406,
                "DeltaTemperature": 36.38999938964844,
                "InputVolume": 7.769999980926514,
                "OutputVolume": 7.454999923706055,
                "DeltaVolume": 0.315000057220459,
                "InputMass": 7.503442764282227,
                "OutputMass": 7.355507850646973,
                "DeltaMass": 0.1479349136352539,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.145261287689209,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-24T04:00:00+03:00",
            "Values": {
                "InputTemperature": 89.82427978515625,
                "OutputTemperature": 53.49977493286133,
                "DeltaTemperature": 36.32450485229492,
                "InputVolume": 7.170000076293945,
                "OutputVolume": 6.885000228881836,
                "DeltaVolume": 0.2849998474121094,
                "InputMass": 6.92377233505249,
                "OutputMass": 6.793574810028076,
                "DeltaMass": 0.13019752502441406,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.0548760890960693,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-24T05:00:00+03:00",
            "Values": {
                "InputTemperature": 88.12273406982422,
                "OutputTemperature": 52.539283752441406,
                "DeltaTemperature": 35.58345031738281,
                "InputVolume": 7.255000114440918,
                "OutputVolume": 6.96999979019165,
                "DeltaVolume": 0.2850003242492676,
                "InputMass": 7.014024257659912,
                "OutputMass": 6.878941059112549,
                "DeltaMass": 0.13508319854736328,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.0467063188552856,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-24T06:00:00+03:00",
            "Values": {
                "InputTemperature": 87.50806427001953,
                "OutputTemperature": 52.222572326660156,
                "DeltaTemperature": 35.285491943359375,
                "InputVolume": 7.34499979019165,
                "OutputVolume": 7.059999942779541,
                "DeltaVolume": 0.2849998474121094,
                "InputMass": 7.104678630828857,
                "OutputMass": 6.970125675201416,
                "DeltaMass": 0.1345529556274414,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.0513044595718384,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-24T07:00:00+03:00",
            "Values": {
                "InputTemperature": 87.47977447509766,
                "OutputTemperature": 52.16576385498047,
                "DeltaTemperature": 35.31401062011719,
                "InputVolume": 7.364999771118164,
                "OutputVolume": 7.079999923706055,
                "DeltaVolume": 0.2849998474121094,
                "InputMass": 7.123682498931885,
                "OutputMass": 6.9910807609558105,
                "DeltaMass": 0.13260173797607422,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.0549780130386353,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-24T08:00:00+03:00",
            "Values": {
                "InputTemperature": 87.08572387695312,
                "OutputTemperature": 51.69910430908203,
                "DeltaTemperature": 35.386619567871094,
                "InputVolume": 6.800000190734863,
                "OutputVolume": 6.534999847412109,
                "DeltaVolume": 0.2650003433227539,
                "InputMass": 6.580206394195557,
                "OutputMass": 6.454818248748779,
                "DeltaMass": 0.12538814544677734,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 0.9764689803123474,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-24T09:00:00+03:00",
            "Values": {
                "InputTemperature": 86.81710052490234,
                "OutputTemperature": 50.88222122192383,
                "DeltaTemperature": 35.934879302978516,
                "InputVolume": 6.894999980926514,
                "OutputVolume": 6.630000114440918,
                "DeltaVolume": 0.2649998664855957,
                "InputMass": 6.673368453979492,
                "OutputMass": 6.550770282745361,
                "DeltaMass": 0.12259817123413086,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 1.0055655241012573,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-24T10:00:00+03:00",
            "Values": {
                "InputTemperature": 86.53121185302734,
                "OutputTemperature": 50.429622650146484,
                "DeltaTemperature": 36.10158920288086,
                "InputVolume": 6.170000076293945,
                "OutputVolume": 5.925000190734863,
                "DeltaVolume": 0.24499988555908203,
                "InputMass": 5.973085403442383,
                "OutputMass": 5.856664180755615,
                "DeltaMass": 0.11642122268676758,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 0.9041948914527893,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-24T11:00:00+03:00",
            "Values": {
                "InputTemperature": 86.63717651367188,
                "OutputTemperature": 49.03005599975586,
                "DeltaTemperature": 37.607120513916016,
                "InputVolume": 5.739999771118164,
                "OutputVolume": 5.514999866485596,
                "DeltaVolume": 0.22499990463256836,
                "InputMass": 5.5552897453308105,
                "OutputMass": 5.452576637268066,
                "DeltaMass": 0.10271310806274414,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 0.875964879989624,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-24T12:00:00+03:00",
            "Values": {
                "InputTemperature": 86.48064422607422,
                "OutputTemperature": 48.446380615234375,
                "DeltaTemperature": 38.034263610839844,
                "InputVolume": 5.409999847412109,
                "OutputVolume": 5.195000171661377,
                "DeltaVolume": 0.21499967575073242,
                "InputMass": 5.237127780914307,
                "OutputMass": 5.1381330490112305,
                "DeltaMass": 0.09899473190307617,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 0.8351402878761292,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-24T13:00:00+03:00",
            "Values": {
                "InputTemperature": 86.28668212890625,
                "OutputTemperature": 47.45069885253906,
                "DeltaTemperature": 38.83598327636719,
                "InputVolume": 5.489999771118164,
                "OutputVolume": 5.284999847412109,
                "DeltaVolume": 0.2049999237060547,
                "InputMass": 5.314728736877441,
                "OutputMass": 5.229508876800537,
                "DeltaMass": 0.0852198600769043,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 0.8653250932693481,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-24T14:00:00+03:00",
            "Values": {
                "InputTemperature": 85.03015899658203,
                "OutputTemperature": 47.24680709838867,
                "DeltaTemperature": 37.78335189819336,
                "InputVolume": 4.989999771118164,
                "OutputVolume": 4.795000076293945,
                "DeltaVolume": 0.19499969482421875,
                "InputMass": 4.834408283233643,
                "OutputMass": 4.745153903961182,
                "DeltaMass": 0.08925437927246094,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 0.7657498717308044,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-24T15:00:00+03:00",
            "Values": {
                "InputTemperature": 81.67242431640625,
                "OutputTemperature": 46.244468688964844,
                "DeltaTemperature": 35.427955627441406,
                "InputVolume": 5.659999847412109,
                "OutputVolume": 5.454999923706055,
                "DeltaVolume": 0.2049999237060547,
                "InputMass": 5.495811939239502,
                "OutputMass": 5.401833534240723,
                "DeltaMass": 0.0939784049987793,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 0.8161307573318481,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-24T16:00:00+03:00",
            "Values": {
                "InputTemperature": 81.3889389038086,
                "OutputTemperature": 46.779510498046875,
                "DeltaTemperature": 34.60942840576172,
                "InputVolume": 5.695000171661377,
                "OutputVolume": 5.489999771118164,
                "DeltaVolume": 0.2050004005432129,
                "InputMass": 5.53065824508667,
                "OutputMass": 5.434279441833496,
                "DeltaMass": 0.09637880325317383,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 0.8023343086242676,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-24T17:00:00+03:00",
            "Values": {
                "InputTemperature": 78.62428283691406,
                "OutputTemperature": 45.9296989440918,
                "DeltaTemperature": 32.694583892822266,
                "InputVolume": 5.820000171661377,
                "OutputVolume": 5.610000133514404,
                "DeltaVolume": 0.21000003814697266,
                "InputMass": 5.660737991333008,
                "OutputMass": 5.555950164794922,
                "DeltaMass": 0.10478782653808594,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 0.7756882309913635,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-24T18:00:00+03:00",
            "Values": {
                "InputTemperature": 78.1791763305664,
                "OutputTemperature": 46.38941955566406,
                "DeltaTemperature": 31.789756774902344,
                "InputVolume": 6.170000076293945,
                "OutputVolume": 5.954999923706055,
                "DeltaVolume": 0.21500015258789062,
                "InputMass": 6.0046586990356445,
                "OutputMass": 5.896381855010986,
                "DeltaMass": 0.1082768440246582,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 0.8000364899635315,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-24T19:00:00+03:00",
            "Values": {
                "InputTemperature": 77.67253112792969,
                "OutputTemperature": 45.975006103515625,
                "DeltaTemperature": 31.697525024414062,
                "InputVolume": 5.630000114440918,
                "OutputVolume": 5.429999828338623,
                "DeltaVolume": 0.20000028610229492,
                "InputMass": 5.480085372924805,
                "OutputMass": 5.377927780151367,
                "DeltaMass": 0.1021575927734375,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 0.7280212044715881,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-24T20:00:00+03:00",
            "Values": {
                "InputTemperature": 76.94139862060547,
                "OutputTemperature": 45.74205017089844,
                "DeltaTemperature": 31.19934844970703,
                "InputVolume": 6.309999942779541,
                "OutputVolume": 6.09499979019165,
                "DeltaVolume": 0.21500015258789062,
                "InputMass": 6.145448207855225,
                "OutputMass": 6.036412715911865,
                "DeltaMass": 0.10903549194335938,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 0.8035581707954407,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-24T21:00:00+03:00",
            "Values": {
                "InputTemperature": 77.67035675048828,
                "OutputTemperature": 46.1196174621582,
                "DeltaTemperature": 31.550739288330078,
                "InputVolume": 5.764999866485596,
                "OutputVolume": 5.565000057220459,
                "DeltaVolume": 0.19999980926513672,
                "InputMass": 5.612887859344482,
                "OutputMass": 5.510760307312012,
                "DeltaMass": 0.1021275520324707,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 0.7422076463699341,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-24T22:00:00+03:00",
            "Values": {
                "InputTemperature": 78.10556030273438,
                "OutputTemperature": 45.730289459228516,
                "DeltaTemperature": 32.37527084350586,
                "InputVolume": 5.800000190734863,
                "OutputVolume": 5.599999904632568,
                "DeltaVolume": 0.20000028610229492,
                "InputMass": 5.645076751708984,
                "OutputMass": 5.546966075897217,
                "DeltaMass": 0.09811067581176758,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 0.7659729719161987,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-24T23:00:00+03:00",
            "Values": {
                "InputTemperature": 74.76286315917969,
                "OutputTemperature": 45.49262619018555,
                "DeltaTemperature": 29.27023696899414,
                "InputVolume": 6.159999847412109,
                "OutputVolume": 5.965000152587891,
                "DeltaVolume": 0.19499969482421875,
                "InputMass": 6.0084028244018555,
                "OutputMass": 5.9075703620910645,
                "DeltaMass": 0.10083246231079102,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 0.7370333075523376,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-25T00:00:00+03:00",
            "Values": {
                "InputTemperature": 74.42235565185547,
                "OutputTemperature": 45.94313430786133,
                "DeltaTemperature": 28.47922134399414,
                "InputVolume": 6.485000133514404,
                "OutputVolume": 6.284999847412109,
                "DeltaVolume": 0.20000028610229492,
                "InputMass": 6.325405120849609,
                "OutputMass": 6.223834991455078,
                "DeltaMass": 0.10157012939453125,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 0.7549476623535156,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-25T01:00:00+03:00",
            "Values": {
                "InputTemperature": 73.85824584960938,
                "OutputTemperature": 45.38827133178711,
                "DeltaTemperature": 28.469974517822266,
                "InputVolume": 6.039999961853027,
                "OutputVolume": 5.855000019073486,
                "DeltaVolume": 0.18499994277954102,
                "InputMass": 5.89469051361084,
                "OutputMass": 5.799987316131592,
                "DeltaMass": 0.09470319747924805,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 0.7032892107963562,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-25T02:00:00+03:00",
            "Values": {
                "InputTemperature": 73.45772552490234,
                "OutputTemperature": 45.29898452758789,
                "DeltaTemperature": 28.158740997314453,
                "InputVolume": 6.650000095367432,
                "OutputVolume": 6.445000171661377,
                "DeltaVolume": 0.2049999237060547,
                "InputMass": 6.490255832672119,
                "OutputMass": 6.382706165313721,
                "DeltaMass": 0.10754966735839844,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 0.7658863663673401,
                "TimeWork": 1
            }
        },
        {
            "Timestamp": "2021-01-25T03:00:00+03:00",
            "Values": {
                "InputTemperature": 72.85111999511719,
                "OutputTemperature": 45.626243591308594,
                "DeltaTemperature": 27.224876403808594,
                "InputVolume": 6.380000114440918,
                "OutputVolume": 6.190000057220459,
                "DeltaVolume": 0.19000005722045898,
                "InputMass": 6.228457927703857,
                "OutputMass": 6.130868434906006,
                "DeltaMass": 0.09758949279785156,
                "InputPressure": 0.6000000238418579,
                "OutputPressure": 0.5019338726997375,
                "DeltaPressure": 0.09806615114212036,
                "Energy": 0.710602343082428,
                "TimeWork": 1
            }
        }
    ]
}

const readingsByHours = JSON.parse(JSON.stringify(readingsNew))
// const realReadings = JSON.parse(JSON.stringify())

debugger;

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
    },
    {
        DateTime: "2021-01-20T12:27:42.2387729+03:00",
        Params: {
            InputVolume: 0.313,
            OutputMass: 0.312
        }
    },
    {
        DateTime: "2021-01-21T13:27:42.241241+03:00",
        Params: {
            InputVolume: 0.644,
            OutputVolume: 0.319
        }
    },
    {
        DateTime: "2021-01-22T14:27:42.2387729+03:00",
        Params: {
            InputVolume: 0.423,
            OutputMass: 0.354
        }
    },
    {
        DateTime: "2021-01-23T15:27:42.241241+03:00",
        Params: {
            InputVolume: 0.2,
            OutputVolume: 0.378
        }
    },
    {
        DateTime: "2021-01-24T16:27:42.2387729+03:00",
        Params: {
            InputVolume: 0.333,
            OutputMass: 0.312
        }
    },
    {
        DateTime: "2021-01-25T17:27:42.2387729+03:00",
        Params: {
            InputVolume: 0.245,
            OutputMass: 0.312
        }
    },
    {
        DateTime: "2021-01-26T18:27:42.2387729+03:00",
        Params: {
            InputVolume: 0.4,
            OutputMass: 0.312
        }
    },
    {
        DateTime: "2021-01-27T19:27:42.2387729+03:00",
        Params: {
            InputVolume: 0.5,
            OutputMass: 0.312
        }
    },
    {
        DateTime: "2021-01-28T20:27:42.2387729+03:00",
        Params: {
            InputVolume: 0.9,
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


const graphDataNew = readingsByHours.ArchiveEntries.map((entry) => {
    return {
        time: entry.Timestamp,
        value: entry.Values.InputTemperature,
        // label: reading.Params.InputVolume + " м³"
    }
})

const graphData = readings.map((reading) => {
    return {
        // time: format(new Date(reading.DateTime), 'dd'),
        time: reading.DateTime,
        value: reading.Params.InputVolume,
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

// const formTickValues = (dateArr) => {
//     // const days = dateArr.map((data) => +format(new Date(data.time), 'dd'))
//     const filteredDates = dateArr.filter((date) => {
//         +format(new Date(data.time), 'dd')
//     }
// }

console.log(formTicks(12, 26));



const CustomTooltip = (props) => {

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
                    <VictoryTooltip  {...props}

                    />
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

console.log('valuees',graphData.map((data) => +format(new Date(data.time), 'dd')))

const Graph: React.FC = () => {

    const tooltipRef = useRef();

    useEffect(() => {
        console.log(tooltipRef);
        debugger;

    },[tooltipRef])

    const getTooltip = (d) => {
        debugger;
        const { x, y } = d;
        return `${new Date(x)}\n ${y}`;
    };


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
                // domain={{ x: [0, 28] }}

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
                {/*<VictoryScatter*/}
                {/*    // style={{ data: { fill: "red" }, labels: { fill: "red" } }}*/}
                {/*    data={graphDataNew}*/}
                {/*    // standalone*/}
                {/*/>*/}
                {/*<VictoryArea*/}
                {/*    name="graph"*/}
                {/*    interpolation="natural"*/}
                {/*    labelComponent={<CustomTooltip ref={tooltipRef} flyoutPadding={{top: 8, right: 16, bottom: 38, left: 16}} flyoutStyle={{ fill: "var(--main-100)"}} style={{fill: "#fff", padding: 8}} />}*/}
                {/*    labels={ ({ datum }) => datum.time }*/}
                {/*    // labels={(d) => getTooltip(d)}*/}
                {/*    // style={{ data: { fill: "linear-gradient(180deg, rgba(24, 158, 233, 0.33) 0%, rgba(24, 158, 233, 0) 100%)" } }}*/}
                {/*    style={{ data: { fill: "url(#myGradient)", stroke: "var(--cold-water)", strokeWidth: 2 } }}*/}
                {/*    data={graphDataNew}*/}
                {/*    x="time"*/}
                {/*    y="value"*/}
                {/*/>*/}
                <VictoryArea
                    // domain={{x: [0, 31], y: [60, 100]}}

                    name="graph"
                    interpolation="natural"
                    // labelComponent={<CustomTooltip style={{fill: "var(--main-100)", padding: 8}} />}
                    labelComponent={<CustomTooltip
                        flyoutStyle={{ fill: "var(--main-100)"}} style={{ fill: "#fff" }} flyoutPadding={{top: 8, right: 16, bottom: 8, left: 16}}
                                                     // style={{fill: "var(--main-100)", padding: 8}}
                    />}

                    labels={ ({ datum }) => `${format(new Date(datum.time), 'dd.mm.yyyy')}\n` + `⸻\n` + `${datum.value}м³` }
                    // labels={(d) => getTooltip(d)}
                    // style={{ data: { fill: "linear-gradient(180deg, rgba(24, 158, 233, 0.33) 0%, rgba(24, 158, 233, 0) 100%)" } }}
                    style={{ data: { fill: "url(#myGradient)", stroke: "var(--cold-water)", strokeWidth: 2 } }}
                    // backgroundPadding={[
                    //     3,
                    //     { left: 20, right: 20 },
                    //     { left: 20}
                    // ]}
                    data={graphDataNew}
                    x="time"
                    y="value"
                />



                <VictoryAxis
                    // tickFormat={(time) => format(new Date(time), 'dd')}
                    // tickValues={graphData.map((data) => new Date(data.time))}
                    // tickValues={[11, 12, 15, 20, 25, 28]}
                    // tickFormat={(x) => {const time = format(new Date(x), 'dd'); return (time === '11' || time === '28' || +time % 5 === 0) ? time : ''}}
                    // tickFormat={(x) => {const time = format(new Date(x), 'dd'); return time}}
                    tickFormat={(x) => 1}
                    // tickFormat={(x) => {debugger; return (x === 11 || x === 28 || x % 5 === 0) ? x : ''}}
                    // tickFormat={(x) => 31}
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
