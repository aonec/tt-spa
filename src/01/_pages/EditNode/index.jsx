import React, { useState, useEffect, useRef } from 'react';
import '../../tt-components/antd.scss';
import { useParams } from 'react-router-dom';
import { Header } from './components/Header';
import EditNodeTabs from './components/EditNodeTabs';
import Breadcrumb from '../../tt-components/Breadcrumb/Breadcrumb';
import { getCalculator, getNode } from './components/apiEditNode';
import EditNodeForm from './components/EditNodeForm';

export const EditNodeContext = React.createContext();

export const EditNode = () => {
  const { nodeId } = useParams();
  const [currentTabKey, setTab] = useState('1');
  const [node, setNode] = useState();
  const [calculator, setCalculator] = useState();
  const [currentCalc, setCurrentCalc] = useState();
  const [alertVisible, setAlertVisible] = useState(false);
  const [existCalculator, setExistCalculator] = useState(null);

  function handleChangeTab(value) {
    setTab(value);
  }

  console.log('currentCalc', currentCalc);

  useEffect(() => {
    getNode(nodeId).then((res) => {
      getCalculator(res.calculatorId).then((res) => {
        setCalculator(res);
        console.log('res', res);
      });
      setNode(res);
      console.log('node', res);
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
    // setAlertVisible,
    // alertVisible,
    // existCalculator,
    // currentCalc,
    // setExistCalculator

  };
  return (
    <>
      <EditNodeContext.Provider value={context}>
        <Breadcrumb path={`/nodes/${nodeId}`} />
        <Header />
        <EditNodeTabs />
         <EditNodeForm/>
      </EditNodeContext.Provider>
    </>
  );
};

export default EditNode;
