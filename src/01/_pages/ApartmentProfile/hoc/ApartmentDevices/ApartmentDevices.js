import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useParams } from 'react-router-dom';
import { getApartmentDevices } from '01/_api/apartment_page';
import { Header } from './components/Header';
import { ApartmentDevicesList } from './components/ApartmentDevicesList';
import { ShowHidden } from './components/ShowHidden';

export const ApartmentDevicesContext = React.createContext();

export const ApartmentDevices = () => {
  const params = useParams();
  const apartmentId = params[1];
  const [devices, setDevices] = useState({});
  const items = { ...devices.items };

  useEffect(() => {
    async function getDevicesWrap() {
      await getApartmentDevices(apartmentId).then((response) => setDevices(response));
    }
    getDevicesWrap();
    // console.log('useEffect');
  }, []);
  const buttonHandler = () => {
    console.log('apartmentId = ', apartmentId);
  };

  return (
    <>
      <ApartmentDevicesContext.Provider value={Object.values(items)}>
        <Header />
        <ApartmentDevicesList />
        <ShowHidden />
      </ApartmentDevicesContext.Provider>
    </>
  );
};
