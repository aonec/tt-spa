import axios from "01/axios"
import {IndividualDeviceType} from "types/types"

export type RequestDevicesByHouseType = {
    hasNextPage: boolean
    hasPreviousPage: boolean
    items: Array<IndividualDeviceType>
    nextPageNumber: number
    pageNumber: number
    pageSize: number
    previousPageNumber: number
    totalItems: number
    totalPages: number
}


export const requestDevicesByHouse = async (HousingStockId: string) => {
    // const queryString = formQueryString(searchState)
    try {
        // const res:RequestDevicesByHouseType  = await axios.get(`IndividualDevices${queryString}&Resource=Electricity`)
        const res:RequestDevicesByHouseType  = await axios.get(`IndividualDevices?HousingStockId=${HousingStockId}&Resource=Electricity`)
        return res
    } catch (error) {
        console.log(error)
    }
}