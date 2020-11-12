const SET_EXPIRATION_DATE = 'SET_EXPIRATION_DATE';
const SET_LOWER_DIAMETER_RANGE = 'SET_LOWER_DIAMETER_RANGE';
const SET_UPPER_DIAMETER_RANGE = 'SET_UPPER_DIAMETER_RANGE';
const SET_SEARCHTERM = 'SET_SEARCHTERM';




const devicesSearchReducer = (state, action) => {

    switch (action.type) {

    case SET_SEARCHTERM:
    return { ...state, searchTerm: action.searchTerm }

    case SET_EXPIRATION_DATE:
    return { ...state, expirationDate: action.expirationDate }

    case SET_LOWER_DIAMETER_RANGE:
    return { ...state, lowerDiameterRange: action.lowerDiameterRange }

    case SET_UPPER_DIAMETER_RANGE:
        return { ...state, upperDiameterRange: action.upperDiameterRange }

    default:
        return state
        }

}

export const setExpirationDate = (expirationDate) => ({ type: SET_EXPIRATION_DATE, expirationDate});
export const setLowerDiameterRange = (lowerDiameterRange) => ({ type: SET_LOWER_DIAMETER_RANGE, lowerDiameterRange});
export const setUpperDiameterRange = (upperDiameterRange) => ({ type: SET_UPPER_DIAMETER_RANGE, upperDiameterRange});
export const setSearchTerm = (searchTerm) => ({ type: SET_SEARCHTERM, searchTerm});

export default devicesSearchReducer;