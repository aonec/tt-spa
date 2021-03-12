import {
    ReadingsActionsType,
    SetDevicesActionType,
    SetInputFocusedActionType,
    SetInputUnfocusedActionType,
    UpdateReadingsActionType,
} from './contracts/actionTypes'
import { DevicesType } from '../../reducers/readingsReducer'

export const setDevices = (devices: DevicesType): SetDevicesActionType => {
    return { type: ReadingsActionsType.SET_DEVICES, devices }
}

export const updateReadings = (
    deviceId: number,
    readingNumber: number,
    readingValue: number
): UpdateReadingsActionType => {
    return {
        type: ReadingsActionsType.UPDATE_READINGS,
        deviceId,
        readingNumber,
        readingValue,
    }
}
export const setInputFocused = (
    deviceId: number
): SetInputFocusedActionType => {
    return { type: ReadingsActionsType.SET_INPUT_FOCUSED, deviceId }
}

export const setInputUnfocused = (): SetInputUnfocusedActionType => {
    return { type: ReadingsActionsType.SET_INPUT_UNFOCUSED }
}

export type ActionTypes =
    | SetDevicesActionType
    | UpdateReadingsActionType
    | SetInputFocusedActionType
    | SetInputUnfocusedActionType
