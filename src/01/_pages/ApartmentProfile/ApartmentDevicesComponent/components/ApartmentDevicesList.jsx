import React, { useContext } from 'react'
import { ApartmentDeviceItem } from './ApartmentDeviceItem'
import { ApartmentDevicesContext } from '../ApartmentDevices'

export function ApartmentDevicesList() {
    const ApartmentDevicesListContext = useContext(ApartmentDevicesContext)

    const DevicesList = ApartmentDevicesListContext.map((value) => (
        <ApartmentDeviceItem {...value} />
    ))

    return <>{DevicesList}</>
}
export default ApartmentDevicesList
