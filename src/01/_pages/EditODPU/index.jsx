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

  async function getCalculators(objid = '') {
    try {
      const res = await axios.get(`HousingStocks/${objid}/Devices`);
      return res;
    } catch (error) {
      console.log(error);
      throw {
        resource: 'device',
        message: 'Произошла ошибка запроса ОДПУ',
      };
    }
  }

  async function getODPU(id = '') {
    try {
      const res = await axios.get(`HousingMeteringDevices/${id}`);
      return res;
    } catch (error) {
      console.log(error);
      throw {
        resource: 'device',
        message: 'Произошла ошибка запроса ОДПУ',
      };
    }
  }

  useEffect(() => {
    getODPU(deviceId).then((res) => {
      setDevice(res);
    });
    getCalculators(objid).then((res) => {
      let selectCalculators = [];
      res.devices.map((item) => {
        if (item.type === 'Calculator') {
          const label = `${item.model} (${item.serialNumber}) IP: 8.8.8.8 (1234)`;
          const value = item.id;
          selectCalculators = [...selectCalculators, {...item, label, value}]
        }
      });
      setCalculators(selectCalculators);
    });
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
        <ButtonTT onClick={buttonHandler}>Button</ButtonTT>
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
