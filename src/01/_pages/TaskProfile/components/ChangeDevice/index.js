import React, { createContext, useEffect, useState } from 'react';
import { getClosedDevices, getOdpu, pushStage } from './apiChangeDevice';
import { Header, ButtonTT } from '../../../../tt-components';
import SearchInputAndAdd from './components/SearchInputAndAdd';
import UniversalForm from './components/UnversalForm';
import {disabledValuesByType, selectedTemplate} from './components/localBase'
import moment from "moment";

export const ChangeDeviceContext = createContext();
const ChangeDevice = (props) => {
  console.log(props)
  const [devices, setDevices] = useState();
  const [taskId, setTaskId] = useState(props.state.id)

  const [device, setDevice] = useState();
  const [selected, setSelected] = useState(selectedTemplate);

  const [newDevice, setNewDevice] = useState();

  const [state, setState] = useState('empty');

  const [disabled, setDisabled] = useState(disabledValuesByType[state]);

  useEffect(() => {
    getClosedDevices().then((res) => {
      setDevices(res);
    });
    getOdpu(props.device.id).then((result) => {
      setDevice(result);
    });
  }, []);

  useEffect(() => {
    setDisabled(disabledValuesByType[state])
  }, [state]);

  if (!devices || !device) {
    return <div>Загрузка</div>;
  }

  console.log(moment().toISOString())

  const handleButton = () => {
    console.log(device);
  };
  const context = {
    device, devices, selected, setSelected, state, setState,
  };

  return (
    <ChangeDeviceContext.Provider value={context}>
      <div>
        <Header>
          Замена расходомера/термодатчика
        </Header>
        <SearchInputAndAdd />
        <UniversalForm disabled={disabled} taskId={taskId} />
      </div>
      <ButtonTT onClick={handleButton}>handleButton</ButtonTT>
    </ChangeDeviceContext.Provider>
  );
};

export default ChangeDevice;
