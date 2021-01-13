import { DevicesByHouseType } from "01/_api/houses_readings_page";
import {IndividualDeviceType} from "../../../../../types/types";

const SET_DEVICES = 'SET_DEVICES';
const UPDATE_READINGS = 'UPDATE_READINGS';

export type DisabledStateType = {
    deviceId: number,
    isDisabled: boolean
}

const initialState = {
    hasNextPage: false,
    hasPreviousPage: false,
    nextPageNumber: 2,
    pageNumber: 1,
    pageSize: 5,
    previousPageNumber: 0,
    totalItems: 10,
    totalPages: 0,
    items: [
        {} as IndividualDeviceType
    ],
    disabledState: [
        {} as DisabledStateType
    ]
}


type DevicesType = typeof initialState.items

const readingsReducer = (state:DevicesByHouseType = initialState, action: ActionTypes): DevicesByHouseType => {
    switch (action.type) {

        case SET_DEVICES:
            return {...state, items: [...action.devices],
                disabledState: action.devices.map((device) => ({deviceId: device.id, isDisabled: false})
                )}

        case UPDATE_READINGS:

            return {
                ...state,
                items: state.items.map(
                    (device) => device.id === action.deviceId ?
                        {
                            ...device,
                            readings: device.readings.map(
                                (reading, index) => {
                                    return index === 0 ?
                                        {
                                            ...reading,
                                            [`value${action.readingNumber}`]: action.readingValue
                                        } :
                                        reading
                                }
                            )

                        } : device
                )
            }

        default: return state
    }
}

type SetDevicesActionType = {
    type: typeof SET_DEVICES
    devices: DevicesType
}
export const setDevices = (devices: DevicesType): SetDevicesActionType => ({ type: SET_DEVICES, devices })

type UpdateReadingsActionType = {
    type: typeof UPDATE_READINGS
    deviceId: number
    readingNumber: number
    readingValue: number
}
export const updateReadings = (deviceId: number, readingNumber: number, readingValue: number): UpdateReadingsActionType => {
    return { type: UPDATE_READINGS, deviceId, readingNumber, readingValue }
}

export type ActionTypes = SetDevicesActionType | UpdateReadingsActionType




export default readingsReducer;