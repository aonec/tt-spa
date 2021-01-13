import {requestDevicesByHouse, DevicesByHouseType} from "../../../../_api/houses_readings_page";
import {
    IndividualDeviceType,
    ManagementFirmType,
} from "../../../../../types/types";

const SET_INFO = 'SET_INFO'
const UPDATE_READINGS = 'UPDATE_READINGS'

const initialManagementFirm = {
    id: 2,
    name: "ООО УК \"Жилье\"",
    phoneNumber: "+79272685534",
    information: null,
    timeZoneOffset: "03:00:00"
};

export const initialReadings = {
    id: 1911716,
    hasError: true,
    status: "Unknown",
    statusMessage: "fsdf",
    value1: "8661",
    value2: "null",
    value3: "null",
    value4: "null",
    readingDate: "2020-11-28",
    uploadTime: "2020-11-28T02:01:51.496912"
}


const initialDevice = {
    resource: "Electricity",
    mountPlace: "Corridor",
    rateType: "OneZone",
    readings: [initialReadings],
    apartmentNumber: "80",
    homeownerName: "Тюкменев  С.  Н.  ",
    personalAccountNumber: "252028",
    id: 1253009,
    transactionType: null,
    model: "Меркурий 201.7",
    serialNumber: "38376514*",
    managementFirm: initialManagementFirm,
    lastCommercialAccountingDate: "2017-12-10T03:00:00",
    futureCommercialAccountingDate: "2017-12-10T03:00:00",
    lastCheckingDate: "2019-08-01T03:00:00",
    futureCheckingDate: "2035-08-01T03:00:00",
    closingDate: null,
    housingStockNumber: "324"
}


const initialDevicesState = {
    totalItems: 53,
    pageNumber: 1,
    pageSize: 500,
    devices: [initialDevice],
    housingStockNumber: "8",
    homeownerName: "Хузиахметов  Роберт  Фазиавиевич  ",
    personalAccountNumber: "168",
    id: 601901,
    transactionType: "asfasf",
    model: "Меркурий 200.05",
    serialNumber: "К-7792608-Э",
    managementFirm: initialManagementFirm,
    lastCommercialAccountingDate: "2017-12-10T03:00:00",
    futureCommercialAccountingDate: "2017-12-10T03:00:00",
    lastCheckingDate: "2008-12-31T03:00:00",
    futureCheckingDate: "2024-12-31T03:00:00",
    closingDate: "2024-12-31T03:00:00"
}

export type InitialStateType = {
    totalItems: number,
    pageNumber: number,
    pageSize: number,
    devices: Array<IndividualDeviceType> | undefined,
    housingStockNumber: string,
    homeownerName: string,
    personalAccountNumber: string,
    id: number,
    transactionType: string,
    model: string,
    serialNumber: string,
    managementFirm: ManagementFirmType
    lastCommercialAccountingDate: string
    futureCommercialAccountingDate: string
    lastCheckingDate: string
    futureCheckingDate: string
    closingDate: string
}
export const initialState = {
    hasNextPage: true,
    hasPreviousPage: true,
    items: [initialDevice],
    nextPageNumber: 2,
    pageNumber: 2,
    pageSize: 2,
    previousPageNumber: 2,
    totalItems: 2,
    totalPages: 2
}

// initialState

export const devicesReadingsByHouseReducer = (state: DevicesByHouseType = initialState, action: SetDevicesACType):DevicesByHouseType  => {
    switch (action.type) {
        case SET_INFO:
            return {...state, ...action.payload}

        case UPDATE_READINGS:



        default: return state

    }
}

export type DevicesReadingsByHouseReducerType = typeof devicesReadingsByHouseReducer

export type SetDevicesACType = {
    type: typeof SET_INFO
    payload: DevicesByHouseType | undefined
}

export const setInfo = (payload: DevicesByHouseType | undefined):SetDevicesACType  => ({ type: SET_INFO, payload })
