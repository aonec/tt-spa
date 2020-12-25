import React, {useEffect, useReducer} from "react";
import {NotConnectedIcon} from "../../../../../components/NotConnectedIcon/NotConnectedIcon";
import {useDebounce} from "../../../../../hooks/useDebounce";
import {requestDevicesByHouse, RequestDevicesByHouseType} from "../../../../../_api/houses_readings_page";
import {HouseSearchType} from "../HousesReadings";
import {
    devicesReadingsByHouseReducer, initialReadings, initialState, InitialStateType, SetDevicesACType, setInfo
} from "../devicesReadingsByHouseReducer";
import { useState } from "react";
import { useParams } from "react-router-dom"
import styled from "styled-components";
import { IndividualDeviceType } from "types/types";
import { DeviceReadingLine } from "../DeviceReadingLine/DeviceReadingLine";
import { HouseReadingsHeader } from "../HouseReadingsHeader/HouseReadingsHeader";
import readingsReducer, { setDevices } from "../../../../../components/Select/selects/AddReadings/readingsReducer";

interface Props {
    searchState: HouseSearchType;
}



const HouseReadingsDevice = styled.div`
display: grid;
grid-template-columns: 1fr 3fr 2fr 1.5fr 1.5fr 1.5fr 1.5fr;
column-gap: 16px;
color: var(--main-90);
border-bottom: 1px solid var(--frame);
align-items: center;
height: 72px;
`

type ParamsType = {
    id: string
}


// const HousesDevices: React.FC<Props> = ({searchState}) => {
const HousesDevices: React.FC = () => {

    let { id: housingStockId }: ParamsType = useParams();


    // const [state, dispatch] = useReducer<React.Reducer<RequestDevicesByHouseType, SetDevicesACType>>(devicesReadingsByHouseReducer, initialState);

    const [state, dispatch] = React.useReducer(readingsReducer, {});



    const [isLoading, setIsLoading] = useState(true);

    // const debouncedSearchState: HouseSearchType = useDebounce(searchState, 500);


    useEffect(() => {
        const setInfoAsync = async () => {
            // if (debouncedSearchState.Street && debouncedSearchState.HousingStockNumber) {
                setIsLoading(true);
                // const res = await requestDevicesByHouse(debouncedSearchState);
                const res = await requestDevicesByHouse(housingStockId);
                dispatch(setDevices(res.items));
                setIsLoading(false)
            // }
        };
        setInfoAsync();
    }, [housingStockId])

    if (isLoading) return null

    const deviceElems = state.devices
        .sort((device1, device2) => {
        return +device1.apartmentNumber - +device2.apartmentNumber
    })
        .map((device) => <DeviceReadingLine key={device.id} device={device} dispatch={dispatch}/>)



    return (
        <div>
            <HouseReadingsHeader/>
            {deviceElems}
        </div>
    )
}

export default HousesDevices