import axios from "01/axios"
import {IndividualDeviceType} from "types/types"
import {AxiosResponse} from "axios";
import {HouseSearchType} from "../_pages/MetersPage/components/HousesReadings/HousesReadings";
import {formQueryString} from "../utils/formQueryString";
import {InitialStateType} from "../_pages/MetersPage/components/HousesReadings/devicesReadingsByHouseReducer";

// hasNextPage: false
// hasPreviousPage: false
// items: (53) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// nextPageNumber: 1
// pageNumber: 1
// pageSize: 500
// previousPageNumber: 1
// totalItems: 53
// totalPages: 1


//
//
//
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

// hasNextPage: false
// hasPreviousPage: false
// housingStock: {id: 0, city: "Нижнекамск", street: "Ямьле", housingStockNumber: "8", corpus: null}
// items: [{id: 1306869, apartmentNumber: "1", homeownerName: "ЗАРИПОВ ДД ", homeownersCount: 1,…},…]
// nextPageNumber: 1
// pageNumber: 1
// pageSize: 500
// previousPageNumber: 1
// totalItems: 37
// totalPages: 1
// searchState: HouseSearchType


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