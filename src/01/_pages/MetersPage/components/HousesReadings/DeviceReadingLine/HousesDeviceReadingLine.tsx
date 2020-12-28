import React, {useEffect, useState} from "react"
import styled from "styled-components";
import {IndividualDeviceType} from "../../../../../../types/types";
import rateTypeToNumber from "../../../../../_api/utils/rateTypeToNumber";
import DeviceRatesVertical from "../../MeterDevices/components/DeviceRatesVertical";
import { DeviceReadingsContainer } from "01/components/Select/selects/AddReadings/DeviceReadingForm/DeviceReadingForm";
import axios from "axios";
import {formReadingToPush} from "../../../../../utils/formReadingsToPush";
import {updateReadings} from "../../../../../components/Select/selects/AddReadings/readingsReducer";
import DeviceIcons from "../../../../../_components/DeviceIcons";
import {Icon} from "../../../../../_components/Icon";
import styles from "../../../../Devices/components/TabsDevices.module.scss";
import {useReadings} from "../../../../../hooks/useReadings";
import moment from "moment";
import {isNullInArray} from "../../../../../utils/checkArrayForNulls";
import ButtonTT from "../../../../../tt-components/ButtonTT";
import {Modal} from "antd";
import uuid from 'react-uuid'


const HouseReadingsDevice = styled.div`
display: grid;
// grid-template-columns: 1fr 2.5fr 0.2fr 2fr 1.9fr 1.9fr 1.6fr 1.2fr;
grid-template-columns: minmax(0, 1fr) minmax(0, 3fr) minmax(0, 0.3fr) minmax(0, 1.8fr) minmax(0, 1.7fr) minmax(0, 1.7fr) minmax(0, 1fr) minmax(0, 1.5fr);


// grid-template-columns: 1fr 3fr 0.5fr 2fr 2fr 1.5fr repeat(2, 100px);
// grid-template-columns: minmax(0, 1fr) minmax(0, 3fr) minmax(0, 0.5fr) minmax(0, 2fr) minmax(0, 2fr) minmax(0, 1.5fr) minmax(0, 1fr) minmax(0, 1.5fr);
// 1fr 3fr 0.5fr 2fr 2fr 100px 1fr 1.5fr;

column-gap: 16px;
color: var(--main-90);
border-bottom: 1px solid var(--frame);
padding: 16px;
align-items: baseline;
min-height: 95px;
`

const Column = styled.div`
display: flex;
flex-direction: column;
`

const OwnerName = styled.div`
color: var(--main-100);
font-weight: 500;
font-size: 16px;
`

const AccountNumber = styled.div`
color: var(--main-70);
font-size: 12px;
line-height: 16px;
`

const Consumption = styled.div`
&:not(:last-child) {
    padding-bottom: 16px
}
`

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

type ReadingsArray = Array<number>
type ReadingsStateType = {
    previousReadingsArray: ReadingsArray
    currentReadingsArray: ReadingsArray
    prevId: number
    currId: number
    resource: string
}
type Props = {
    device: IndividualDeviceType
}

