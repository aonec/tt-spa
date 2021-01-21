import axios from "01/axios"
import {IndividualDeviceType} from "types/types"
import { DisabledStateType } from "01/Redux/reducers/readingsReducer"

export const requestDevicesByHouse = async (HousingStockId) => {
    const res = await axios.get(`IndividualDevices?HousingStockId=${HousingStockId}&Resource=Electricity`)
    return res
}

export const requestHouse = async (HousingStockId) => {
    return axios.get(`HousingStocks/${HousingStockId}`)
}