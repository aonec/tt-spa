import React,{ useEffect, useState} from 'react'
import styled from 'styled-components'
import {getMonthFromDate} from "../../../../utils/getMonthFromDate";
import rateTypeToNumber from "../../../../_api/utils/rateTypeToNumber";
import {formEmptyReadingsObject} from "../../../../utils/formEmptyReadingsObject";
import {IndividualDeviceType} from "../../../../../types/types";
import ReadingsBlock from "../../../MetersPage/components/MeterDevices/components/ReadingsBlock";
import DeviceInfo from "../../../MetersPage/components/MeterDevices/components/DeviceInfo";

const DeviceItem = styled.div`
    display: grid;
    grid-template-columns: 5fr 2fr 2fr 3fr;
    padding: 0 16px 16px;
    border-bottom: 1px solid #dcdee4;
    align-items: center;
`



export function ApartmentDeviceItem({ device, sliderIndex }: { device: IndividualDeviceType, sliderIndex: number}) {

    // const { id, model, serialNumber, resource, futureCheckingDate } = device
    const [readingsState, setReadingsState] = useState<{ readingsArray: number[], resource: string }>()

    const currentMonth = getMonthFromDate()
    const numberOfReadings = rateTypeToNumber(device.rateType)
    const emptyReadingsObject = formEmptyReadingsObject(numberOfReadings)
    const isReadingsCurrent =
        currentMonth === getMonthFromDate(device.readings[0].readingDate)

    useEffect(() => {
        const readingsArray: number[] = []
        const readings: Record<string, any> = isReadingsCurrent ? device.readings : [emptyReadingsObject, ...device.readings]

        debugger;

        for (let i = 1; i <= numberOfReadings; i++) {
            readingsArray.push(readings[sliderIndex][`value${i}`] ?? '')
        }

        setReadingsState({
            readingsArray,
            resource: device.resource,
        })
    }, [device.readings, sliderIndex])

    const deviceReadings = readingsState?.readingsArray.map(
        (value, index) => (
            <ReadingsBlock
                key={device.id + index}
                index={index}
                value={value}
                resource={readingsState.resource}
                operatorCabinet
                isDisabled={true}
            />
        )
    )

    return (
        <DeviceItem>
            {/*<ApartmentDevice*/}
            {/*    model={model}*/}
            {/*    serialNumber={serialNumber}*/}
            {/*    resource={resource}*/}
            {/*    creationDate="запрос данных"*/}
            {/*    futureCheckingDate={convertDate(futureCheckingDate)}*/}
            {/*    id={id}*/}
            {/*/>*/}
          <DeviceInfo device={device} />
            {/*<ApartmentInput />*/}
            {/*<ApartmentInput />*/}
            {/*<ApartmentDevicesHistory />*/}
            <DeviceReadingsContainer
                color={'var(--frame)'}
                resource={device.resource}
            >
                {deviceReadings}
            </DeviceReadingsContainer>
        </DeviceItem>
    )
}

const DeviceReadingsContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    border: 1px solid
        ${(props) => (props.color ? props.color : 'var(--main-90)')};
    max-width: 200px;
    padding: 8px 8px 8px 12px;

    &:focus-within {
        box-shadow: var(--shadow);
    }

    .ant-input-affix-wrapper:focus,
    .ant-input-affix-wrapper-focused {
        box-shadow: none;
    }
`