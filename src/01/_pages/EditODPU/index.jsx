import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../tt-components';
import TabsComponent from './components/Main';
import { getDevice, getRelatedDevices } from '../../_api/device_page';
import FormEditODPU from './components/EditOPDUForm';

const EditODPU = () => {
  const { 0: objid, 1: deviceId } = useParams();
  const [currentTabKey, setTab] = useState('1');
  const [calculatorId, setCalculatorId] = useState();
  const [device, setDevice] = useState();
  const [object, setObject] = useState();

  function handleChangeTab(value){
    setTab(value);
  }

  useEffect(() => {
    getDevice(deviceId).then((res) => {
      setDevice(res);
    });
    getRelatedDevices(deviceId).then((res) => {
      const { id } = res[0];
      setCalculatorId(id);
    });
  }, []);

  if (device && calculatorId) {
    return (
      <>
        <Header>{`${device.model || 'Не указана модель'} (${device.serialNumber || 'Не указан серийный номер'}). Редактирование`}</Header>
        <TabsComponent
          currentTabKey={currentTabKey}
          handleChangeTab={handleChangeTab}
        />
        <FormEditODPU currentTabKey={currentTabKey} device={device} calculatorId={calculatorId}/>
      </>
    );
  }
  return (<div>Загрузка данных</div>);
};
export default EditODPU;
