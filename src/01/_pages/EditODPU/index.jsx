import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../tt-components';
import TabsComponent from './components/Tabs';
import {
  getODPU, getDevice, getRelatedDevices, getObjectOfDevice,
} from '../../_api/device_page';
import FormEditODPU from './components/EditOPDUForm';

const EditODPU = () => {
  const { 0: objid, 1: deviceId } = useParams();
  const [currentTabKey, setTab] = useState('1');
  const [device, setDevice] = useState();

  function handleChangeTab(value) {
    setTab(value);
  }

  useEffect(() => {
    getODPU(deviceId).then((res) => {
      setDevice(res);
      console.log(res)
    });
  }, []);

  if (device) {
    const model = device.model || 'Не указана модель';
    const serialNumber = device.serialNumber || 'Не указан серийный номер';
    return (
      <>
        <Header>{`${model} (${serialNumber}). Редактирование`}</Header>
        <TabsComponent
          currentTabKey={currentTabKey}
          handleChangeTab={handleChangeTab}
        />
        <FormEditODPU
          currentTabKey={currentTabKey}
          device={device}
        />
      </>
    );
  }
  return (<div>Загрузка данных</div>);
};
export default EditODPU;
