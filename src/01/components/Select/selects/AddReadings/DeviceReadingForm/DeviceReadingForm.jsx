import React, {useEffect, useState, useRef} from 'react';
import rateTypeToNumber from "../../../../../_api/utils/rateTypeToNumber";
import styled from 'styled-components'
import DeviceRates from "./ReadingsLine/DeviceRates";
import DeviceIcons from "../../../../../_components/DeviceIcons";
import styles from "../../../../../_pages/Devices/components/TabsDevices.module.scss";
import {Icon} from "../../../../../tt-components/Icon";
// import {setDevices, updateReadings} from "../../../../../Redux/reducers/readingsReducer";
import ActiveLine from "./ActiveLine/ActiveLine";
import {DateLine} from "../../../../../_components/DateLine/DateLine";
import DeviceRatesVertical
    from "../../../../../_pages/MetersPage/components/MeterDevices/components/DeviceRatesVertical";
import {updateReadings} from "../../../../../Redux/ducks/readings/actionCreators";
import {useDispatch} from "react-redux";

const FullDeviceLine = styled.div`
    display: grid;
    grid-template-columns: minmax(250px, 3fr) 230px 3fr;
    column-gap: 10px;
    margin-bottom: 8px;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    padding-bottom: 7px;
    border-bottom: 1px solid #DCDEE4;
    `

export const DeviceReadingsContainer = styled.div`
display: flex;
flex-direction: column;
border-radius: 4px;
border: 1px solid var(--frame);
padding: 8px
`

const DeviceReadingForm = ({device, readingsBlocked = false}) => {

    const dispatch = useDispatch();

    const [readingsState, setReadingsState] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const isActive = device.closingDate === null;
    const ref = useRef();
    const numberOfReadings = rateTypeToNumber(device.rateType);
    // const readingsArray = [];
    // setReadingsState({readingsArray: [45, 66, 1243], id: 100});

    useEffect(() => {
        setIsLoading(true)
        const readingsArray = [];
        const readings = device.readings[0];

        for (let i=1; i <= numberOfReadings; i++) {
            readingsArray.push(readings[`value${i}`])
        }


        setReadingsState({ readingsArray, id: readings.id, resource: device.resource })
        setIsLoading(false);
    }, [device.readings, numberOfReadings, readingsBlocked])

    const onInputChange = (e, index) => {
        e.preventDefault();
        dispatch(updateReadings(device.id, index+1, e.target.value));
    }

    if (isLoading) return 'ЗАГРУЗКА...'

    const deviceReadingsLine = readingsState.readingsArray.map((value, index) => (
        <DeviceRatesVertical key={readingsState.id + index}
                     index={index}
                     readingsBlocked={readingsBlocked || !isActive}
                     onChange={(e) => onInputChange(e, index)}
                     value={value}
                     resource={readingsState.resource}
        />
    ));


    const { icon, color } = DeviceIcons[device.resource];


    return (
        <FullDeviceLine>
                <div
                    className={styles.device__title + ' ' + styles.subdevice__title}
                    to={`/housingMeteringDevices/${device.id}`}
                >
                    <Icon className={styles.icon} icon={icon} fill={color} />
                    {`${device.model} `}
                    <span className={styles.deviceId}>
                            {` (${device.serialNumber})`}
                    </span>
                </div>
            <DeviceReadingsContainer>{deviceReadingsLine}</DeviceReadingsContainer>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <ActiveLine isActive={isActive}/>
                <DateLine lastCheckingDate={device.lastCheckingDate} futureCheckingDate={device.futureCheckingDate}/>
            </div>
        </FullDeviceLine>
    )
}

export default DeviceReadingForm;