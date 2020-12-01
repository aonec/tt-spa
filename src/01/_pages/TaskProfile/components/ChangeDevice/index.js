import React, { createContext, useEffect, useState } from 'react';
import { getClosedDevices, getOdpu } from './apiChangeDevice';
import { Header, ButtonTT } from '../../../../tt-components';
import SearchInputAndAdd from './components/SearchInputAndAdd';
import UniversalForm from './components/UnversalForm';

export const ChangeDeviceContext = createContext();

const ChangeDevice = (props) => {

  const [devices, setDevices] = useState();
  const [device, setDevice] = useState();
  const [selected, setSelected] = useState();
  const [newDevice, setNewDevice] = useState();

  const [state, setState] = useState('empty');

  const emptyDisabled = ['serialNumber',
    'lastCheckingDate',
    'futureCheckingDate',
    'lastCommercialAccountingDate',
    'futureCommercialAccountingDate',
    'housingMeteringDeviceType',
    'resource',
    'model',
    'isConnected',
    'entryNumber',
    'hubNumber',
    'pipeNumber',
    'calculatorId'];

  const editDisabled = ['serialNumber',
    'lastCheckingDate',
    'resource',
    'model',
    'isConnected',
    'entryNumber',
    'hubNumber',
    'pipeNumber',
    'calculatorId'];

  const addDisabled = [
    'housingMeteringDeviceType',
    'resource',
    'isConnected',
    'entryNumber',
    'hubNumber',
    'pipeNumber',
    'calculatorId'];

  const [disabled, setDisabled] = useState(emptyDisabled);


  useEffect(() => {
    getClosedDevices().then((res) => {
      setDevices(res);
    });
    getOdpu(props.device.id).then((result) => {
      setDevice(result);
    });
  }, []);

  useEffect(() => {
    switch (state) {
      case 'empty':
        setDisabled(emptyDisabled);
        break;
      case 'edit':
        setDisabled(editDisabled);
        break;
      case 'add':
        setDisabled(addDisabled);
        break;
      default:
        setDisabled(emptyDisabled);
    }
  }, [state]);



  if (!devices || !device) {
    return <div>Загрузка</div>;
  }

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
        <UniversalForm disabled={disabled} />
      </div>
      <ButtonTT onClick={handleButton}>handleButton</ButtonTT>
    </ChangeDeviceContext.Provider>
  );
};

export default ChangeDevice;
