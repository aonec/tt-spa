import axios from "01/axios"
import {IndividualDeviceType} from "types/types"
import { DisabledStateType } from "01/Redux/reducers/readingsReducer"

export type ReadingsStateType = {
    hasNextPage: boolean
    hasPreviousPage: boolean
    items: Array<IndividualDeviceType>
    nextPageNumber: number
    pageNumber: number
    pageSize: number
    previousPageNumber: number
    totalItems: number
    totalPages: number
    disabledState?: DisabledStateType
}


export const requestDevicesByHouse = async (HousingStockId: string): Promise<ReadingsStateType> => {
    // const queryString = formQueryString(searchState)

        const res = await axios.get<ReadingsStateType>(`IndividualDevices?HousingStockId=${HousingStockId}&Resource=Electricity`)
        return res
}