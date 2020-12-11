import axios from "01/axios"
import {ManagementFirmType, ReadingArrayType, ReadingDeviceType} from "types/types"
import {AxiosResponse} from "axios";
import {HouseSearchType} from "../_pages/MetersPage/components/HousesReadings/HousesReadings";
import {formQueryString} from "../utils/formQueryString";

// hasNextPage: false
// hasPreviousPage: false
// items: (53) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// nextPageNumber: 1
// pageNumber: 1
// pageSize: 500
// previousPageNumber: 1
// totalItems: 53
// totalPages: 1





type RequestDevicesByHouseType = {
    hasNextPage: boolean
    hasPreviousPage: boolean
    items: Array<ReadingDeviceType>
    nextPageNumber: number
    pageNumber: number
    pageSize: number
    previousPageNumber: number
    totalItems: number
    totalPages: number
}

export const requestDevicesByHouse = async (searchState: HouseSearchType) => {
    const queryString = formQueryString(searchState)
    debugger;
    try {
       const res = await axios.get<RequestDevicesByHouseType>(`IndividualDevices${queryString}&Resource=Electricity`)
            .then(res => res.data)
        return res
    } catch (error) {
        console.log(error)
    }
}