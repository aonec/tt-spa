import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import { Header } from './components/Header'
import { ApartmentDevicesList } from './components/ApartmentDevicesList'
import { ShowHidden } from './components/ShowHidden'
import {getMonthFromDate} from "../../../utils/getMonthFromDate";
import {IndividualDeviceListResponse, IndividualDeviceListResponsePagedList} from "../../../../myApi";

export const ApartmentDevicesContext = React.createContext<IndividualDeviceListResponse[] | null>(null)

export const ApartmentDevices = ({ devices }: { devices: IndividualDeviceListResponsePagedList }) => {

    //TODO
    //Check with/without current readings
    const [sliderIndex, setSliderIndex] = useState(0)

    const { items } = devices || {}
    if (!items?.length) {
        return (
            <div>
                Что-то пошло не так. Попробуйте выйти из сессии и зайти заново.
            </div>
        )
    }

    const currentMonth = getMonthFromDate()
    const isReadingsCurrent =
        currentMonth === getMonthFromDate(items[0].readings![0].readingDate)
    const readingsLength = items[0]?.readings?.length

    if (!readingsLength) return null

    return (
            <ApartmentDevicesContext.Provider value={items}>
                {/*<div style={{maxWidth: 1200}}>*/}
                <Header sliderIndex={sliderIndex}
                        setSliderIndex={setSliderIndex}
                        isReadingsCurrent={isReadingsCurrent}
                        readingsLength={readingsLength}/>
                <ApartmentDevicesList sliderIndex={sliderIndex}/>
                <ShowHidden />
                {/*</div>*/}
            </ApartmentDevicesContext.Provider>
    )
}
