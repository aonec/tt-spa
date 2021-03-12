import React, { useContext } from 'react'
import styled from 'styled-components'
import ApartmentDevice from './ApartmentDevice'
import { ApartmentInput } from './ApartmentInput'
import { ApartmentDevicesHistory } from './ApartmentDevicesHistory'
import { convertDate } from '../../../../_api/utils/convertDate'

const DeviceIitem = styled.div`
    display: grid;
    grid-template-columns: 5fr 2fr 2fr 3fr;
    padding: 0 16px 16px;
    border-bottom: 1px solid #dcdee4;
`

export function ApartmentDeviceItem(props) {
    const { id, model, serialNumber, resource, futureCheckingDate } = props
    return (
        <DeviceIitem>
            <ApartmentDevice
                model={model}
                serialNumber={serialNumber}
                resource={resource}
                creationDate="запрос данных"
                futureCheckingDate={convertDate(futureCheckingDate)}
                id={id}
            />
            <ApartmentInput />
            <ApartmentInput />
            <ApartmentDevicesHistory />
        </DeviceIitem>
    )
}

export default ApartmentDeviceItem
