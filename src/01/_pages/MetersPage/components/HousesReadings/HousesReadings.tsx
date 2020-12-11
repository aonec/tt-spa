import React, {useEffect, useReducer, useState} from "react"
import HousesDevices from "./HousesDevices/HousesDevices";
import HousesSearchForm from "./HousesSearchForm/HousesSearchForm";
import {objectsSearchReducer} from "../../../../Redux/reducers/objectsSearchReducer";
import ObjectsSearchForm from "../../../Objects/ObjectsSearchForm/ObjectsSearchForm";
import {useDebounce} from "../../../../hooks/useDebounce";
import { requestDevicesByHouse } from "01/_api/houses_readings_page";
import { devicesReadingsByHouseReducer } from "01/Redux/reducers/devicesReadingsByHouseReducer";

const initialState = {
    city: '' as string,
    Street: '' as string,
    HousingStockNumber: '' as string,
    corpus: '' as string
}

export type HouseSearchType = typeof initialState;

const HouseReadings = () => {



    const [searchState, dispatchSearchState] = useReducer(objectsSearchReducer, initialState);


    return (
        <div>
            <HousesSearchForm searchState={searchState} dispatchSearchState={dispatchSearchState}/>
            <HousesDevices searchState={searchState}/>
        </div>
    )
}

export default HouseReadings;