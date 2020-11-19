import React, {useEffect, useReducer, useState} from "react";
import {Subtitle} from "../../../../_components/Headers";
import DeviceBlock from "../DeviceBlock/DeviceBlock";

const DevicesByAddress = ({addressDevicesGroup}) => {
const {city = '', street = '', housingStockNumber = null, corpus = null, id = null} = addressDevicesGroup?.address || {};
const deviceElems = addressDevicesGroup.devices.map((device) => <DeviceBlock device={device} />);

    return (
        <>
            {addressDevicesGroup.address
                ? <Subtitle fontWeight={400} to={`/objects/${id}`}>
                    {`${city}, ${street}, ${housingStockNumber}${corpus ? `, к.${corpus}` : ''}`}
            </Subtitle>
                : 'У данного прибора не указан адрес'
            }
            <div style={{borderTop: '1px solid var(--frame)', paddingTop: 24, marginTop: 7}}>{deviceElems}</div>
        </>
    )
}

export default DevicesByAddress;