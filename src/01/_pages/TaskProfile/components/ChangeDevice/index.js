import React, { createContext, useEffect, useState } from 'react';

import { getClosedDevices, getOdpu } from './apiChangeDevice';
import { Header, ButtonTT } from '../../../../tt-components';
import SearchInputAndAdd from './components/SearchInputAndAdd';
import EmptyForm from './components/EmptyForm'
import EditForm from './components/EditForm'

export const ChangeDeviceContext = createContext();

const ChangeDevice = (props) => {
  // const { device } = props;

  const [devices, setDevices] = useState();
  const [device, setDevice] = useState()
  const [selected, setSelected] = useState();
  const [newDevice, setNewDevice] = useState();

  const [state, setState]=useState('empty')

  const ResForm = () =>{
    switch (state) {
      case "empty":
        return <div>empty
        <EmptyForm />
        </div>
      case "edit":
        if (!selected) {
          return <div>Загрузка</div>
        }
        return <div>edit
          <EditForm />
        </div>
      case "add":
        return <div>add</div>
      default:
        return <div>empty</div>
    }
  }

  useEffect(() => {
    getClosedDevices().then((res) => {
      setDevices(res);
    });

    getOdpu(props.device.id).then((result) => {
      setDevice(result);
    });
    console.log(1,2,3,4,5)
  }, []);


  if (!devices || !device) {
    return <div>Загрузка</div>;
  }

  const handleButton = () => {
    console.log(device)

  };
  const context = { device , devices, selected, setSelected, state, setState };



  console.log("deviceIndex", device)
  return (
    <ChangeDeviceContext.Provider value={context}>
      <div>
        <Header>
          Замена расходомера/термодатчика
        </Header>
        <SearchInputAndAdd />
        <ResForm />
      </div>
      <ButtonTT onClick={handleButton}>handleButton</ButtonTT>
    </ChangeDeviceContext.Provider>
  );
};

export default ChangeDevice;
