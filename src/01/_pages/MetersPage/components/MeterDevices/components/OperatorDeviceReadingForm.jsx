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
import ButtonTT from "../../../../../tt-components/ButtonTT";

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
    border-bottom: 1px solid #DCDEE4
    `;

const Footer = styled.div`
background-color: var(--bg);
height: 96px;
display: flex;
justify-content: flex-end;
align-items: center;
padding-right: 32px;
font-weight: 700;
`

const Header = styled.h1`
  font-size: 32px;
  line-height: 1.5;
  font-weight: 300;
  margin: 0;
`

export const DeviceReadingsContainer = styled.div`
display: flex;
flex-direction: column;
border-radius: 4px;
border: 1px solid var(--frame);
padding: 8px 
`;

const StyledModal = styled(Modal)`

.ant-modal-header {
  padding: 24px 32px;
  border: 0;
}

.ant-modal-body {
  padding: 0 32px 32px 32px;
}

.ant-modal-footer {
  padding: 0;
}

.ant-modal-close-x {
  fill: var(--main-100)
}

.ant-modal-footer button + button {
    margin-bottom: 0;
    margin-left: 16px;
}

`





const OperatorDeviceReadingForm = ({device, sliderIndex, disabledState, setDisabledState}) => {

    const isDisabled = disabledState.find((el) => el.deviceId === device.id).isDisabled;

    const [isVisible, setIsVisible] = useState(false);

    const [readingsState, setReadingsState] = useState({});

    const [isCancel, setIsCancel] = useState(false)

    const [initialReadings, setInitialReadings] = useState();

    const textInput = React.createRef();

    const onDelete = async () => {
        await setReadingsState((state) => ({
            ...state,
            currentReadingsArray: initialReadings
        }));
        textInput.current.focus()
    }

     const handleOk = () => {
         setReadingsState((state) => ({
             ...state,
             currentReadingsArray: initialReadings
         }));
         setDisabledState((prevState) => prevState.map((el) => {
             return el.deviceId === device.id
                 ? {...el, isDisabled: false}
                 : {... el, isDisabled: false}
         }))
         setIsVisible(false)
     }

     const handleCancel = () => {
         setIsCancel(true);
         setReadingsState((state) => ({
             ...state,
             currentReadingsArray: initialReadings
         }));
         setDisabledState((prevState) => prevState.map((el) => {
             return el.deviceId === device.id
                 ? {...el, isDisabled: false}
                 : {... el, isDisabled: false}
         }))
         setIsVisible(false)
     }

     const afterCloseHandler = () => {
         setDisabledState((prevState) => prevState.map((el) => {
             return el.deviceId === device.id
                 ? {...el, isDisabled: false}
                 : {... el, isDisabled: false}
         }))
     }
    //
    useEffect(() => {
        // if (textInput.current) textInput.current.focus()

        if (isCancel) {
            textInput.current.focus()
            setIsCancel(false)
        }

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
                     isDisabled={isDisabled}
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
        debugger;
        if (!e.currentTarget.contains(e.relatedTarget)) {
            const isNull = isNullInArray(readingsState.currentReadingsArray)
            if (isNull) {
                setIsVisible(true);
            } else {
                if (readingsState.currentReadingsArray !== initialReadings) {
                    sendReadings(device)

                }
                setDisabledState((prevState) => prevState.map((el) => {
                    return el.deviceId === device.id
                        ? {...el, isDisabled: false}
                        : {... el, isDisabled: false}
                }))

                }
            }

    }

    const onFocusHandler = () => {
        setInitialReadings(readingsState.currentReadingsArray);
        setDisabledState((prevState) => prevState.map((el) => {
            return el.deviceId === device.id
            ? {...el, isDisabled: false}
            : {... el, isDisabled: true}
        }))
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


            <StyledModal
                visible={isVisible}
                title={<Header>Вы действительно хотите уйти без сохранения?</Header>}
                onOk={handleOk}
                onCancel={handleCancel}
                // afterClose={afterCloseHandler}
                width={800}
                footer={
                    <Footer>
                        <ButtonTT color={'white'} key="back" onClick={handleCancel}>
                            Отмена
                        </ButtonTT>
                        <ButtonTT color={'red'} key="submit" onClick={handleOk}>
                            Выйти без сохранения
                        </ButtonTT>
                    </Footer>
                }
            >
                <p style={{color: 'var(--main-100)', margin: 0}}>
                    Вы внесли не все показания, если вы покинете старницу, то все изменения, которые были сделаны вами на этой странице не сохранятся
                </p>
            </StyledModal>

        </FullDeviceLine>
    )
}

export default OperatorDeviceReadingForm;