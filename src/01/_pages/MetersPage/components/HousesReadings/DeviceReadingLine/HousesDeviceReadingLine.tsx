import React, {useEffect, useState} from "react"
import styled from "styled-components";
import {IndividualDeviceType} from "../../../../../../types/types";
import rateTypeToNumber from "../../../../../_api/utils/rateTypeToNumber";
import DeviceRatesVertical from "../../MeterDevices/components/DeviceRatesVertical";
import { DeviceReadingsContainer } from "01/components/Select/selects/AddReadings/DeviceReadingForm/DeviceReadingForm";
import axios from "axios";
import DeviceIcons from "../../../../../_components/DeviceIcons";
import {Icon} from "../../../../../_components/Icon";
import styles from "../../../../Devices/components/TabsDevices.module.scss";
import {useReadings} from "../../../../../hooks/useReadings";
import moment from "moment";
import {isNullInArray} from "../../../../../utils/checkArrayForNulls";
import ButtonTT from "../../../../../tt-components/ButtonTT";
import {Input, Modal} from "antd";
import uuid from 'react-uuid'
import {useDispatch, useSelector} from "react-redux";
import {selectDisabledState} from "../../../../../Redux/ducks/readings/selectors";
import {setInputFocused, setInputUnfocused} from "01/Redux/ducks/readings/actionCreators";



export const HousesDeviceReadingLine:React.FC<Props> = React.memo(({device}) => {
        const [consumptionState, setConsumptionState] = useState([] as Array<number>)

        const numberOfReadings: number = rateTypeToNumber(device.rateType);

        const dispatch = useDispatch();

        const disabledState = useSelector(selectDisabledState);

        const isDisabled = disabledState?.find((el) => el.deviceId === device.id)?.isDisabled

        const [isVisible, setIsVisible] = useState(false);

        const [readingsState, setReadingsState] = useState({} as ReadingsStateType);

        const [isCancel, setIsCancel] = useState(false)

        const [initialReadings, setInitialReadings] = useState<ReadingsArray>([]);

        const textInput = React.createRef<Input>();

        const handleOk = () => {
            setReadingsState((state) => ({
                ...state,
                currentReadingsArray: initialReadings
            }));
            dispatch(setInputUnfocused())
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
                textInput.current!.focus()
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

        const formDeviceReadingObject = (deviceItem:IndividualDeviceType) => {
            return ({
                deviceId: deviceItem.id,
                value1: +readingsState.currentReadingsArray[0],
                readingDate: moment().toISOString(),
                uploadTime: moment().toISOString(),
                isForced: true
            })
        }

        const sendReadings = (deviceItem: IndividualDeviceType) => {
            const deviceReadingObject:{ [index:string] : number | string | boolean } = formDeviceReadingObject(deviceItem)
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

        const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
            if (e.currentTarget.contains(e.relatedTarget as Node)) return
            const isNull = isNullInArray(readingsState.currentReadingsArray)
            if (isNull) {
                setIsVisible(true);
            } else {
                if (readingsState.currentReadingsArray !== initialReadings) {
                    sendReadings(device)
                }
                dispatch(setInputUnfocused())
            }
        }

        const onFocusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
            if (e.currentTarget.contains(e.relatedTarget as Node)) return

            setInitialReadings(readingsState.currentReadingsArray);
            const isNull = isNullInArray(readingsState.currentReadingsArray)
            if (isNull) {
                dispatch(setInputFocused(device.id))
            }
        }


        const currentDeviceReadings = readingsState.currentReadingsArray.map((value, index) => (
            <DeviceRatesVertical key={device.id + index}
                                 index={index}
                                 onChange={(e:React.ChangeEvent<HTMLInputElement>) => onInputChange(e, index)}
                                 value={value}
                                 resource={readingsState.resource}
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
                                 isDisabled
            />
        ));

        const { icon, color } = DeviceIcons[device.resource];


        return (
            <HouseReadingsDevice>
                <div><Span>{device.apartmentNumber}</Span></div>
                <Column>
                    <OwnerName><Span>{device.homeownerName}</Span></OwnerName>
                    <div>{device.personalAccountNumber}</div>
                </Column>

                <div style={{position: 'relative', top: 5}}>
                    <Icon className={styles.icon} icon={icon} fill={color}/>
                </div>

                <Column>
                    <div><Span>{device.model}</Span></div>
                    <div>{device.serialNumber}</div>
                </Column>
                <DeviceReadingsContainer>{previousDeviceReadings}</DeviceReadingsContainer>
                <DeviceReadingsContainer onBlur={onBlurHandler} onFocus={onFocusHandler}>{currentDeviceReadings}</DeviceReadingsContainer>
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

const HouseReadingsDevice = styled.div`
display: grid;
grid-template-columns: 32px minmax(180px, 240px) 16px minmax(152px, 232px) minmax(120px, 160px) minmax(120px, 160px) 75px minmax(134px, 304px);


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
 
  & div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
  }
  
`

const OwnerName = styled.div`
color: var(--main-100);
font-weight: 500;
font-size: 16px;
text-overflow: ellipsis;
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

const Span = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
