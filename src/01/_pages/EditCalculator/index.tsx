import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../tt-components';
import { getCalculator } from './components/apiEditCalculator';
import { useAsync } from '../../hooks/useAsync';
import EditCalculatorForm from './components/EditCalculatorForm';
import { Loader } from '../../components';
import ModalDeviceExists from '../../tt-components/ModalDeviceExists';
import Tabs from '../../tt-components/Tabs';
import { TabsItemInterface } from '../../tt-components/interfaces';
import { CalculatorResponse } from '../../../api/types';
import { GoBack } from '../../../ui-kit/shared_components/GoBack';

export const EditCalculator = () => {
  const { deviceId } = useParams();
  const [tab, setTab] = useState<string>('1');
  const [alert, setAlert] = useState<boolean>(false);
  const [existDevice, setExistCalculator] = useState<
    number | null | undefined
  >();

  const { data: calculator, status, run } = useAsync<CalculatorResponse>();

  useEffect(() => {
    run(getCalculator(deviceId));
  }, [deviceId]);

  if (!calculator) {
    return null;
  }

  const { model, serialNumber } = calculator;

  const tabItems: Array<TabsItemInterface> = [
    {
      title: 'Общие данные',
      key: '1',
      cb: () => setTab('1'),
    },
    {
      title: 'Настройки соединения',
      key: '2',
      cb: () => setTab('2'),
    },
    {
      title: 'Подключенные приборы',
      key: '3',
      cb: () => setTab('3'),
    },
    {
      title: 'Документы',
      key: '4',
      cb: () => setTab('4'),
    },
  ];

  return (
    <>
      {status === 'error' && (
        <div style={{ background: 'red' }}>
          Что пошло не так. Попробуйте Перезагрузить страницу
        </div>
      )}
      {status === 'pending' ||
        (status === 'idle' && <Loader show size={64} />)}
      {status === 'resolved' && (
        <>
          <GoBack path={`/calculators/${deviceId}`} />
          <Header>{`${model} (${serialNumber}). Редактирование`}</Header>
          <Tabs tabItems={tabItems} tabsType={'tabs'} activeKey={tab} />
          <EditCalculatorForm
            calculator={calculator}
            tab={tab}
            setTab={setTab}
            setAlert={setAlert}
            setExistCalculator={setExistCalculator}
          />
          <ModalDeviceExists
            existDevice={existDevice}
            setVisible={setAlert}
            visible={alert}
            type={'calculator'}
          />
        </>
      )}
    </>
  );
};

export default EditCalculator;
