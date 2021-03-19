import React, {useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import ApartmentDevice from './ApartmentDevice'
import { ApartmentInput } from './ApartmentInput'
import { ApartmentDevicesHistory } from './ApartmentDevicesHistory'
import { convertDate } from '../../../../_api/utils/convertDate'
import {useDispatch} from "react-redux";
import {getMonthFromDate} from "../../../../utils/getMonthFromDate";
import rateTypeToNumber from "../../../../_api/utils/rateTypeToNumber";
import {formEmptyReadingsObject} from "../../../../utils/formEmptyReadingsObject";
import {IndividualDeviceType} from "../../../../../types/types";
import { ReadingsStateType } from '01/hooks/useReadings'

const DeviceIitem = styled.div`
    display: grid;
    grid-template-columns: 5fr 2fr 2fr 3fr;
    padding: 0 16px 16px;
    border-bottom: 1px solid #dcdee4;
`



export function ApartmentDeviceItem({ device, sliderIndex }: { device: IndividualDeviceType, sliderIndex: number}) {

    const { id, model, serialNumber, resource, futureCheckingDate } = device
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



    return (
        <DeviceIitem>
            <ApartmentDevice
                model={model}
                serialNumber={serialNumber}
                resource={resource}
                creationDate="запрос данных"
                futureCheckingDate={convertDate(futureCheckingDate)}
                id={id}
            />
            <ApartmentInput />
            <ApartmentInput />
            <ApartmentDevicesHistory />
        </DeviceIitem>
    )
}