import React, { useState, useEffect } from 'react';
import '../../tt-components/antd.scss';
import { useParams } from 'react-router-dom';
import { Header } from './components/Header';
import { getCalculator, getNode } from './components/apiEditNode';
import EditNodeForm from './components/EditNodeForm';
import { Breadcrumb } from '../../tt-components';
import { useAsync } from '../../hooks/useAsync';
import { CalculatorResponse, NodeResponse } from '../../../myApi';
import { TabsItemInterface } from '../../tt-components/interfaces';
import Tabs from '../../tt-components/Tabs';
import ModalDeregister from '../../tt-components/ModalDeregister';

export const EditNode = () => {
  const { nodeId } = useParams();
  const [currentTabKey, setTab] = useState('1');
  const [alertVisible, setAlertVisible] = useState(false);
  const [existCalculator, setExistCalculator] = useState(false);
  const [deregisterDevice, setDeregisterDevice] = useState(false);
  const [deregisterDeviceValue, setDeregisterDeviceValue] = useState();

  const {
    data: calculator,
    status: statusCalculator,
    run: runCalculator,
  } = useAsync<CalculatorResponse>();
  const { data: node, status, run } = useAsync<NodeResponse>();

  useEffect(() => {
    run(getNode(nodeId));
  }, [nodeId]);

  useEffect(() => {
    node && node.calculatorId
      ? runCalculator(getCalculator(node.calculatorId))
      : console.log('wait');
  }, [node]);

  function handleChangeTab(value: string) {
    setTab(value);
  }

  if (!node || !calculator) {
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

  return (
    <>
      <Breadcrumb path={`/nodes/${nodeId}`} />
      <Header calculator={calculator} node={node} nodeId={nodeId} />
      <Tabs tabItems={tabItems} />
      <EditNodeForm
        calculator={calculator}
        currentTabKey={currentTabKey}
        node={node}
        setAlertVisible={setAlertVisible}
        setExistCalculator={setExistCalculator}
        setTab={setTab}
        setDeregisterDeviceValue={setDeregisterDeviceValue}
        setDeregisterDevice={setDeregisterDevice}
      />
      <ModalDeregister
        visible={deregisterDevice}
        setVisible={setDeregisterDevice}
        device={deregisterDeviceValue}
      />
    </>
  );
};

export default EditNode;
