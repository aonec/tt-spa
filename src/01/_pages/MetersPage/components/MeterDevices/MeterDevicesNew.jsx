import React, {useEffect, useState} from "react"
import styled, { css } from "reshadow/macro"

import * as style from "01/r_comp"
import { Icon } from "01/components"
import DeviceReadingForm from "../../../../components/Select/selects/AddReadings/DeviceReadingForm/DeviceReadingForm";
import readingsReducer, {setDevices} from "../../../../components/Select/selects/AddReadings/readingsReducer";
import OperatorDeviceReadingForm from "./components/OperatorDeviceReadingForm";
import {formReadingsToPush, formReadingToPush} from "../../../../utils/formReadingsToPush";
import axios from "axios";
import moment from 'moment';
import {getMonthFromDate} from "../../../../utils/getMonthFromDate";
import Arrow from "../../../../_components/Arrow/Arrow";

// meter_header,


const styles = css`
  meters {
      grid-template-columns: minmax(250px, 350px) auto minmax(300px, 350px);
  }
  
  meter_device {
    padding: 8px;
    display: grid;
    grid-template-columns: 2fr repeat(2, 1fr) minmax(max-content, auto);
    grid-column-gap: 16px;
    border-bottom: 1px solid var(--frame);
  }

 meter_header {
    display: grid;
    grid-template-columns: minmax(330px, 1fr) minmax(160px, 1fr) minmax(160px, 1fr) 1fr;    
    border-bottom: 1px solid var(--frame);
    padding: 8px;
    column-gap: 16px;
    height: 48px;
    background: var(--bg);
    align-items: center;
    color: var(--main-90);
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
`

export const MeterDevicesNew = ({items = []}) => {


    const [state, dispatch] = React.useReducer(readingsReducer, {});

    useEffect(() => {
        dispatch(setDevices(items))
    }, [items])


    const sendReadings = (device) => {
        try {
            axios.post('/IndividualDeviceReadings/create', formReadingToPush(device));
        }
        catch(e) {
            throw new Error();
        }
    }

    if (!state.devices?.length) return null

    const readings = state.devices.map((device, index) => <OperatorDeviceReadingForm
        key={device.id}
        device={device}
        dispatch={dispatch}
        sendReadings={() => sendReadings(device)}
    />);

    const lastMonth = getMonthFromDate(state.devices[0].readings[0]?.uploadTime)
    const previousMonth = getMonthFromDate(state.devices[0].readings[1]?.uploadTime)

    // const month = state.devices[0].readings[0].uploadTime.toLocaleString('default', { month: 'long' });

    // console.log(moment("2027-06-01T02:00:00").format('MMMM'))

    return styled(styles, style.button)(
            <meters>
                <meter_header>
                    <span>Информация o приборe</span>

                        <div>{lastMonth}</div>
                        <div style={{display: 'flex', justifyContent: 'space-around', alignContent: 'center'}}>
                            <Arrow />
                            <div>{previousMonth}</div>
                            <Arrow isRight />
                        </div>

                </meter_header>
                {readings}
            </meters>
            )
            }
