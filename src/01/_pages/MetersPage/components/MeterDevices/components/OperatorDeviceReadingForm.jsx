import React, {useEffect, useState} from 'react';
import {updateReadings} from "../../../../../components/Select/selects/AddReadings/readingsReducer";
import DeviceRates
    from "../../../../../components/Select/selects/AddReadings/DeviceReadingForm/ReadingsLine/DeviceRates";
import ActiveLine from "../../../../../components/Select/selects/AddReadings/DeviceReadingForm/ActiveLine/ActiveLine";
import {DateLine} from "../../../../../_components/DateLine/DateLine";
import {Icon} from "../../../../../_components/Icon";
import rateTypeToNumber from "../../../../../_api/utils/rateTypeToNumber";
import styled from 'styled-components'
import DeviceIcons from "../../../../../_components/DeviceIcons";
import styles from "../../../../../_pages/Devices/components/TabsDevices.module.scss";
import {translateMountPlace} from "../../../../../utils/translateMountPlace";
import Arrow from "../../../../../_components/Arrow/Arrow";
import DeviceRatesVertical from "./DeviceRatesVertical";
import {DeviceReadingsContainer} from "../../../../../components/Select/selects/AddReadings/DeviceReadingForm/DeviceReadingForm";
import {useReadings} from "../../../../../hooks/useReadings";
import moment from "moment";
import axios from "01/axios"

const FullDeviceLine = styled.div`
    display: grid;
    grid-template-columns: minmax(330px, 1fr) minmax(160px, 1fr) minmax(160px, 1fr) 1fr;
    column-gap: 16px;
    margin-top: 8px;
    align-items: center;
    justify-content: flex-start;
    white-space: nowrap;
    padding: 8px 8px 16px;
    border-bottom: 1px solid #DCDEE4;
    `




const OperatorDeviceReadingForm = ({device, sliderIndex}) => {
    const [isLoading, setIsLoading] = useState(true);

    const isActive = device.closingDate === null;

    const [readingsState, setReadingsState] = useState({});

    useReadings(device, setReadingsState, sliderIndex);



    if (!readingsState.currentReadingsArray?.length) return 'ЗАГРУЗКА...'



    const onInputChange = (e, index) => {
        e.preventDefault();
        setReadingsState((state) => ({
            ...state,
                currentReadingsArray: state.currentReadingsArray.map((reading, i) => {
                   return i === index ? e.target.value : reading
                }
            )

        }))
    }

    const sendReadings = () => {
        const deviceReadingObject = {
            deviceId: device.id,
            value1: +readingsState.currentReadingsArray[0],
            readingDate: moment().toISOString(),
            uploadTime: moment().toISOString(),
            isForced: true
        }
        for (let i = 1; i < 4; i++) {
            if (+readingsState.currentReadingsArray[i]) {
                deviceReadingObject[`value${i+1}`] = +readingsState.currentReadingsArray[i]
            }
        }
        axios.post('/IndividualDeviceReadings/create', deviceReadingObject);
    }

    const currentDeviceReadings = readingsState.currentReadingsArray.map((value, index) => (
        <DeviceRatesVertical key={readingsState.id || device.id + index}
                     index={index}
                     onChange={(e) => onInputChange(e, index)}
                     value={value}
                     resource={readingsState.resource}
                     sendReadings={sendReadings}
                     operatorCabinet
        />
    ));

    const previousDeviceReadings = readingsState.previousReadingsArray.map((value, index) => (
        <DeviceRatesVertical key={readingsState.id || device.id + index}
                     index={index}
                     onChange={(e) => onInputChange(e, index)}
                     value={value}
                     resource={readingsState.resource}
                     operatorCabinet
                     readingsBlocked
        />
    ));


    const { icon, color } = DeviceIcons[device.resource];


    return (
        <FullDeviceLine>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div
                    className={styles.device__title}
                    to={`/housingMeteringDevices/${device.id}`}
                >
                    <Icon className={styles.icon} icon={icon} fill={color}/>
                    {`${device.model} `}
                    <span className={styles.deviceId}>
                            {` (${device.serialNumber})`}
                    </span>
                </div>
                <div style={{display: 'flex'}}>
                    <ActiveLine isActive={isActive}/>
                    <DateLine lastCheckingDate={device.lastCheckingDate}
                              futureCheckingDate={device.futureCheckingDate}/>
                    <div style={{
                        marginLeft: 16,
                        color: 'rgba(39, 47, 90, 0.6)'
                    }}>{translateMountPlace(device.mountPlace)}</div>
                </div>
            </div>
            <DeviceReadingsContainer>{currentDeviceReadings}</DeviceReadingsContainer>
            <DeviceReadingsContainer>{previousDeviceReadings}</DeviceReadingsContainer>


        </FullDeviceLine>
    )
}

export default OperatorDeviceReadingForm;