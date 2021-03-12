import { RootState } from '../../store'
import { ReadingsStateType } from '../../../_api/houses_readings_page'
import { DevicesType, DisabledStateType } from '../../reducers/readingsReducer'

export const selectReadingsState = (state: RootState): ReadingsStateType =>
    state.readings

export const selectDevices = (state: RootState): DevicesType =>
    selectReadingsState(state).items

export const selectDisabledState = (
    state: RootState
): DisabledStateType | undefined => selectReadingsState(state).disabledState
