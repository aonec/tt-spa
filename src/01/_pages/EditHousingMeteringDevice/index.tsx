import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormEditODPU from './components/EditOPDUForm';
import { useAsync } from '../../hooks/useAsync';
import { getHousingMeteringDevice } from '../HousingProfile/apiHousingProfile';
import { Loader } from '../../components';
import { TabsItemInterface } from '../../tt-components/interfaces';
import Tabs from '../../tt-components/Tabs';
import Header from './components/Header';
import EditOdpuContext from './components/EditOdpuContext';
import ModalDeviceExists from '../../tt-components/ModalDeviceExists';
import { GoBack } from '../../../ui-kit/shared_components/GoBack';
import { PipeHousingMeteringDeviceResponse } from '../../../api/types';

const EditODPU = () => {
  const { deviceId } = useParams<{deviceId:string}>();
  const [currentTabKey, setTab] = useState('1');
  const [existDevice, setExistDevice] = useState();
  const [alert, setAlert] = useState(false);
  const {
    data: device,
    status,
    run,
  } = useAsync<PipeHousingMeteringDeviceResponse>();

  useEffect(() => {
    run(getHousingMeteringDevice(Number(deviceId)));
  }, [deviceId]);

  const context = { device, currentTabKey, setTab };
  const tabItems: Array<TabsItemInterface> = [
    {
      title: 'Общие данные',
      key: '1',
      cb: () => setTab('1'),
    },
    {
      title: 'Документы',
      key: '2',
      cb: () => setTab('2'),
    },
  ];

  if (status === 'pending' || status === 'idle') {
    return <Loader show size={32} />;
  }

  if (status === 'error' || !device) {
    return <div style={{ background: 'red' }}>ОШИБКА</div>;
  }

  return (
    <EditOdpuContext.Provider value={context}>
      <GoBack path={`/housingMeteringDevices/${deviceId}`} />
      <Header device={device} />
      <Tabs tabItems={tabItems} tabsType={'tabs'} activeKey={currentTabKey} />
      <FormEditODPU
        currentTabKey={currentTabKey}
        device={device}
        setTab={setTab}
        setAlert={setAlert}
        setExistDevice={setExistDevice}
      />
      <ModalDeviceExists
        existDevice={existDevice}
        setVisible={setAlert}
        visible={alert}
        type={'housingMeteringDevice'}
      />
    </EditOdpuContext.Provider>
  );
};
export default EditODPU;
