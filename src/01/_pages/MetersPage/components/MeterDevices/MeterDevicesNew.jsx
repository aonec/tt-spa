import React, {useEffect, useState} from "react"
import styled, { css } from "reshadow/macro"

import * as style from "01/r_comp"
import ApartmentDeviceReadingLine from "./components/ApartmentDeviceReadingLine";
import {formReadingToPush} from "../../../../utils/formReadingsToPush";
import axios from "axios";
import {getMonthFromDate, getPreviousMonthFromDate} from "../../../../utils/getMonthFromDate";
import Arrow from "../../../../_components/Arrow/Arrow";
import s from "./MeterDevicesNew.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {selectDevices} from "../../../../Redux/ducks/readings/selectors";
import {setDevices} from "../../../../Redux/ducks/readings/actionCreators";


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
    grid-template-columns: minmax(330px, 1fr) 200px 200px 1fr;    
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


export const MeterDevicesNew = ({ items = [] }) => {

    const [sliderIndex, setSliderIndex] = useState(0)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setDevices(items))
    }, [items])

    const devices = useSelector(selectDevices);

    const sendReadings = (device) => {
        try {
            axios.post('/IndividualDeviceReadings/create', formReadingToPush(device));
        }
        catch(e) {
            throw new Error();
        }
    }

    if (!devices.length) return null

    const readings = devices.map((device) => <ApartmentDeviceReadingLine
        sliderIndex={sliderIndex}
        key={device.id}
        device={device}
        sendReadings={() => sendReadings(device)}
    />);

    const currentMonth = getMonthFromDate()
    const previousMonth = getPreviousMonthFromDate();

    const readingsLength = devices[0].readings?.length;
    const isReadingsCurrent = currentMonth === getMonthFromDate(devices[0].readings[0].readingDate);

    const isRightArrowDisabled = sliderIndex + 1 > readingsLength - +isReadingsCurrent - 1

    const onClickIncrease = () => {
        setSliderIndex((index) => {
            return isRightArrowDisabled
                ? index
                : index + 1
        }
        )
    }

    const isLeftArrowDisabled = sliderIndex - 1 < 0;

    const onClickDecrease = () => {
        setSliderIndex((index) => {
            return isLeftArrowDisabled
                ? index
                : index - 1
        }
        )
    }

    return styled(styles, style.button)(
        <meters>
            <meter_header>
                <span>Информация o приборe</span>

                <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                    {currentMonth}
                </div>
                <div style={{display: 'flex', justifyContent: 'space-around', alignContent: 'center'}}>
                    <div style={{width: 32, height: 32, display: 'flex', justifyContent: 'center', alignItems: 'center'}} onClick={onClickDecrease} className={isLeftArrowDisabled ? s.arrowDisabled : s.arrowEnabled}>
                        <Arrow isDisabled={isLeftArrowDisabled} />
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>{previousMonth}</div>
                    <div style={{width: 32, height: 32, display: 'flex', justifyContent: 'center', alignItems: 'center'}} className={isRightArrowDisabled ? s.arrowDisabled : s.arrowEnabled} isRight onClick={onClickIncrease}>
                        <Arrow isRight isDisabled={isRightArrowDisabled} />
                    </div>
                </div>

            </meter_header>
            {readings}
        </meters>
    )
}
