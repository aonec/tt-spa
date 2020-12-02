import React, { createContext, useEffect, useState } from 'react';
import {
  getCalculator, getClosedDevices, getOdpu,
} from './apiChangeDevice';
import { Header, ButtonTT } from '../../../../tt-components';
import SearchInputAndAdd from './components/SearchInputAndAdd';
import HousingChangeForm from './components/HousingChangeForm';
import CalculatorChangeForm from './components/CalculatorChangeForm';
import { disabledValuesByType, selectedTemplate, calculatorTemplate } from './components/localBase';
import { Loader } from '../../../../_components/Loader';

export const ChangeDeviceContext = createContext();
const ChangeDevice = (props) => {
  const deviceType = props.device.type;
  const taskId = props.state.id;

  const [devices, setDevices] = useState();
  const [device, setDevice] = useState();
  const [selected, setSelected] = useState();
  const [state, setState] = useState('empty');
  const [disabled, setDisabled] = useState();

  useEffect(() => {
    const { id } = props.device;
    getClosedDevices().then((res) => {
      setDevices(res);
    });

    if (deviceType === 'Calculator') {
      getCalculator(id).then((result) => {
        setDevice(result);
        setSelected(calculatorTemplate)
        console.log(result)
      });
    } else {
      getOdpu(id).then((result) => {
        setDevice(result);
        setSelected(selectedTemplate)
      });
    }

    setDisabled(disabledValuesByType[deviceType][state])
  }, []);

  useEffect(() => {
    setDisabled(disabledValuesByType[deviceType][state]);
  }, [state]);

  if (!devices || !device) {
    return <Loader size="64" show />;
  }

  const context = {
    device, devices, selected, setSelected, state, setState, deviceType, disabled, taskId,
  };

  return (
    <ChangeDeviceContext.Provider value={context}>
      <Header>
        Замена расходомера/термодатчика
      </Header>
      <SearchInputAndAdd />
      {deviceType === 'Calculator' ? <CalculatorChangeForm /> : <HousingChangeForm />}
    </ChangeDeviceContext.Provider>
  );
};

export default ChangeDevice;
