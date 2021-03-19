import React, {useCallback, useEffect, useState} from 'react'
import rateTypeToNumber from '../_api/utils/rateTypeToNumber'
import { formEmptyReadingsObject } from '../utils/formEmptyReadingsObject'
import { getMonthFromDate } from '../utils/getMonthFromDate'
import {IndividualDeviceType} from "../../types/types";
import moment from "moment";
import axios from "../axios";
import {isNullInArray} from "../utils/checkArrayForNulls";
import {setInputFocused, setInputUnfocused} from "../Redux/ducks/readings/actionCreators";
import {useDispatch} from "react-redux";


export const useReadings = (device: IndividualDeviceType, sliderIndex = 0) => {

    const [readingsState, setReadingsState] = useState<ReadingsStateType>()
    const [isVisible, setIsVisible] = useState(false)
    const [initialReadings, setInitialReadings] = useState<number[]>([])
    const [isCancel, setIsCancel] = useState(false)

    const dispatch = useDispatch();

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

    const formDeviceReadingObject = (deviceItem: IndividualDeviceType, readingsState: ReadingsStateType): ReadingType => {
        return ({
            deviceId: deviceItem.id,
            value1: +readingsState.currentReadingsArray[0],
            readingDate: moment().toISOString(),
            uploadTime: moment().toISOString(),
            isForced: true
        })
    }

    const sendReadings = useCallback(() => {
        if (!readingsState) return
        const deviceReadingObject: Record<string, any> = formDeviceReadingObject(device, readingsState)
        for (let i = 1; i < 4; i++) {
            if (+readingsState.currentReadingsArray[i]) {
                deviceReadingObject[`value${i + 1}`] = +readingsState.currentReadingsArray[i]
            }
        }
        axios.post('/IndividualDeviceReadings/create', deviceReadingObject);
        setInitialReadings(readingsState.currentReadingsArray)
    }, [readingsState])

    const onBlurHandler = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        if (e.currentTarget.contains(e.relatedTarget as Node) || !readingsState) return
        const isNull = isNullInArray(readingsState.currentReadingsArray)
        if (isNull) {
            setIsVisible(true)
        } else {
            if (readingsState.currentReadingsArray !== initialReadings) {
                sendReadings()
            }
            dispatch(setInputUnfocused())
        }
    }, [readingsState, initialReadings])

    const onFocusHandler = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        if (e.currentTarget.contains(e.relatedTarget as Node) || !readingsState) return

        setInitialReadings(readingsState.currentReadingsArray)
        const isNull = isNullInArray(readingsState.currentReadingsArray)
        if (isNull) {
            dispatch(setInputFocused(device.id))
        }
    }, [readingsState])

    const onInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
    ) => {
        e.preventDefault()
        if (isNaN(+e.target.value)) return
        setReadingsState((state: any) => ({
            ...state,
            currentReadingsArray: state.currentReadingsArray.map(
                (reading: any, i: any): number => {
                    return i === index ? +e.target.value : reading
                }
            ),
        }))
    }

    const handleOk = () => {
        setReadingsState((state: any) => ({
            ...state,
            currentReadingsArray: initialReadings,
        }))
        dispatch(setInputUnfocused())
        setIsVisible(false)
    }

    const handleCancel = () => {
        setReadingsState((state: any) => ({
            ...state,
            currentReadingsArray: initialReadings,
        }))
        setIsCancel(true)
        setIsVisible(false)
    }


    return {
        readingsState,
        setReadingsState,
        isVisible,
        setIsVisible,
        initialReadings,
        setInitialReadings,
        onBlurHandler,
        onFocusHandler,
        onInputChange,
        isCancel,
        setIsCancel,
        handleOk,
        handleCancel
    }
}

export type ReadingsStateType = {
    previousReadingsArray: number[]
    currentReadingsArray: number[]
    prevId: number
    currId: number
    resource: string
}



type ReadingType = {
    deviceId: number
    value1: number
    value2?: number
    value3?: number
    value4?: number
    readingDate: string
    uploadTime: string
    isForced: boolean
}




