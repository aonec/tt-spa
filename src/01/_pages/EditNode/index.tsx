import React, { useState, useEffect } from 'react';
import '../../tt-components/antd.scss';
import { useParams } from 'react-router-dom';
import { Header } from './components/Header';
import EditNodeForm from './components/EditNodeForm';
import { useAsync } from '../../hooks/useAsync';
import { CalculatorResponse, PipeNodeResponse } from '../../../myApi';
import { TabsItemInterface } from '../../tt-components/interfaces';
import Tabs from '../../tt-components/Tabs';
import ModalDeregister from '../../tt-components/ModalDeregister';
import ModalAddDevice from './components/Modals/ModalAddDevice';
import { EditNodeContext } from './Context';
import { getCalculator, getNode } from '../../_api/apiRequests';
import { PageGate } from '../../features/serviceZones/selectServiceZones/models';
import { GoBack } from 'ui-kit/shared_components/GoBack';

export const EditNode = () => {
  const { nodeId: nodeIdString } = useParams<{ nodeId: string }>();
  const nodeId = Number(nodeIdString);
  const [currentTabKey, setTab] = useState('1');
  const [alertVisible, setAlertVisible] = useState(false);
  const [existDevice, setExistCalculator] = useState(false);
  const [deregisterDevice, setDeregisterDevice] = useState(false);
  const [deregisterDeviceValue, setDeregisterDeviceValue] = useState();
  const [visibleAddDevice, setVisibleAddDevice] = useState(false);

  const {
    data: calculator,
    status: statusCalculator,
    run: runCalculator,
  } = useAsync<CalculatorResponse>();
  const { data: node, status, run } = useAsync<PipeNodeResponse>();

  useEffect(() => {
    run(getNode(nodeId));
  }, [nodeId]);

  useEffect(() => {
    node &&
      node.calculatorId &&
      runCalculator(getCalculator(node.calculatorId));
  }, [node]);

  function handleChangeTab(value: string) {
    setTab(value);
  }

  if (!node) {
    return <div>ЗАГРУЗКА</div>;
  }

  const tabItems: Array<TabsItemInterface> = [
    {
      title: 'Общие данные',
      key: '1',
      cb: () => handleChangeTab('1'),
    },
    {
      title: 'Настройки соединения',
      key: '2',
      cb: () => handleChangeTab('2'),
    },
    {
      title: 'Подключенные приборы',
      key: '3',
      cb: () => handleChangeTab('3'),
    },
    {
      title: 'Документы',
      key: '4',
      cb: () => handleChangeTab('4'),
    },
  ];
  const context = {
    visibleAddDevice,
    setVisibleAddDevice,
    calculator,
    node,
  };

  return (
    <EditNodeContext.Provider value={context}>
      <PageGate />
      <GoBack path={`/nodes/${nodeId}`} />
      <Header node={node} nodeId={nodeId} />
      <div style={{ width: '66%' }}>
        <Tabs tabItems={tabItems} tabsType={'tabs'} />
        <EditNodeForm
          currentTabKey={currentTabKey}
          node={node}
          setAlertVisible={setAlertVisible}
          setExistCalculator={setExistCalculator}
          setTab={setTab}
          setDeregisterDeviceValue={setDeregisterDeviceValue}
          setDeregisterDevice={setDeregisterDevice}
        />
      </div>
      <ModalDeregister
        visible={deregisterDevice}
        setVisible={setDeregisterDevice}
        device={deregisterDeviceValue}
      />
      <ModalAddDevice
        visible={visibleAddDevice}
        setVisible={setVisibleAddDevice}
        // calculator={calculator}
        node={node}
      />
    </EditNodeContext.Provider>
  );
};

export default EditNode;
