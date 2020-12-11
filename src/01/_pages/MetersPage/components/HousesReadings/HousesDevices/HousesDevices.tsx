import React, {useEffect, useReducer} from "react";
import {NotConnectedIcon} from "../../../../../components/NotConnectedIcon/NotConnectedIcon";
import {useDebounce} from "../../../../../hooks/useDebounce";
import {requestDevicesByHouse} from "../../../../../_api/houses_readings_page";
import {HouseSearchType} from "../HousesReadings";
import {
    devicesReadingsByHouseReducer,
    getDevicesByHouse
} from "../../../../../Redux/reducers/devicesReadingsByHouseReducer";

interface Props {
    searchState: HouseSearchType;
}

const HousesDevices: React.FC<Props> = ({searchState}) => {


    const [state, dispatch] = useReducer(devicesReadingsByHouseReducer, {})

    const debouncedSearchState = useDebounce(searchState, 500);

    useEffect(() => {
        if (searchState.HousingStockNumber) {
            const devicesByApartment = dispatch(getDevicesByHouse(debouncedSearchState))
            debugger;

        }
    }, [debouncedSearchState])

    return (
        <div>
        </div>
    )
}

export default HousesDevices