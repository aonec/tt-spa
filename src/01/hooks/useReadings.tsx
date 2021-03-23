import React, {MutableRefObject, useCallback, useEffect, useState} from 'react'
import rateTypeToNumber from '../_api/utils/rateTypeToNumber'
import { formEmptyReadingsObject } from '../utils/formEmptyReadingsObject'
import { getMonthFromDate } from '../utils/getMonthFromDate'
import {IndividualDeviceType} from "../../types/types";
import moment from "moment";
import axios from "../axios";
import {isNullInArray} from "../utils/checkArrayForNulls";
import {setInputFocused, setInputUnfocused} from "../Redux/ducks/readings/actionCreators";
import {useDispatch, useSelector} from "react-redux";
import {
    DeviceReadingsContainer,
    getInputColor
} from "../_pages/MetersPage/components/MeterDevices/components/ApartmentReadingLine";
import ReadingsBlock from "../_pages/MetersPage/components/MeterDevices/components/ReadingsBlock";
import {v4 as uuid} from "uuid";
import {selectDisabledState} from "../Redux/ducks/readings/selectors";
import {Input} from "antd";


export const useReadings = (device: IndividualDeviceType,
                            textInput: MutableRefObject<Input | null>,
                            sliderIndex = 0) => {

    const [readingsState, setReadingsState] = useState<ReadingsStateType>()
    const [isVisible, setIsVisible] = useState(false)
    const [initialReadings, setInitialReadings] = useState<number[]>([])

    const dispatch = useDispatch();

    const disabledState = useSelector(selectDisabledState)

    const isDisabled = disabledState?.find((el) => el.deviceId === device.id)
      ?.isDisabled

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
    }, [device.readings, sliderIndex])

    const formDeviceReadingObject = (deviceItem: IndividualDeviceType, readingsState: ReadingsStateType): ReadingType => {
        return ({
            deviceId: deviceItem.id,
            value1: Number(readingsState.currentReadingsArray[0]),
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
        if (!textInput.current) return
        setReadingsState((state: any) => ({
            ...state,
            currentReadingsArray: initialReadings,
        }))
        textInput.current.focus()
        setIsVisible(false)
    }

    if (!readingsState) return {}

    const currentDeviceReadings = readingsState.currentReadingsArray.map(
      (value, index) => (
        <ReadingsBlock
          key={device.id + index}
          index={index}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onInputChange(e, index)
          }
          value={value}
          resource={readingsState.resource}
          operatorCabinet
          textInput={textInput}
          isDisabled={isDisabled}
        />
      )
    )

    const previousDeviceReadings = readingsState.previousReadingsArray.map(
      (value, index) => (
        <ReadingsBlock
          key={uuid()}
          index={index}
          value={value}
          resource={readingsState.resource}
          operatorCabinet
          readingsBlocked
          houseReadings
          isDisabled
        />
      )
    )

    const options = (
      readingsElems: JSX.Element[],
      isCurrent: boolean
    ): OptionsInterface[] => [
        {
            value: () => (
              <DeviceReadingsContainer
                color={
                    isCurrent
                      ? getInputColor(device.resource)
                      : 'var(--main-90)'
                }
                onBlur={onBlurHandler}
                onFocus={onFocusHandler}
                resource={device.resource}
              >
                  {readingsElems}
              </DeviceReadingsContainer>
            ),
            isSuccess:
              readingsState?.resource !== 'Electricity' ||
              readingsElems.length === 1,
        },
        {
            value: () => (
              <div
                onBlur={onBlurHandler}
                onFocus={onFocusHandler}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                  <DeviceReadingsContainer
                    style={{ marginBottom: 8 }}
                    color={isCurrent ? 'var(--electro)' : 'var(--main-90)'}
                    resource={device.resource}
                  >
                      {readingsElems[0]}
                  </DeviceReadingsContainer>
                  <DeviceReadingsContainer
                    color={isCurrent ? '#957400' : 'var(--main-90)'}
                    resource={device.resource}
                  >
                      {readingsElems[1]}
                  </DeviceReadingsContainer>
              </div>
            ),
            isSuccess: readingsElems.length === 2,
        },
        {
            value: () => (
              <div
                onBlur={onBlurHandler}
                onFocus={onFocusHandler}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                  <DeviceReadingsContainer
                    style={{ marginBottom: 8 }}
                    color={isCurrent ? 'var(--electro)' : 'var(--main-90)'}
                    resource={device.resource}
                  >
                      {[readingsElems[0], readingsElems[1]]}
                  </DeviceReadingsContainer>
                  <DeviceReadingsContainer
                    color={isCurrent ? '#957400' : 'var(--main-90)'}
                    resource={device.resource}
                  >
                      {readingsElems[2]}
                  </DeviceReadingsContainer>
              </div>
            ),
            isSuccess: true,
        },
    ]

    const previousReadings = options(previousDeviceReadings, false)
      .find((el) => el.isSuccess)!
      .value()

    const currentReadings = options(currentDeviceReadings, true)
      .find((el) => el.isSuccess)!
      .value();

    return {
        readingsState,
        isVisible,
        onInputChange,
        handleOk,
        handleCancel,
        previousReadings,
        currentReadings
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

interface OptionsInterface {
    value: () => JSX.Element
    isSuccess: boolean
}




