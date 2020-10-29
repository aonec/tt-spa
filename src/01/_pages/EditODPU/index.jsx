import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ButtonTT, Header } from '../../tt-components';
import TabsComponent from './components/Tabs';
import FormEditODPU from './components/EditOPDUForm';
import axios from '../../axios';

const EditODPU = () => {
  const { 0: objid, 1: deviceId } = useParams();
  const [currentTabKey, setTab] = useState('1');
  const [device, setDevice] = useState();
  const [calculators, setCalculators] = useState();

  function handleChangeTab(value) {
    setTab(value);
  }

  // Получить устройство
  async function getOdpu(id = '') {
    try {
      const res = await axios.get(`HousingMeteringDevices/${id}`);
      console.log('HousingMeteringDevices', res);
      return res;
    } catch (error) {
      console.log(error);
      throw {
        resource: 'device',
        message: 'Произошла ошибка запроса ОДПУ',
      };
    }
  }

  async function getCalculators(objid = '') {
    try {
      const res = await axios.get(`Calculators?Filter.HousingStockId=${objid}`);
      console.log('Calculators', res);
      return res;
    } catch (error) {
      console.log(error);
      throw {
        resource: 'device',
        message: 'Произошла ошибка запроса Вычислителей в этом доме',
      };
    }
  }

  useEffect(async () => {
    const device = await getOdpu(deviceId);
    setDevice(device);

    const calculators = await getCalculators(objid);
    console.log(calculators);
    const selectCalculators = calculators.items.map((item) => {
      console.log(item);
      const label = `${item.model} (${item.serialNumber}) IP: ${item.connection.ipV4} (${item.connection.port})`;
      const value = item.id;
      return ({ ...item, label, value });
    });
    console.log(selectCalculators);
    setCalculators(selectCalculators);
  }, []);

  const buttonHandler = () => {
    console.log('buttonHandler');
    console.log(device);
    console.log(calculators);
  };

  if (device && calculators) {
    const model = device.model || 'Не указана модель';
    const serialNumber = device.serialNumber || 'Не указан серийный номер';
    return (
      <>
        <Header>{`${model} (${serialNumber}). Редактирование`}</Header>
        {/* <ButtonTT onClick={buttonHandler}>Button</ButtonTT> */}
        <TabsComponent
          currentTabKey={currentTabKey}
          handleChangeTab={handleChangeTab}
        />
        <FormEditODPU
          currentTabKey={currentTabKey}
          device={device}
          calculators={calculators}
        />
      </>
    );
  }
  return (<div>Загрузка данных</div>);
};
export default EditODPU;
