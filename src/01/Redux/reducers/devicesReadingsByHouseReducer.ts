import {requestDevicesByHouse} from "../../_api/houses_readings_page";
import {ReadingDeviceType} from "../../../types/types";
import {HouseSearchType} from "../../_pages/MetersPage/components/HousesReadings/HousesReadings";

const SET_DEVICES = 'SET_DEVICES'

const initialDevice = {
        "resource": "Electricity",
        "mountPlace": "Corridor",
        "rateType": "OneZone",
        "readings": [
            {
                "id": 1911716,
                "hasError": true,
                "status": "Unknown",
                "statusMessage": null,
                "value1": "8661",
                "value2": null,
                "value3": null,
                "value4": null,
                "readingDate": "2020-11-28",
                "uploadTime": "2020-11-28T02:01:51.496912"
            },
        ]
    }

const initialState = {
    "totalItems": 53,
    "pageNumber": 1,
    "pageSize": 500,
    "items": [initialDevice],
    "housingStockNumber": "8",
    "homeownerName": "Хузиахметов  Роберт  Фазиавиевич  ",
    "personalAccountNumber": "168",
    "id": 601901,
    "transactionType": null,
    "model": "Меркурий 200.05",
    "serialNumber": "К-7792608-Э",
    "managementFirm": {
        "id": 2,
        "name": "ООО УК \"Жилье\"",
        "phoneNumber": "+79272685534",
        "information": null,
        "timeZoneOffset": "03:00:00"
    },
    "lastCommercialAccountingDate": "2017-12-10T03:00:00",
    "futureCommercialAccountingDate": "2017-12-10T03:00:00",
    "lastCheckingDate": "2008-12-31T03:00:00",
    "futureCheckingDate": "2024-12-31T03:00:00",
    "closingDate": null
}

type InitialStateType = typeof initialState;

export const devicesReadingsByHouseReducer = (state: InitialStateType = initialState, action: any) => {
    switch (action.type) {
        case SET_DEVICES:
            return {...state, devices: action.devices}
        default: return state

    }
}

const setDevices = (devices: Array<ReadingDeviceType>) => ({ type: SET_DEVICES, devices })

export const getDevicesByHouse = (searchState: HouseSearchType) => async (dispatch: any) => {
    debugger;
   const res = await requestDevicesByHouse(searchState);
   dispatch(setDevices(res.items));
}