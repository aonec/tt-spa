import _ from 'lodash';
import rateTypeToNumber from "../../../../_api/utils/rateTypeToNumber";

const SET_DEVICES = 'SET_DEVICES';
const UPDATE_READINGS = 'UPDATE_READINGS';



const initialState = {
    devices: [
        {
            resource: 'HotWaterSupply',
            mountPlace: 'Toilet',
            rateType: 'OneZone',
            readings: [
                {
                    id: 1764931,
                    hasError: true,
                    status: 'Unknown',
                    statusMessage: null,
                    value1: '52',
                    value2: null,
                    value3: null,
                    value4: null,
                    readingDate: '2020-10-31',
                    uploadTime: '2020-11-02T10:23:40.763871'
                }
            ],
            id: 974319,
            transactionType: null,
            model: 'СГВ',
            serialNumber: '32740910',
            managementFirm: {
                id: 2,
                name: 'ООО УК "Жилье"',
                phoneNumber: null,
                information: null,
                timeZoneOffset: '03:00:00'
            },
            lastCommercialAccountingDate: '2017-12-10T03:00:00',
            futureCommercialAccountingDate: '2017-12-10T03:00:00',
            lastCheckingDate: '2017-10-02T03:00:00',
            futureCheckingDate: '2023-10-02T03:00:00',
            closingDate: null
        }
    ]
}



const readingsReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_DEVICES:
            return {...state, devices: [...action.devices]}

        case UPDATE_READINGS:
            // const deviceOrder = state.devices.findIndex(device => device.id === action.deviceId) - 1;
            // const isReadingsEmpty = !state.devices[deviceOrder];
            //
            // if (isReadingsEmpty) {
            //         const readingsArray = [{[`value${action.readingNumber}`]: action.readingValue}]
            //     return {
            //         ...state,
            //         devices: state.devices.map(
            //             (device) => device.id === action.deviceId ?
            //                 {
            //                     ...device,
            //                     readings: readingsArray,
            //                 } : device
            //         )
            //     }
            // }

            // if (isReadingsEmpty) {
            //     const readingsArray = [{[`value${action.readingNumber}`]: action.readingValue}]
            //     return {
            //         ...state,
            //         devices: state.devices.map(
            //             (device) => device.id === action.deviceId ?
            //                 {
            //                     ...device,
            //                     readings: readingsArray,
            //                 } : device
            //         )
            //     }
            // }

            // const newState = _.cloneDeep(state);
            // const deviceOrder = state.devices.findIndex(device => device.id === action.deviceId);
            // const rateType = rateTypeToNumber(state.devices[deviceOrder].rateType);
            //
            // const newState = {
            //     ...state, devices: state.devices.map((device, index) => {
            //         return index === deviceOrder ? _.cloneDeep(state.devices[deviceOrder]) : device
            //     })
            // };
            //
            // const readings = newState.devices[deviceOrder].readings[0];
            //
            // readings[`value${action.readingNumber}`] = action.readingValue;
            // //
            // // for (let i = 0; i <= rateType; i++) {
            // //     if (!readings[`value${i}`]) {
            // //         readings[`value${i}`] = 0;
            // //     }
            // // }
            //
            // return newState;


            //
            return {
                ...state,
                devices: state.devices.map(
                    (device) => device.id === action.deviceId ?
                        {
                            ...device,
                            readings: device.readings.map(
                                (reading, index) => {
                                    return index === 0 ?
                                        {
                                            ...reading,
                                            [`value${action.readingNumber}`]: action.readingValue
                                        } :
                                        reading
                                }
                            )

                        } : device
                )
            }
    }
}


export const setDevices = (devices) => ({ type: SET_DEVICES, devices })

export const updateReadings = (deviceId, readingNumber, readingValue) => {
    return { type: UPDATE_READINGS, deviceId, readingNumber, readingValue }
}




export default readingsReducer;