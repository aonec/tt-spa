import React, {useEffect, useReducer, useState} from "react"
import HousesDevices from "./HousesDevices/HousesDevices";
import HousesSearchForm from "./HousesSearchForm/HousesSearchForm";
import {objectsSearchReducer} from "../../../../Redux/reducers/objectsSearchReducer";
import ObjectsSearchForm from "../../../Objects/ObjectsSearchForm/ObjectsSearchForm";

const initialState = {
    city: '' as string,
    Street: '' as string,
    HousingStockNumber: '' as string,
    corpus: '' as string
}

export type InitialStateType = typeof initialState;

const HouseReadings = () => {

    const [searchState, dispatchSearchState] = useReducer(objectsSearchReducer, initialState);

    return (
        <div>
            <HousesSearchForm searchState={searchState} dispatchSearchState={dispatchSearchState}/>
            <HousesDevices />
        </div>
    )
}

export default HouseReadings;