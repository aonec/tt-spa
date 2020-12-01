import React, {useEffect, useState} from "react"
import styled, { css } from "reshadow/macro"

import * as style from "01/r_comp"
import { Icon } from "01/components"
import DeviceReadingForm from "../../../../components/Select/selects/AddReadings/DeviceReadingForm/DeviceReadingForm";
import readingsReducer, {setDevices} from "../../../../components/Select/selects/AddReadings/readingsReducer";
import OperatorDeviceReadingForm from "./components/OperatorDeviceReadingForm";
import {formReadingsToPush, formReadingToPush} from "../../../../utils/formReadingsToPush";
import axios from "axios";

const styles = css`
  meter_header,
  meter_device {
    padding: 8px;
    display: grid;
    grid-template-columns: 2fr repeat(2, 1fr) minmax(max-content, auto);
    grid-column-gap: 16px;
    border-bottom: 1px solid var(--frame);
  }

  meter_header {
    height: 48px;
    background: var(--bg);
    align-items: center;
    color: var(--main-80);
  }

  device_info {
    display: grid;
    grid-gap: 16px;
    align-content: center;
    & h4,
    & row {
      display: inline-flex;
      align-items: center;
    }
    & h4 {
      line-height: 1;
    }
    & d_model {
      margin: 0 8px;
    }
    & d_number {
      font-weight: 400;
    }

    & time {
      margin: 0 16px;
    }

    & d_number,
    & time,
    & place {
      opacity: 0.6;
    }
    & d_status {
      opacity: 0.8;
      display: inline-flex;
      align-items: center;
      &::before {
        content: "";
        display: inline-flex;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        margin-right: 8px;
        background: var(--success);
      }
    }
  }

  input_meter {
    display: grid;
    place-content: center;
    border-radius: 4px;
    border: 1px solid var(--frame);
    padding: 8px;

    & row {
      display: inline-grid;
      grid-template-columns: 1fr 1.5fr;
      padding: 8px;
    }

    & row:first-child {
      border-bottom: 1px solid var(--frame);
    }
    & tarif {
      opacity: 0.6;
    }
  }

  div {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-gap: 8px;
    align-content: start;
    align-items: center;
    padding: 8px;
    & button {
      padding: 8px;
    }
    & span {
      display: contents;
      cursor: pointer;
    }
  }
`

const ReadingsContext = React.createContext()

export const MeterDevicesNew = ({items = []}) => {
    const [isLoading, setIsLoading] = useState(true);


    const [state, dispatch] = React.useReducer(readingsReducer, {});

    useEffect(() => {
        dispatch(setDevices(items))
    }, [items])


    const sendReadings = (device) => {
        // const json = JSON.stringify(formReadingToPush(device))
        axios.post('/IndividualDeviceReadings/create', formReadingToPush(device))
    }

    if (!state.devices?.length) return null

    // let sendReadings = (devices) => {
    //     const readingsToPush = formReadingsToPush(devices);
    //     axios.post('IndividualDeviceReadings/create', readingsToPush)
    // }

    const readings = state.devices.map((device, index) => <OperatorDeviceReadingForm key={device.id} device={device} dispatch={dispatch}
                                                                              sendReadings={() => sendReadings(device)}
    />)

    return styled(styles, style.button)(
            <meters>
                <meter_header>Информация o приборe</meter_header>
                {readings}
            </meters>
            )
            }
