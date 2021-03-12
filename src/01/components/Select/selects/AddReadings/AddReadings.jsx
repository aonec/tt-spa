import React, { useEffect, useState } from 'react'
import * as s from '01/r_comp'
import styled, { css } from 'reshadow/macro'
import { getDevicesByApartment } from '../../../../_api/readings_page'
import DeviceReadingForm from './DeviceReadingForm/DeviceReadingForm'
// import readingsReducer, {setDevices} from "../../../../Redux/reducers/readingsReducer";
import moment from 'moment'
import { formReadingsToPush } from '../../../../utils/formReadingsToPush'
import { setDevices } from '../../../../Redux/ducks/readings/actionCreators'
import { selectDevices } from '../../../../Redux/ducks/readings/selectors'
import { useDispatch, useSelector } from 'react-redux'

const initialState = {
    devices: [
        {
            resource: 'HotWaterSupply',
            mountPlace: 'Toilet',
            rateType: 'OneZone',
            readings: [
                {
                    id: 1764931,
                    hasError: true,
                    status: 'Unknown',
                    statusMessage: null,
                    value1: '52',
                    value2: null,
                    value3: null,
                    value4: null,
                    readingDate: '2020-10-31',
                    uploadTime: '2020-11-02T10:23:40.763871',
                },
            ],
            id: 974319,
            transactionType: null,
            model: 'СГВ',
            serialNumber: '32740910',
            managementFirm: {
                id: 2,
                name: 'ООО УК "Жилье"',
                phoneNumber: null,
                information: null,
                timeZoneOffset: '03:00:00',
            },
            lastCommercialAccountingDate: '2017-12-10T03:00:00',
            futureCommercialAccountingDate: '2017-12-10T03:00:00',
            lastCheckingDate: '2017-10-02T03:00:00',
            futureCheckingDate: '2023-10-02T03:00:00',
            closingDate: null,
        },
    ],
}

const AddReadings = ({ apartmentId, addReadings, readingsBlocked }) => {
    const [isLoading, setIsLoading] = useState(true)
    // const [devices, setDevices] = useState();

    // const [state, dispatch] = React.useReducer(readingsReducer, initialState);
    const dispatch = useDispatch()
    const devices = useSelector(selectDevices)

    useEffect(() => {
        async function getDevices() {
            setIsLoading(true)
            const devicesObj = await getDevicesByApartment(apartmentId)
            dispatch(setDevices(devicesObj))
            setIsLoading(false)
        }

        getDevices()
    }, [])

    useEffect(() => {
        const readingsToPush = formReadingsToPush(devices)
        addReadings(readingsToPush)
    }, [devices, readingsBlocked])

    if (isLoading) return 'ЗАГРУЗКА...'

    const readings = devices.map((device) => (
        <DeviceReadingForm
            readingsBlocked={readingsBlocked}
            key={device.id}
            device={device}
        />
    ))

    // console.log(devices);

    return styled(s.input)(
        <div style={{ gridArea: 'ar' }}>
            <input_frame data-disabled data-big style={{ marginBottom: 30 }}>
                <input disabled value={'Ввод показаний'} />
            </input_frame>
            {readings}
        </div>
    )
}

export default AddReadings