export const HousesDeviceReadingLine:React.FC<Props> = React.memo(({device, disabledState, setDisabledState}) => {
    const [consumptionState, setConsumptionState] = useState([] as Array<number>)

    const numberOfReadings: number = rateTypeToNumber(device.rateType);

        const isDisabled = disabledState.find((el) => el.deviceId === device.id).isDisabled;

        const [isVisible, setIsVisible] = useState(false);

        const [readingsState, setReadingsState] = useState({} as ReadingsStateType);

        const [isCancel, setIsCancel] = useState(false)

        const [initialReadings, setInitialReadings] = useState();

        const textInput = React.createRef();

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
            setReadingsState((state) => ({
                ...state,
                currentReadingsArray: initialReadings
            }));
            setIsCancel(true);
            setIsVisible(false)
        }

        const afterCloseHandler = () => {
            if (isCancel) {
                setIsCancel(false)
                textInput.current.focus()
            }
        }


        useReadings(device, setReadingsState);

        useEffect(() => {
            const currentReadings = readingsState?.currentReadingsArray || {}
            const previousReadings = readingsState?.previousReadingsArray || {}
            let consumptionArray = Array.from({length: numberOfReadings}, (v, i) => i)
            const consumption = consumptionArray.map((value, index) => {
                return +currentReadings[index] - +previousReadings[index] > 0 ?
                    +currentReadings[index] - +previousReadings[index] : 0

                // return +currentReadings[index] - +previousReadings[index]
            })

            setConsumptionState(consumption)
        }, [readingsState])

        if (!readingsState.currentReadingsArray?.length) return null

        const consumptionElems = consumptionState.map((el, index) => {
            return <Consumption key={uuid()}>{el} кВтч</Consumption>
        })

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

        const onInputChange = (e:React.ChangeEvent<HTMLInputElement>, index: number) => {
            e.preventDefault();
            setReadingsState((state) => ({
                ...state,
                currentReadingsArray: state.currentReadingsArray.map((reading, i): number => {
                        return i === index ? +e.target.value : reading
                    }
                )

            }))
        }

        const onBlurHandler = (e) => {
            if (e.currentTarget.contains(e.relatedTarget)) return
                const isNull = isNullInArray(readingsState.currentReadingsArray)
                if (isNull) {
                    setIsVisible(true);
                } else {
                    if (readingsState.currentReadingsArray !== initialReadings) {
                        sendReadings(device)
                    }
                    setDisabledState((prevState) => prevState.map((el) => ( {...el, isDisabled: false } )));
                }
            }



        const onFocusHandler = (e) => {
            if (e.currentTarget.contains(e.relatedTarget)) return

            setInitialReadings(readingsState.currentReadingsArray);
            const isNull = isNullInArray(readingsState.currentReadingsArray)
            if (isNull) {
                setDisabledState((prevState) => prevState.map((el) => {
                    return el.deviceId === device.id
                        ? {...el, isDisabled: false}
                        : {... el, isDisabled: true}
                }))
            }
        }


            const currentDeviceReadings = readingsState.currentReadingsArray.map((value, index) => (
            <DeviceRatesVertical key={device.id + index}
                                 index={index}
                                 onChange={(e:React.ChangeEvent<HTMLInputElement>) => onInputChange(e, index)}
                                 value={value}
                                 resource={readingsState.resource}
                                 sendReadings={sendReadings}
                                 operatorCabinet
                                 houseReadings
                                 textInput={textInput}
                                 isDisabled={isDisabled}
            />
        ));

        const previousDeviceReadings = readingsState.previousReadingsArray.map((value, index) => (
            <DeviceRatesVertical key={uuid()}
                                 index={index}
                                 // onChange={(e) => onInputChange(e, index)}
                                 value={value}
                                 resource={readingsState.resource}
                                 operatorCabinet
                                 readingsBlocked
                                 houseReadings
            />
        ));







        const { icon, color } = DeviceIcons[device.resource];


        return (
        <HouseReadingsDevice>
            <div>{device.apartmentNumber}</div>
            <Column>
                <OwnerName>{device.homeownerName}</OwnerName>
                <div>{device.personalAccountNumber}</div>
            </Column>

                <div style={{position: 'relative', top: 5}}>
                    <Icon className={styles.icon} icon={icon} fill={color}/>
                </div>

            <Column>
                <div>{device.model}</div>
                <div>{device.serialNumber}</div>
            </Column>
            <DeviceReadingsContainer>{previousDeviceReadings}</DeviceReadingsContainer>
            <DeviceReadingsContainer isDisabled={isDisabled} onBlur={onBlurHandler} onFocus={onFocusHandler}>{currentDeviceReadings}</DeviceReadingsContainer>
            <div>{consumptionElems}</div>
            <div>-</div>

            <StyledModal
                visible={isVisible}
                title={<Header>Вы действительно хотите уйти без сохранения?</Header>}
                onOk={handleOk}
                onCancel={handleCancel}
                afterClose={afterCloseHandler}
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
        </HouseReadingsDevice>
    )
}
)
