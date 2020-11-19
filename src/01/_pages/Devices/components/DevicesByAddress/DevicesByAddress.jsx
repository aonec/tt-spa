import React, {useEffect, useReducer, useState} from "react";
import {Subtitle} from "../../../../_components/Headers";
import DeviceBlock from "../DeviceBlock/DeviceBlock";

const DevicesByAddress = ({addressDevicesGroup}) => {
    debugger;
const {city, street, housingStockNumber, corpus, id} = addressDevicesGroup.address;
const deviceElems = addressDevicesGroup.devices.map((device) => <DeviceBlock device={device} />);

    return (
        <>
            <Subtitle fontWeight={400} to={`/objects/${id}`}>{`${city}, ${street}, ${housingStockNumber}${corpus ? `, к.${corpus}` : ''}`}</Subtitle>
            <div style={{borderTop: '1px solid var(--frame)', paddingTop: 24, marginTop: 7}}>{deviceElems}</div>
        </>
    )
}

export default DevicesByAddress;