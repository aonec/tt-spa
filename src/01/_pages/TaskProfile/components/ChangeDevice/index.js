import React, { createContext, useEffect, useState } from 'react';

import { getClosedDevices } from './apiChangeDevice';
import { Header, ButtonTT } from '../../../../tt-components';
import SearchInputAndAdd from './components/SearchInputAndAdd';
import EmptyForm from './components/EmptyForm'
import EditForm from './components/EditForm'

export const ChangeDeviceContext = createContext();

const ChangeDevice = (props) => {
  const { device } = props;

  const [devices, setDevices] = useState();
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
  }, []);

  if (!devices) {
    return <div>Загрузка</div>;
  }


  const handleButton = () => {
    console.log('handleButton');
    console.log(devices);
    console.log(device);
    console.log("selected", selected)
  };
  const context = { device, devices, selected, setSelected, state, setState };

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
