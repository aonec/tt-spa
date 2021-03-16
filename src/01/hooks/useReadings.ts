import {useEffect, useState} from 'react'
import rateTypeToNumber from '../_api/utils/rateTypeToNumber'
import { formEmptyReadingsObject } from '../utils/formEmptyReadingsObject'
import { getMonthFromDate } from '../utils/getMonthFromDate'
import {IndividualDeviceType} from "../../types/types";



export const useReadings = (device: IndividualDeviceType, sliderIndex = 0) => {

    const [readingsState, setReadingsState] = useState<ReadingsStateType>()


    const currentMonth = getMonthFromDate()
    const numberOfReadings = rateTypeToNumber(device.rateType)
    const emptyReadingsObject = formEmptyReadingsObject(numberOfReadings)
    const isReadingsCurrent =
        currentMonth === getMonthFromDate(device.readings[0].readingDate)

    useEffect(() => {
        const previousReadingsArray: number[] = []
        const currentReadingsArray: number[] = []
        const prevReadingsIndex = sliderIndex + +isReadingsCurrent
        const currentReadings: Record<string, any> =
            (isReadingsCurrent ? device.readings[0] : emptyReadingsObject) || {}
        const prevReadings: Record<string, any> = device.readings[prevReadingsIndex] || {}

        for (let i = 1; i <= numberOfReadings; i++) {
            previousReadingsArray.push(prevReadings[`value${i}`] ?? '')
            currentReadingsArray.push(currentReadings[`value${i}`] ?? '')
        }

        setReadingsState({
            previousReadingsArray,
            currentReadingsArray,
            prevId: prevReadings.id,
            currId: currentReadings.id,
            resource: device.resource,
        })
    }, [device.readings, numberOfReadings, sliderIndex])

    return [readingsState, setReadingsState] as const
}

type ReadingsStateType = {
    previousReadingsArray: number[]
    currentReadingsArray: number[]
    prevId: number
    currId: number
    resource: string
}