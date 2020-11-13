const SET_CITY = 'SET_CITY';
const SET_STREET = 'SET_STREET';
const SET_HOUSE_NUMBER = 'SET_HOUSE_NUMBER';

export const objectsSearchReducer = (state, action) => {

    switch (action.type) {

    case SET_CITY:
    return { ...state, city: action.city }

    case SET_STREET:
    return { ...state, street: action.street }

    case SET_HOUSE_NUMBER:
    return { ...state, houseNumber: action.houseNumber }

    default:
        return state
        }

}

export const setCity = (city) => ({ type: SET_CITY, city});
export const setStreet = (street) => ({ type: SET_STREET, street});
export const setHouseNumber = (houseNumber) => ({ type: SET_HOUSE_NUMBER, houseNumber});
