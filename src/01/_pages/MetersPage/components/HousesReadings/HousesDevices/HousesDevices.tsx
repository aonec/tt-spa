import React, {useEffect, useReducer} from "react";
import {requestDevicesByHouse, ReadingsStateType, requestHouse, HouseType} from "../../../../../_api/houses_readings_page";
import { useSelector, useDispatch } from 'react-redux'
import { useState } from "react";
import { useParams } from "react-router-dom"
import styled from "styled-components";
import { HousesDeviceReadingLine } from "../DeviceReadingLine/HousesDeviceReadingLine";
import { HouseReadingsHeader } from "../HouseReadingsHeader/HouseReadingsHeader";
import {selectDevices, selectDisabledState} from "../../../../../Redux/ducks/readings/selectors";
import { setDevices } from "01/Redux/ducks/readings/actionCreators";
import Arrow from "01/_components/Arrow/Arrow";
import {Icon} from "../../../../../components/Icon";

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
        <div>
            <AddressHeader>
                {house.city}, {house.street}, {house.number}{house.corpus ? `,${house.corpus}` : ''}
            </AddressHeader>
            <InfoSticker>
                <InfoHeader>
                    <div><Icon icon="down" /></div>
                    Информация о доме
                </InfoHeader>
                <InfoContent>
                    <InfoColumn>
                        <InfoRow>
                            <InfoItemHeader>
                                Район
                            </InfoItemHeader>
                            <InfoItem>
                                {house.district ?? 'Нет данных'}
                            </InfoItem>
                        </InfoRow>
                        <InfoRow>
                            <InfoItemHeader>
                                Тип дома
                            </InfoItemHeader>
                            <InfoItem>
                                {house.houseCategory ?? 'Нет данных'}
                            </InfoItem>
                        </InfoRow>
                        <InfoRow>
                            <InfoItemHeader>
                                Год постройки
                            </InfoItemHeader>
                            <InfoItem>
                                {house.constructionDate ?? 'Нет данных'}
                            </InfoItem>
                        </InfoRow>
                    </InfoColumn>
                    <InfoColumn>
                        <InfoRow>
                            <InfoItemHeader>
                                Управляющая компания
                            </InfoItemHeader>
                            <InfoCompany>
                                Нет данных
                            </InfoCompany>
                        </InfoRow>
                        <InfoRow>
                            <InfoItemHeader>
                                Информация об УК
                            </InfoItemHeader>
                            <InfoItem>
                                Нет данных
                            </InfoItem>
                        </InfoRow>
                    </InfoColumn>
                </InfoContent>
            </InfoSticker>
            <HouseReadingsHeader/>
            {deviceElems}
        </div>
    )
}

export default HousesDevices

const AddressHeader = styled.h2`
margin-left: 8px;
margin-bottom: 16px;
font-weight: 400;
font-size: 24px;
line-height: 32px;
`

const InfoSticker = styled.div`
  height: auto;
  padding: 16px;
  box-shadow: var(--shadow);
`

const InfoHeader = styled.div`
  display: flex;
  font-size: 16px;
  line-height: 32px;
`

const InfoContent = styled.div`
display: flex;
gap: 16px;
`

const InfoColumn = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  `

const InfoRow = styled.div`
display: flex;
padding: 16px 8px 16px;
border-bottom: 1px solid var(--frame);
`

const InfoItem = styled.div`
width: 50%;
`

const InfoCompany = styled.div`
  width: 50%;
  font-weight: 500;
`

const InfoItemHeader = styled.div`
width: 50%;
font-size: 14px;
line-height: 16px;
color: var(--main-70);
`


