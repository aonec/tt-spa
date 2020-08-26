import React, {useEffect, useState, useContext} from 'react';
import {Header} from "./components/Header";
import {ApartmentDevicesList} from './components/ApartmentDevicesList'
import {ShowHidden} from "./components/ShowHidden";
import {Button} from "antd";
import {Route, useRouteMatch, useParams, useHistory} from "react-router-dom"
import {getApartmentDevices} from '01/_api/apartment_page';

export const ApartmentDevicesContext = React.createContext()

export const ApartmentDevices = () => {
  const params = useParams();
  const apartmentId = params[1];
  const [apartment, setapartment] = useState({})
  const [tasks, setTasks] = useState({})

  const items = {...tasks.items}

  useEffect(() => {
    async function getDevicesWrap() {
      await getApartmentDevices(apartmentId).then(response => (setTasks(response)));
    }

    getDevicesWrap();
    console.log('useEffect')
  }, []);
  const buttonHandler = () => {
    console.log('apartmentId = ', apartmentId)
    console.log(tasks)
    console.log(items)

  }

  return (
    <>
      <ApartmentDevicesContext.Provider  value={Object.values(items)}>
        <Header/>
        <ApartmentDevicesList/>
        <ShowHidden/>
        <Button onClick={buttonHandler}>GetInfo</Button>
      </ApartmentDevicesContext.Provider>
    </>
  )
}