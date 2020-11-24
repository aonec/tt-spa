import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getApartmentDevices } from '01/_api/apartment_page';
import { Header } from './components/Header';
import { ApartmentDevicesList } from './components/ApartmentDevicesList';
import { ShowHidden } from './components/ShowHidden';

export const ApartmentDevicesContext = React.createContext();

export const ApartmentDevices = (props) => {
  const params = useParams();
  const apartmentId = params[1];
  const {devices} = props
  // const [devices, setDevices] = useState();

  // useEffect(() => {
  //   async function getDevicesWrap() {
  //     await getApartmentDevices(apartmentId).then((response) => setDevices(response));
  //   }
  //   getDevicesWrap();
  //   // console.log('useEffect');
  // }, []);

  // if (!devices) {
  //   return <div>Загрузка</div>
  // }
  const {items} = devices;

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
