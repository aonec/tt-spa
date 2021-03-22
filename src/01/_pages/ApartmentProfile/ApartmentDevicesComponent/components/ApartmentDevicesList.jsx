import React, { useContext } from 'react'
import { ApartmentDeviceItem } from './ApartmentDeviceItem'
import { ApartmentDevicesContext } from '../ApartmentDevices'

export function ApartmentDevicesList({ sliderIndex }) {
    const ApartmentDevicesListContext = useContext(ApartmentDevicesContext)

    const DevicesList = ApartmentDevicesListContext.map((device) => (
        // const {
        //   id, model, serialNumber, resource, futureCheckingDate,
        // } = value;
        <ApartmentDeviceItem device={device} sliderIndex={sliderIndex}/>
    ))

    return <>{DevicesList}</>
}
export default ApartmentDevicesList
