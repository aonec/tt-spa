import React, {useEffect} from "react";
import {requestDevicesByHouse, requestHouse, HouseType} from "../../../../../_api/houses_readings_page";
import { useSelector, useDispatch } from 'react-redux'
import { useState } from "react";
import { useParams } from "react-router-dom"
import styled from "styled-components";
import { HousesDeviceReadingLine } from "../DeviceReadingLine/HousesDeviceReadingLine";
import { HouseReadingsHeader } from "../HouseReadingsHeader/HouseReadingsHeader";
import {selectDevices} from "../../../../../Redux/ducks/readings/selectors";
import { setDevices } from "01/Redux/ducks/readings/actionCreators";
import HouseBanner from "./HouseBanner";

type ParamsType = {
    id: string
}


const HousesDevices: React.FC = ({openModal}) => {

    let { id: housingStockId }: ParamsType = useParams();
    const dispatch = useDispatch();
    const devices = useSelector(selectDevices);
    const [house, setHouse] = useState<HouseType>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const setInfoAsync = async () => {
            setIsLoading(true);
            const res = await requestDevicesByHouse(housingStockId);
            const houseObject = await requestHouse(housingStockId);
            setHouse(houseObject);
            dispatch(setDevices(res.items));
            setIsLoading(false)
        };
        setInfoAsync();
    }, [housingStockId])

    if (isLoading || !house) return null

    const deviceElems = devices
        .sort((device1, device2) => {
            return +device1.apartmentNumber - +device2.apartmentNumber
        })
        .map((device, index) => <HousesDeviceReadingLine
            key={device.id + 'f'}
            device={device}
        />)

    return (
        <>
            <HouseBanner house={house}/>
            <HouseReadingsHeader/>
            {deviceElems}
        </>
    )
}

export default HousesDevices



