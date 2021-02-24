import React, { useState, useEffect } from 'react';
import '../../tt-components/antd.scss';
import { useParams } from 'react-router-dom';
import { Header } from './components/Header';
import EditNodeTabs from './components/EditNodeTabs';
import { getCalculator, getNode } from './components/apiEditNode';
import EditNodeForm from './components/EditNodeForm';
import { Breadcrumb } from '../../tt-components';

export const EditNodeContext = React.createContext();

export const EditNode = () => {
  const { nodeId } = useParams();
  const [currentTabKey, setTab] = useState('1');
  const [node, setNode] = useState();
  const [calculator, setCalculator] = useState();

  function handleChangeTab(value) {
    setTab(value);
  }

  useEffect(() => {
    getNode(nodeId).then((res) => {
      const { calculatorId } = res;
      getCalculator(calculatorId).then((res) => {
        setCalculator(res);
      });
      setNode(res);
    });
  }, []);

  if (!node || !calculator) {
    return <div>ЗАГРУЗКА</div>;
  }

  const context = {
    node,
    calculator,
    currentTabKey,
    handleChangeTab,
    setTab,
  };
  return (
    <>
      <EditNodeContext.Provider value={context}>
        <Breadcrumb path={`/nodes/${nodeId}`} />
        <Header />
        <EditNodeTabs />
        <EditNodeForm />
      </EditNodeContext.Provider>
    </>
  );
};

export default EditNode;
