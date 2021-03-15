import _ from 'lodash'

const initialState = {
    serialNumber: '',
    lastCheckingDate: '',
    futureCheckingDate: '',
    lastCommercialAccountingDate: '',
    connection: {
        ipV4: '',
        deviceAddress: '',
        port: '',
    },
    futureCommercialAccountingDate: '',
    housingStockId: '',
    infoId: '',
}

export default function calculatorReducer(state = initialState, action) {
    const newState = _.cloneDeep(state)

    switch (action.type) {
        case 'CALC_UPDATE_FORM_VALUE_BY_PATH':
            const {
                payload: { path, value },
            } = action
            _.set(newState, path, value)
            return newState
        case 'CALC_UPDATE_FORM':
            return action.payload.value
        default:
            return newState
    }
}
