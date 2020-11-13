import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ButtonTT, Header } from '../../tt-components';
import TabsComponent from './components/Tabs';
import FormEditODPU from './components/EditOPDUForm';
import Breadcrumb from '../../tt-components/Breadcrumb/Breadcrumb';
import { getOdpu, getCalculators } from './components/apiEditOdpu';
import { EditCalculatorContext } from '../EditCalculator';

export const EditOdpuContext = React.createContext();

const EditODPU = () => {
  const { deviceId } = useParams();
  const [currentTabKey, setTab] = useState('1');
  const [device, setDevice] = useState();
  const [calculators, setCalculators] = useState();

  function handleChangeTab(value) {
    setTab(value);
  }

  useEffect(() => {
    async function getData() {
      const device = await getOdpu(deviceId);
      setDevice(device);
      const calculators = await getCalculators(device.address.id);
      const selectCalculators = calculators.items.map((item) => {
        const label = `${item.model} (${item.serialNumber}) IP: ${item.connection?.ipV4} (${item.connection?.port})`;
        const value = item.id;
        return ({ ...item, label, value });
      });
      setCalculators(selectCalculators);
    }
    getData();
  }, []);

  if (device && calculators) {
    const model = device.model || 'Не указана модель';
    const serialNumber = device.serialNumber || 'Не указан серийный номер';

    const context = { device, calculators, currentTabKey };

    return (
      <>
        <EditOdpuContext.Provider value={context}>
          <Breadcrumb path={`/housingMeteringDevices/${deviceId}`} />

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
        </EditOdpuContext.Provider>
      </>
    );
  }
  return (<div>Загрузка данных</div>);
};
export default EditODPU;
