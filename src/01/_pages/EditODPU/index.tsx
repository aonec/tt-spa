import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumb, Header } from '../../tt-components';
import FormEditODPU from './components/EditOPDUForm';
import { getOdpu, getCalculators } from './components/apiEditOdpu';
import { HousingMeteringDeviceResponse } from '../../../myApi';
import { useAsync } from '../../hooks/useAsync';
import { getHousingMeteringDevice } from '../HousingProfile/apiHousingProfile';
import { Loader } from '../../components';
import { TabsItemInterface } from '../../tt-components/interfaces';
import Tabs from '../../tt-components/Tabs';

export const EditOdpuContext = React.createContext<any>({});

const EditODPU = () => {
  const { deviceId } = useParams();
  const [currentTabKey, setTab] = useState('1');
  const {
    data: device,
    status,
    run,
  } = useAsync<HousingMeteringDeviceResponse>();

  function handleChangeTab(value: string) {
    setTab(value);
  }

  console.log(device);
  useEffect(() => {
    run(getHousingMeteringDevice(deviceId));
  }, [deviceId]);

  if (!device) {
    return <Loader show={true} />;
  }

  const { model, serialNumber } = device;

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
  return (
    <EditOdpuContext.Provider value={context}>
      <Breadcrumb path={`/housingMeteringDevices/${deviceId}`} />
      <Header>{`${model} (${serialNumber}). Редактирование`}</Header>
      <Tabs tabItems={tabItems} tabsType={'tabs'} activeKey={currentTabKey} />
      <FormEditODPU
        currentTabKey={currentTabKey}
        device={device}
        setTab={setTab}
      />
    </EditOdpuContext.Provider>
  );
};
export default EditODPU;

// useEffect(() => {
// async function getData() {
// const device = await getOdpu(deviceId);
// setDevice(device);
// const calculators = await getCalculators(device.address.id);
// const selectCalculators = calculators.items.map((item) => {
//   const label = `${item.model} (${item.serialNumber}) IP: ${item.connection?.ipV4} (${item.connection?.port})`;
//   const value = item.id;
//   const key = item.id;
//   return { ...item, label, value, key };
// });
// setCalculators(selectCalculators);
// }
// getData();
// }, []);
