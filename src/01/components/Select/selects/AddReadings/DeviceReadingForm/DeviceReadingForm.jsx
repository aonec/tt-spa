import React, {useEffect, useState} from 'react';
import rateTypeToNumber from "../../../../../_api/utils/rateTypeToNumber";
import styled from 'styled-components'
import DeviceRates from "./ReadingsLine/DeviceRates";
import DeviceIcons from "../../../../../_components/DeviceIcons";
import styles from "../../../../../_pages/Devices/components/TabsDevices.module.scss";
import {Icon} from "../../../../../tt-components/Icon";
import {setDevices, updateReadings} from "../readingsReducer";
import ActiveLine from "./ActiveLine/ActiveLine";
import transformDate from "../../../../../utils/transformDate";

const FullDeviceLine = styled.div`
    display: grid;
    grid-template-columns: minmax(250px, 300px) auto minmax(300px, 350px);
    column-gap: 10px;
    margin-bottom: 8px;
    align-items: center;
    justify-content: flex-start;
    white-space: nowr
    padding-bottom: 7px;
    border-bottom: 1px solid #DCDEE4;
    `

let ReadingLineStyled = styled.div`
display: flex;
border: 1px solid #DCDEE4;
`

const Label = styled.label`
display: flex;
min-width: 60px;
`

const DeviceReadingForm = ({device, dispatch, readingsBlocked}) => {

    const [readingsState, setReadingsState] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const isActive = device.closingDate === null;

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


        setReadingsState({readingsArray, id: readings.id })
        setIsLoading(false);
    }, [device.readings, numberOfReadings, readingsBlocked])

    const onInputChange = (e, index) => {
        e.preventDefault();
        // readingsArray[index] = e.target.value;
        // let newState = [...readingsState];
        // newState[index] = e.target.value;
        dispatch(updateReadings(device.id, index+1, e.target.value));
    }

    if (isLoading) return 'ЗАГРУЗКА...'

    const deviceReadingsLine = readingsState.readingsArray.map((value, index) => (
        <DeviceRates key={readingsState.id + index}
                     index={index}
                     readingsBlocked={readingsBlocked || !isActive}
                     onChange={(e) => onInputChange(e, index)}
                     value={value}/>
    ));


    const { icon, color } = DeviceIcons[device.resource];


    return (
        <FullDeviceLine>
                <span
                    className={styles.device__title + ' ' + styles.subdevice__title}
                    to={`/housingMeteringDevices/${device.id}`}
                >
                    <Icon className={styles.icon} icon={icon} fill={color} />
                    {`${device.model} `}
                    <span className={styles.deviceId}>
                            {` (${device.serialNumber})`}
                    </span>
                </span>
            <div style={{display: 'flex'}}>{deviceReadingsLine}</div>
            <div style={{display: 'flex'}}>
                <ActiveLine isActive={isActive}/>
                <div style={{fontWeight: 400, color: 'rgba(39, 47, 90, 0.6)'}}>{transformDate(device.lastCheckingDate)} — {transformDate(device.futureCheckingDate)}</div>
            </div>
        </FullDeviceLine>
    )
}

export default DeviceReadingForm;