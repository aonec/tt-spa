import React, { useState, useEffect, useRef } from 'react';
import '../../tt-components/antd.scss';
import { useParams } from 'react-router-dom';
import { Header } from './components/Header';
import EditNodeTabs from './components/EditNodeTabs';
import Index from '../../tt-components/Breadcrumb';
import { getCalculator, getNode } from './components/apiEditNode';
import EditNodeForm, { ListWrap } from './components/EditNodeForm';
import {Breadcrumb} from "../../tt-components";

export const EditNodeContext = React.createContext();

export const EditNode = () => {
  const { nodeId } = useParams();
  const [currentTabKey, setTab] = useState('1');
  const [node, setNode] = useState();
  const [calculator, setCalculator] = useState();

  function handleChangeTab(value){
    console.log('value', value)
    setTab(value);
  }

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
    setTab
  };
  return (
    <>
      <EditNodeContext.Provider value={context}>
        <Breadcrumb path={`/nodes/${nodeId}`}/>
        <Header/>
        <EditNodeTabs/>
        <EditNodeForm/>
      </EditNodeContext.Provider>
    </>
  );
};

export default EditNode;
