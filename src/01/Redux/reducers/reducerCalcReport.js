import _ from 'lodash'

const initialState = {
    visible: false,
    // deregisterFormState: {
    //   deviceId: '',
    //   documentsIds: [],
    //   closingDateTime: '',
    // },
}

export default function calcReportReducer(state = initialState, action) {
    const newState = _.cloneDeep(state)
    const { payload } = action
    switch (action.type) {
        case 'REPORT_FORM_VISIBLE': {
            _.set(newState, 'visible', payload.value)
            return newState
        }
        case 'DEREGISTER_FORM_UPDATE':
            _.set(newState, payload.path, payload.value)
            return newState
        default:
            return newState
    }
}
