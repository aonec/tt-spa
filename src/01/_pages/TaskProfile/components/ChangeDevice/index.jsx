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
const ChangeDevice = ({ taskState }) => {
  const deviceType = taskState.device.type;
  const deviceId = taskState.device.id;
  const taskId = taskState.id;
  const perpetratorName = taskState.perpetrator.name;

  const [devices, setDevices] = useState();
  const [device, setDevice] = useState();
  const [selected, setSelected] = useState();
  const [state, setState] = useState('empty');
  const [disabled, setDisabled] = useState();

  useEffect(() => {
    getClosedDevices().then((res) => {
      setDevices(res);
    });

    if (deviceType === 'Calculator') {
      getCalculator(deviceId).then((result) => {
        setDevice(result);
        setSelected(calculatorTemplate);
      });
    } else {
      getOdpu(deviceId).then((result) => {
        setDevice(result);
        setSelected(selectedTemplate);
      });
    }
    setDisabled(disabledValuesByType[deviceType][state]);
  }, []);

  useEffect(() => {
    setDisabled(disabledValuesByType[deviceType][state]);
  }, [state]);

  if (deviceType === 'Calculator') {
    if (!device || !devices || !selected) {
      return <Loader size="64" show />;
    }
    const context = {
      device,
      devices,
      selected,
      setSelected,
      state,
      setState,
      deviceType,
      disabled,
      taskId,
      perpetratorName,
    };

    return (
      <ChangeDeviceContext.Provider value={context}>
        <Header>Замена вычислителя</Header>
        <SearchInputAndAdd />
        <CalculatorChangeForm />
      </ChangeDeviceContext.Provider>
    );
  }

  if (deviceType !== 'FlowMeter' || 'ThermoSensor') {
    if (!device || !devices || !selected) {
      return <Loader size="64" show />;
    }
    const context = {
      device, devices, selected, setSelected, state, setState, deviceType, disabled, taskId,
    };
    return (
      <ChangeDeviceContext.Provider value={context}>
        <Header>Замена расходомера/термодатчика</Header>
        <SearchInputAndAdd />
        <HousingChangeForm />
      </ChangeDeviceContext.Provider>
    );
  }
  return <Loader size="64" show />;
};
export default ChangeDevice;
