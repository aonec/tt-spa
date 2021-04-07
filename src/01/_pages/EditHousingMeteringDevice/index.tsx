import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumb } from '../../tt-components';
import FormEditODPU from './components/EditOPDUForm';
import { HousingMeteringDeviceResponse } from '../../../myApi';
import { useAsync } from '../../hooks/useAsync';
import { getHousingMeteringDevice } from '../HousingProfile/apiHousingProfile';
import { Loader } from '../../components';
import { TabsItemInterface } from '../../tt-components/interfaces';
import Tabs from '../../tt-components/Tabs';
import Header from './components/Header';
import EditOdpuContext from './components/EditOdpuContext';
import ModalDeviceExists from '../../tt-components/ModalDeviceExists';

const EditODPU = () => {
  const { deviceId } = useParams();
  const [currentTabKey, setTab] = useState('1');
  const [existDevice, setExistDevice] = useState();
  const [alert, setAlert] = useState(false);
  const {
    data: device,
    status,
    run,
  } = useAsync<HousingMeteringDeviceResponse>();

  useEffect(() => {
    run(getHousingMeteringDevice(deviceId));
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
    return <Loader show={true} size={32} />;
  }

  if (status === 'error' || !device) {
    return <div style={{ background: 'red' }}>ОШИБКА</div>;
  }

  return (
    <EditOdpuContext.Provider value={context}>
      <Breadcrumb path={`/housingMeteringDevices/${deviceId}`} />
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
