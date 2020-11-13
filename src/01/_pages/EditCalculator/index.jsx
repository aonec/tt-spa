import React, { useState, useEffect} from 'react';
import '../../tt-components/antd.scss';
import {  useParams } from 'react-router-dom';
import { Header } from '../../tt-components';
import EditCalculatorTabs from './components/EditCalculatorTabs';
import Breadcrumb from '../../tt-components/Breadcrumb/Breadcrumb';
import { getCalculator, putCalculator } from './components/apiEditCalculator';
import EditCalculatorForm from './components/EditCalculatorForm';

export const EditCalculatorContext = React.createContext();

const EditCalculator = () => {
  const { deviceId } = useParams();
  const [currentTabKey, setTab] = useState('1');
  const [currentCalc, setCurrentCalc] = useState();

  function handleChangeTab(value) {
    setTab(value);
  }
  useEffect(() => {
    getCalculator(deviceId).then((result) => setCurrentCalc(result));
  }, []);

  const buttonHandler = () => {
    console.log('buttonHandler');
  };


  if (!currentCalc) {
    return <div>ЗАГРУЗКА</div>
  }
  else {
    const context = {currentCalc, currentTabKey}
    return (
      <>
        <EditCalculatorContext.Provider value={context}>
          <Breadcrumb path={`/calculators/${deviceId}`} />

          <Header>{`${currentCalc.model} (${currentCalc.serialNumber}). Редактирование`}</Header>
          {/* <button onClick={buttonHandler}>getKey</button> */}
          <EditCalculatorTabs
            currentTabKey={currentTabKey}
            handleChangeTab={handleChangeTab}
          />
          <EditCalculatorForm />
        </EditCalculatorContext.Provider>
      </>
    );
  }
};

export default EditCalculator;
