import React, { useEffect, useState } from 'react';
import ChangeDeviceForm from './ChangeDeviceForm'
import {getClosedDevices} from "./apiChangeDevice";
import ButtonTT from "../../../../tt-components/ButtonTT";

const ChangeDevice = (props) => {
  const {device} = props;
  console.log('ChangeDevice');

  const [devices, setDevices] = useState()
  useEffect(()=>{
    getClosedDevices().then((res)=>{
      setDevices(res)
    })

  },[])

  const handleButton = () =>{
    console.log("handleButton")
    console.log(devices)
    console.log(device)
  }

  return (
    <div>ChangeDevice
      <ButtonTT onClick={handleButton}>handleButton</ButtonTT>
    {/*<ChangeDeviceForm />*/}
    </div>
  );
};

export default ChangeDevice;
