import React, { createContext, useEffect, useState } from 'react';
import { getCalculator, getClosedDevices, getOdpu, pushStage } from './apiChangeDevice';
import { Header, ButtonTT } from '../../../../tt-components';
import SearchInputAndAdd from './components/SearchInputAndAdd';
import HousingChangeForm from './components/HousingChangeForm';
import CalculatorChangeForm from "./components/CalculatorChangeForm";
import {disabledValuesByType, selectedTemplate} from './components/localBase'
import moment from "moment";

export const ChangeDeviceContext = createContext();
const ChangeDevice = (props) => {
  console.log(props)
  const [devices, setDevices] = useState();
  const deviceType = props.device.type;
  console.log("deviceType", deviceType)
  const [taskId, setTaskId] = useState(props.state.id)

  const [device, setDevice] = useState();
  const [selected, setSelected] = useState(selectedTemplate);

  const [newDevice, setNewDevice] = useState();

  const [state, setState] = useState('empty');

  const [disabled, setDisabled] = useState(disabledValuesByType[deviceType][state]);

  // console.log(disabledValuesByType[deviceType][state])

  useEffect(() => {
    getClosedDevices().then((res) => {
      setDevices(res);
    });

    if (deviceType === 'Calculator') {
      console.log("Calculator")

      getCalculator(props.device.id).then((result) => {
        setDevice(result);
        console.log(result)
      });
    }
    if (deviceType !== 'Calculator') {

      getOdpu(props.device.id).then((result) => {
        setDevice(result);
        console.log(result)
      });
    }


  }, []);

  useEffect(() => {
    setDisabled(disabledValuesByType[deviceType][state])
  }, [state]);

  if (!devices || !device) {
    return <div>Загрузка</div>;
  }

  console.log(moment().toISOString())

  const handleButton = () => {
    console.log(device);
  };
  const context = {
    device, devices, selected, setSelected, state, setState, deviceType, disabled,taskId
  };

  return (
    <ChangeDeviceContext.Provider value={context}>
      <div>
        <Header>
          Замена расходомера/термодатчика
        </Header>
        <SearchInputAndAdd />
        {deviceType === 'Calculator'? <CalculatorChangeForm /> : <HousingChangeForm />}

      </div>
      {/*<ButtonTT onClick={handleButton}>handleButton</ButtonTT>*/}
    </ChangeDeviceContext.Provider>
  );
};

export default ChangeDevice;
