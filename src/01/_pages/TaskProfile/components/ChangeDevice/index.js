import React, { createContext, useEffect, useState } from 'react';
import ChangeDeviceForm from './ChangeDeviceForm';
import Complete from './SearchInput';
import { getClosedDevices } from './apiChangeDevice';
import { Header , ButtonTT} from '../../../../tt-components';

export const ChangeDeviceContext = createContext();
const ChangeDevice = (props) => {
  const { device } = props;
  console.log('ChangeDevice');

  const [devices, setDevices] = useState();
  useEffect(() => {
    getClosedDevices().then((res) => {
      setDevices(res);
    });
  }, []);

  if (!devices) {
    return <div>Загрузка</div>
  }

  const handleButton = () => {
    console.log('handleButton');
    console.log(devices);
    console.log(device);
  };
  const context = { device, devices };

  return (
    <ChangeDeviceContext.Provider value={context}>
      <div>
        <Header>
          ChangeDevice
        </Header>
        <Complete />
        <ButtonTT onClick={handleButton}>handleButton</ButtonTT>

        {/* <ChangeDeviceForm /> */}
      </div>
    </ChangeDeviceContext.Provider>
  );
};

export default ChangeDevice;
