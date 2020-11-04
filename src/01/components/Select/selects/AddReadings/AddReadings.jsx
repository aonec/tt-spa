import React, {useEffect, useState} from 'react';
import * as s from '01/r_comp';
import styled, { css } from 'reshadow/macro';
import {getDevicesByApartment} from "../../../../_api/readings_page";
import DeviceReadingForm from "./DeviceReadingForm/DeviceReadingForm";



const AddReadings = ({apartmentId}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [stage, setStage] = useState();
    const [devices, setDevices] = useState();

    useEffect( () => {
        async function getDevices() {
            setIsLoading(true)
            const devicesObj = await getDevicesByApartment(apartmentId);
            setDevices(devicesObj);
            setIsLoading(false)
        }

        getDevices()

    },[])

    if (isLoading) return 'ЗАГРУЗКА...'

    const readings = devices.map((device) => <DeviceReadingForm key={device.id} device={device} />)

    console.log(devices);

    return styled(s.input)(
    <div>
        <input_frame data-disabled data-big style={{marginBottom: 30}}>
            <input disabled value={'Ввод показаний'}/>
        </input_frame>
        {readings}
    </div>
    )
}

export default AddReadings;