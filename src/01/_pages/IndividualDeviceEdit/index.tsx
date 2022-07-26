import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Header } from './components/Header';
import { Loader } from '../../components';
import { useAsync } from '../../hooks/useAsync';
import { IndividualDeviceResponse } from '.../../api/types';
import { TabsItemInterface } from '../../tt-components/interfaces';
import { getIndividualDevice } from '../../_api/apiRequests';
import IndividualDeviceEditForm from './components/IndividualDeviceEditForm';
import Tabs from '../../tt-components/Tabs';
import ModalDeviceExists from '../../tt-components/ModalDeviceExists';

export const IndividualDeviceEdit = () => {
  const { push } = useHistory();
  const { deviceId } = useParams<{ deviceId: string }>();
  const path = `/individualDevices/${deviceId}`;
  const { data: device, status, run } = useAsync<IndividualDeviceResponse>();
  const [currentTabKey, setTab] = useState('1');
  const [alert, setAlert] = useState(false);
  const [existDevice, setExistDevice] = useState();

  useEffect(() => {
    run(getIndividualDevice(Number(deviceId)));
  }, [deviceId]);

  if (!device) {
    return <Loader size={'32'} show />;
  }
  const tabItems: Array<TabsItemInterface> = [
    {
      title: 'Общая информация',
      key: '1',
      cb: () => {
        setTab('1');
      },
    },
    {
      title: 'Документы',
      key: '2',
      cb: () => {
        setTab('2');
      },
    },
  ];
  return (
    <>
      {status === 'error' ? (
        <div style={{ background: 'red' }}>ОШИБКА</div>
      ) : null}
      {status === 'pending' || status === 'idle' ? (
        <Loader size={'32'} show />
      ) : null}
      {status === 'resolved' ? (
        <>
          <Header device={device} />
          <Tabs
            tabItems={tabItems}
            tabsType={'route'}
            activeKey={currentTabKey}
          />
          <IndividualDeviceEditForm
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
            type={'individualDevice'}
          />
        </>
      ) : null}
    </>
  );
};

export default IndividualDeviceEdit;
