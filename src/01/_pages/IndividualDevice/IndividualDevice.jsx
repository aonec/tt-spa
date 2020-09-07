import React, { useState, useEffect } from "react";
import { Route, useParams } from "react-router-dom";
import { Grid } from "01/_components";
import {
  getInfo,
  getObjectOfDevice,
  getODPUTasks,
  getRelatedDevices,
} from "01/_api/individual_device_page";
import { Header } from "./components/Header";
import { Tabs } from "./components/Tabs";
import { Information } from "./components/Information";
import { Events } from "./components/Events";

// import { Changes } from './components/Changes';
// import { Documents } from './components/Documents';
// import { Connection } from './components/Connection';
// import { RelatedDevices } from './components/RelatedDevices';


export const DeviceContext = React.createContext();

export const IndividualDevice = (props) => {
  const { 0: objid, 1: apartmentId, 2: deviceId } = useParams();
  const [device, setDevice] = useState();
  const [building, setBuilding] = useState();
  const [tasks, setTasks] = useState();
 // const [related, setRelated] = useState();

  useEffect(() => {
    getInfo(deviceId).then((response) => setDevice(response));
    getObjectOfDevice(objid).then((response) => setBuilding(response));
    getODPUTasks(deviceId).then((response) => setTasks(response));
    // getRelatedDevices(deviceId).then((response) => setRelated(response));

    // console.log('tasks', tasks);
    // console.log('related', related);
  }, []);
  const path = `/objects/${objid}/apartments/${apartmentId}/devices/${deviceId}/`;
  const buttonHandler = () => {
    console.log("buttonHandler");
    console.log("device", device);
    console.log("building", building);
  };
  console.log(path)
  return (
    <>
      <DeviceContext.Provider
        value={{
          device,
          building,
          tasks,
          // related,
        }}
      >
        {/* <button onClick={buttonHandler}>button</button> */}
        <Header />
        <Tabs />
        <Route path={path}>
          <Grid>
            <Information />
            <Events title="Задачи с объектом" />
          </Grid>
        </Route>
      </DeviceContext.Provider>
    </>
  );
};

export default IndividualDevice;

// import React from 'react';

// export const IndividualDevice = () => {
//   console.log('test');
//   return <div>test</div>;
// };

// export default IndividualDevice;
