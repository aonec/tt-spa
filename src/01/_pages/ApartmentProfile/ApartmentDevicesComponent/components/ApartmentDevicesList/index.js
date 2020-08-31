import React, { useContext } from 'react';
import { ApartmentDeviceItem } from "../ApartmentDeviceItem";
import { ApartmentDevicesContext } from "../../ApartmentDevices";

export function ApartmentDevicesList(props){
  const ApartmentDevicesList = useContext(ApartmentDevicesContext);

  const DevicesList = ApartmentDevicesList.map((value, index) => {
    return <ApartmentDeviceItem index={index}/>;
  });

  return (
    <>
      {DevicesList}
      {/*{list}*/}
    </>
  );
}