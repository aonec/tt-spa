import React, { useState, useEffect, useRef } from 'react';
import '../../tt-components/antd.scss';
import { useParams } from 'react-router-dom';
import { Header } from '../../tt-components';
import EditCalculatorTabs from './components/EditCalculatorTabs';
import Breadcrumb from '../../tt-components/Breadcrumb/Breadcrumb';
import { getCalculator } from './components/apiEditCalculator';
import EditCalculatorForm from './components/EditCalculatorForm';
import ModalCalculatorExist from './components/ModalCalculatorExist';

export const EditCalculatorContext = React.createContext();

export const EditCalculator = () => {
  const { deviceId } = useParams();
  const [currentTabKey, setTab] = useState('1');
  const [currentCalc, setCurrentCalc] = useState();
  const [alertVisible, setAlertVisible] = useState(false)
  const [existCalculator, setExistCalculator] = useState(null);

  function handleChangeTab(value) {
    setTab(value);
  }

  console.log('currentCalc', currentCalc);

  useEffect(() => {
    getCalculator(deviceId).then((result) => setCurrentCalc(result));
  }, []);

  if (!currentCalc) {
    return <div>ЗАГРУЗКА</div>;
  }

  const context = {
    currentCalc, currentTabKey, handleChangeTab, setTab,setAlertVisible, alertVisible, existCalculator, setExistCalculator
  };
  return (
    <>
      <EditCalculatorContext.Provider value={context}>
        <Breadcrumb path={`/calculators/${deviceId}`} />
        <Header>{`${currentCalc.model} (${currentCalc.serialNumber}). Редактирование`}</Header>
        <EditCalculatorTabs />
        <EditCalculatorForm />
        <ModalCalculatorExist />
      </EditCalculatorContext.Provider>
    </>
  );
};

export default EditCalculator;
