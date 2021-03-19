import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import { Header } from './components/Header'
import { ApartmentDevicesList } from './components/ApartmentDevicesList'
import { ShowHidden } from './components/ShowHidden'
import {getMonthFromDate} from "../../../utils/getMonthFromDate";

export const ApartmentDevicesContext = React.createContext()

export const ApartmentDevices = (props) => {
    const params = useParams()
    const { devices } = props
    const [sliderIndex, setSliderIndex] = useState(0)
    if (!devices) return null

    const { items } = devices || {}
    if (!items) {
        return (
            <div>
                Что-то пошло не так. Попробуйте выйти из сессии и зайти заново.
            </div>
        )
    }

    const currentMonth = getMonthFromDate()
    const isReadingsCurrent =
        currentMonth === getMonthFromDate(devices[0]?.readings[0].readingDate)
    const readingsLength = devices[0]?.readings?.length

    return (
        <>
            <ApartmentDevicesContext.Provider value={Object.values(items)}>
                <Header sliderIndex={sliderIndex}
                        setSliderIndex={setSliderIndex}
                        isReadingsCurrent={isReadingsCurrent}
                        readingsLength={readingsLength}/>
                <ApartmentDevicesList sliderIndex={sliderIndex}/>
                <ShowHidden />
            </ApartmentDevicesContext.Provider>
        </>
    )
}
