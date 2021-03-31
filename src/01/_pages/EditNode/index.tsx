import React, { useState, useEffect } from 'react';
import '../../tt-components/antd.scss';
import { useParams } from 'react-router-dom';
import { Header } from './components/Header';
import { getCalculator, getNode } from './components/apiEditNode';
import EditNodeForm from './components/EditNodeForm';
import { Breadcrumb } from '../../tt-components';
import { useAsync } from '../../hooks/useAsync';
import { CalculatorResponse, NodeResponse } from '../../../myApi';
import FormTabs from '../../tt-components/FormTabs';

export const EditNode = () => {
  const { nodeId } = useParams();
  const [currentTabKey, setTab] = useState('1');
  const [alertVisible, setAlertVisible] = useState(false);
  const [existCalculator, setExistCalculator] = useState(false);

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

  const tabs = [
    {
      title: 'Общие данные',
      key: '1',
    },
    {
      title: 'Настройки соединения',
      key: '2',
    },
    {
      title: 'Подключенные приборы',
      key: '3',
    },
    {
      title: 'Документы',
      key: '4',
    },
  ];

  return (
    <>
      <Breadcrumb path={`/nodes/${nodeId}`} />
      <Header calculator={calculator} node={node} nodeId={nodeId} />
      <FormTabs tabs={tabs} setTab={handleChangeTab} />
      <EditNodeForm
        calculator={calculator}
        currentTabKey={currentTabKey}
        node={node}
        setAlertVisible={setAlertVisible}
        setExistCalculator={setExistCalculator}
        setTab={setTab}
      />
    </>
  );
};

export default EditNode;
