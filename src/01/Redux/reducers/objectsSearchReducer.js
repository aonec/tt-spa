const SET_CITY = 'SET_CITY';
const SET_STREET = 'SET_STREET';
const SET_HOUSE_NUMBER = 'SET_HOUSE_NUMBER';
const SET_CORPUS = 'SET_CORPUS';

export const objectsSearchReducer = (state, action) => {

    switch (action.type) {

    case SET_CITY:
    return { ...state, City: action.city }

    case SET_STREET:
    return { ...state, Street: action.street }

    case SET_HOUSE_NUMBER:
    return { ...state, HousingStockNumber: action.HousingStockNumber }

        case SET_CORPUS:
            return { ...state, Corpus: action.corpus}

    default:
        return state
        }

}

export const setCity = (city) => ({ type: SET_CITY, city});
export const setStreet = (street) => ({ type: SET_STREET, street});
export const setHouseNumber = (HousingStockNumber) => ({ type: SET_HOUSE_NUMBER, HousingStockNumber});
export const setCorpus = (corpus) => ({ type: SET_CORPUS, corpus});
