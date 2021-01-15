import React, {useEffect, useReducer} from "react";
import {requestDevicesByHouse, ReadingsStateType} from "../../../../../_api/houses_readings_page";
import { useSelector, useDispatch } from 'react-redux'
import { useState } from "react";
import { useParams } from "react-router-dom"
import styled from "styled-components";
import { HousesDeviceReadingLine } from "../DeviceReadingLine/HousesDeviceReadingLine";
import { HouseReadingsHeader } from "../HouseReadingsHeader/HouseReadingsHeader";
import {selectDevices, selectDisabledState} from "../../../../../Redux/ducks/readings/selectors";
import { setDevices } from "01/Redux/ducks/readings/actionCreators";

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

export type DisabledStateType = {
    deviceId: number,
    isDisabled: boolean
}[]



const HousesDevices: React.FC = () => {

    let { id: housingStockId }: ParamsType = useParams();
    const dispatch = useDispatch();
    const devices = useSelector(selectDevices);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const setInfoAsync = async () => {
                setIsLoading(true);
                const res = await requestDevicesByHouse(housingStockId);
                dispatch(setDevices(res.items));
            setIsLoading(false)
        };
        setInfoAsync();
    }, [housingStockId])

    if (isLoading) return null

    const deviceElems = devices
        .sort((device1, device2) => {
        return +device1.apartmentNumber - +device2.apartmentNumber
    })
        .map((device, index) => <HousesDeviceReadingLine
            key={device.id + 'f'}
            device={device}
        />)



    return (
        <div>
            <HouseReadingsHeader/>
            {deviceElems}
        </div>
    )
}

export default HousesDevices