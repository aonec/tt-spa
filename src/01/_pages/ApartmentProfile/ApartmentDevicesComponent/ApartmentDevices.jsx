import React from 'react';
import { useParams } from 'react-router-dom';
import { Header } from './components/Header';
import { ApartmentDevicesList } from './components/ApartmentDevicesList';
import { ShowHidden } from './components/ShowHidden';

export const ApartmentDevicesContext = React.createContext();

export const ApartmentDevices = (props) => {
  const params = useParams();
  const { devices } = props;

  const { items } = devices || {};
  if (!items) {
    return (
      <div>
        Что-то пошло не так. Попробуйте выйти из сессии и зайти заново.
      </div>
    );
  }
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
