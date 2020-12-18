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

const HouseReadingsDevice = styled.div`
display: grid;
grid-template-columns: 1fr 2.5fr 0.5fr 2fr 2fr 2fr 1.3fr 1.2fr;
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

type Props = {
    device: IndividualDeviceType
}

export const DeviceReadingLine:React.FC<Props> = React.memo(({device, dispatch}) => {
    const [consumptionState, setConsumptionState] = useState([])

    const numberOfReadings = rateTypeToNumber(device.rateType);




        const [readingsState, setReadingsState] = useState({});

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
            return <Consumption key={index}>{el} кВтч</Consumption>
        })

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

        const onInputChange = (e, index) => {
            e.preventDefault();
            setReadingsState((state) => ({
                ...state,
                currentReadingsArray: state.currentReadingsArray.map((reading, i) => {
                        return i === index ? e.target.value : reading
                    }
                )

            }))
            // dispatch(updateReadings(device.id, index+1, e.target.value));
        }


            const currentDeviceReadings = readingsState.currentReadingsArray.map((value, index) => (
            <DeviceRatesVertical key={readingsState.id || device.id + index}
                                 index={index}
                                 onChange={(e) => onInputChange(e, index)}
                                 value={value}
                                 resource={readingsState.resource}
                                 sendReadings={sendReadings}
                                 operatorCabinet
                                 houseReadings
            />
        ));

        const previousDeviceReadings = readingsState.previousReadingsArray.map((value, index) => (
            <DeviceRatesVertical key={readingsState.id || device.id + index}
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
            <DeviceReadingsContainer>{currentDeviceReadings}</DeviceReadingsContainer>
            <div>{consumptionElems}</div>
            <div>-</div>
        </HouseReadingsDevice>
    )
}
)
