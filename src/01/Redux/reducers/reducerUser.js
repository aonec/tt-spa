import _ from 'lodash'

const initialState = {
    id: 0,
    index: null,
    region: null,
    city: '',
    district: null,
    street: '',
    number: '',
    corpus: null,
    houseCategory: null,
    numberOfEntrances: null,
    numberOfFloors: null,
    isThereElevator: null,
    numberOfApartments: null,
    totalLivingArea: null,
    areaOfNonResidential: null,
    houseArea: null,
    totalArea: null,
    constructionDate: null,
}

export default function objectReducer(state = initialState, action) {
    const newState = _.cloneDeep(state)
    return newState
    switch (action.type) {
        case 'OBJECT_UPDATE_FORM_VALUE_BY_PATH':
            const {
                payload: { path, value },
            } = action
            _.set(newState, path, value)
            return newState
        case 'OBJECT_UPDATE_FORM':
            return action.payload.value
        default:
            return newState
    }
}
