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
import {useReadings} from "../../../../../hooks/useReadings";
import moment from "moment";
import axios from "01/axios"
import {isNullInArray} from "../../../../../utils/checkArrayForNulls";
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

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

export const DeviceReadingsContainer = styled.div`
display: flex;
flex-direction: column;
border-radius: 4px;
border: 1px solid var(--frame);
padding: 8px
`





const OperatorDeviceReadingForm = ({device, sliderIndex}) => {

    const [readingsState, setReadingsState] = useState({});

    const [initialReadings, setInitialReadings] = useState();

    const textInput = React.createRef();

    const onDelete = async () => {
        await setReadingsState((state) => ({
            ...state,
            currentReadingsArray: initialReadings
        }));
        textInput.current.focus()
    }
// setReadingsState((state) => ({
    //     ...state,
    //     currentReadingsArray: state.currentReadingsArray.map((reading) => 0
    //     )
    // }))
    // if (isNullInArray(readingsState.currentReadingsArray)) return

     const showConfirm = () => {
        confirm({
                title: 'Вы действительно хотите уйти без сохранения?',
                icon: <ExclamationCircleOutlined/>,
                content: 'Вы внесли не все показания, если вы покинете старницу, то все изменения, которые были сделаны вами на этой странице не сохранятся',
                onOk() {
                    setReadingsState((state) => ({
                        ...state,
                        currentReadingsArray: initialReadings
                    }))
                },
                onCancel() {
                        setReadingsState((state) => ({
                            ...state,
                            currentReadingsArray: initialReadings
                        }));
                    // textInput.current.focus()
                }
            }
        )





                // return new Promise((resolve, reject) => {
                //
                //         setReadingsState((state) => ({
                //             ...state,
                //             currentReadingsArray: initialReadings
                //         }));
                //         resolve(1)
                //
                // }).then(() => textInput.current.focus());

        }

    useEffect(() => {
        if (textInput.current) textInput.current.focus()

    }, [readingsState])


    const isActive = device.closingDate === null;



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

    const formDeviceReadingObject = (deviceItem) => {
        return ({
            deviceId: deviceItem.id,
            value1: +readingsState.currentReadingsArray[0],
            readingDate: moment().toISOString(),
            uploadTime: moment().toISOString(),
            isForced: true
        })
    }

    const sendReadings = (deviceItem) => {
        const deviceReadingObject = formDeviceReadingObject(deviceItem)
        for (let i = 1; i < 4; i++) {
            if (+readingsState.currentReadingsArray[i]) {
                deviceReadingObject[`value${i+1}`] = +readingsState.currentReadingsArray[i]
            }
        }
        axios.post('/IndividualDeviceReadings/create', deviceReadingObject);
        setInitialReadings(readingsState.currentReadingsArray)
    }

    const currentDeviceReadings = readingsState.currentReadingsArray.map((value, index) => (
        <DeviceRatesVertical key={readingsState.id || device.id + index}
                     index={index}
                     onChange={(e) => onInputChange(e, index)}
                     value={value}
                     resource={readingsState.resource}
                     sendReadings={() => sendReadings(device)}
                     operatorCabinet
                     textInput={textInput}
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

    const onBlurHandler = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            const isNull = isNullInArray(readingsState.currentReadingsArray)
            if (isNull) {
                showConfirm();
            } else {
                if (readingsState.currentReadingsArray === initialReadings) return
                sendReadings(device)
            }
        }
    }

    const onFocusHandler = () => {
    debugger;
        setInitialReadings(readingsState.currentReadingsArray);
    }


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
            <DeviceReadingsContainer onBlur={onBlurHandler} onFocus={onFocusHandler}>{currentDeviceReadings}</DeviceReadingsContainer>
            <DeviceReadingsContainer>{previousDeviceReadings}</DeviceReadingsContainer>


        </FullDeviceLine>
    )
}

export default OperatorDeviceReadingForm;