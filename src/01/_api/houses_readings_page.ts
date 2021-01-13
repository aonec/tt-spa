import axios from "01/axios"
import {IndividualDeviceType} from "types/types"
import { DisabledStateType } from "01/components/Select/selects/AddReadings/readingsReducer"

export type DevicesByHouseType = {
    hasNextPage: boolean
    hasPreviousPage: boolean
    items: Array<IndividualDeviceType>
    nextPageNumber: number
    pageNumber: number
    pageSize: number
    previousPageNumber: number
    totalItems: number
    totalPages: number
    disabledState?: DisabledStateType[]
}


export const requestDevicesByHouse = async (HousingStockId: string): Promise<DevicesByHouseType> => {
    // const queryString = formQueryString(searchState)

        const res = await axios.get<DevicesByHouseType>(`IndividualDevices?HousingStockId=${HousingStockId}&Resource=Electricity`)
    debugger;
        return res.data
}