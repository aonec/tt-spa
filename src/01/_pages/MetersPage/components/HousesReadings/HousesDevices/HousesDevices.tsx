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

interface Props {
    searchState: HouseSearchType;
}

const HouseReadingsHeader = styled.div`
display: grid;
grid-template-columns: 1fr 3fr 2fr 1.5fr 1.5fr 1.5fr 1.5fr;
column-gap: 16px;
color: var(--main-90);
background-color: var(--main-4);
border-bottom: 1px solid var(--frame);
height: 48px;
align-items: center;
`

const HouseReadingsDevice = styled.div`
display: grid;
grid-template-columns: 1fr 3fr 2fr 1.5fr 1.5fr 1.5fr 1.5fr;
column-gap: 16px;
color: var(--main-90);
border-bottom: 1px solid var(--frame);
align-items: center;
height: 72px;
`


// const HousesDevices: React.FC<Props> = ({searchState}) => {
const HousesDevices: React.FC = () => {

    let { id: housingStockId } = useParams();


    const [state, dispatch] = useReducer<React.Reducer<RequestDevicesByHouseType, SetDevicesACType>>(devicesReadingsByHouseReducer, initialState);
    const [isLoading, setIsLoading] = useState(true);

    // const debouncedSearchState: HouseSearchType = useDebounce(searchState, 500);


    useEffect(() => {
        const setInfoAsync = async () => {
            // if (debouncedSearchState.Street && debouncedSearchState.HousingStockNumber) {
                setIsLoading(true);
                // const res = await requestDevicesByHouse(debouncedSearchState);
                const res = await requestDevicesByHouse(housingStockId);
                debugger;
                dispatch(setInfo(res));
                setIsLoading(false)
            // }
        };
        setInfoAsync();
    }, [housingStockId])


    const deviceElems = state.items.map((device) => {
        return (
            <HouseReadingsDevice>
                <div>{device.apartmentNumber}</div>
                <div>
                    <div>{device.homeownerName}</div>
                    <div>{device.personalAccountNumber}</div>
                </div>
                <div>
                    <div>{device.model}</div>
                    <div>{device.serialNumber}</div>
                </div>
                <div>

                </div>
                <div>Тек. показания</div>
                <div>Потребление</div>
                <div>Комментарии</div>
            </HouseReadingsDevice>
        )
    })


    if (isLoading) return null



    return (
        <div>
            <HouseReadingsHeader>
                <div>№ кв.</div>
                <div>ФИО собственника</div>
                <div>Прибор</div>
                <div>Посл. показ.</div>
                <div>Тек. показания</div>
                <div>Потребление</div>
                <div>Комментарии</div>
            </HouseReadingsHeader>
            {deviceElems}
        </div>
    )
}

export default HousesDevices