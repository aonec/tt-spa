import React, { useState, useEffect} from 'react';
import '../../tt-components/antd.scss';
import { NavLink, useParams } from 'react-router-dom';
import { ButtonTT, Header } from '../../tt-components';
import EditCalculatorTabs from './EditCalculatorTabs';
import Breadcrumb from '../../tt-components/Breadcrumb/Breadcrumb';
import { getCalculator, putCalculator } from './apiEditCalculator';
import EditCalculatorForm from './EditCalculatorForm';

export const EditCalculatorContext = React.createContext();

const EditCalculator = () => {
  const { deviceId } = useParams();
  const [currentTabKey, setTab] = useState('1');
  const [currentCalc, setCurrentCalc] = useState();

  useEffect(() => {
    getCalculator(deviceId).then((result) => setCurrentCalc(result));
  }, []);

  console.log("currentCalc", currentCalc)


  if (!currentCalc) {
    return <div>ЗАГРУЗКА</div>
  }
  else {
    const initialStateDefaultValues = { serial: currentCalc.serialNumber, model: currentCalc.model };

    const buttonHandler = () => {
      console.log('buttonHandler');
    };

    const handleSubmit = () => {
      putCalculator(deviceId, form);
    };

    const form = {};

    const context = {currentCalc, currentTabKey}

    function handleChangeTab(value) {
      setTab(value);
    }


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
          <div>{JSON.stringify(initialStateDefaultValues)}</div>
          <EditCalculatorForm />
          <div>
            <ButtonTT
              color="blue"
              style={{ marginRight: '16px' }}
              onClick={handleSubmit}
            >
              Сохранить
            </ButtonTT>

            <NavLink to={`/calculators/${deviceId}`}>
              <ButtonTT color="white">
                Отмена
              </ButtonTT>
            </NavLink>
          </div>
        </EditCalculatorContext.Provider>
      </>
    );

  }

  // useEffect(() => {
  //   if (currentCalc) {
  //     console.log('currentCalc', currentCalc);
  //
  //     const currentInfoId = _.find(items, { label: model || 'ТЭМ-106' });
  //     const { value } = currentInfoId;
  //
  //     const temp = _.find(items, { value });
  //     const { label } = temp;
  //   }
  // }, [currentCalc]);



  // const initialStateDefaultValues = {
  //   serialNumber,
  //   checkingDate: lastCommercialAccountingDate,
  //   futureCheckingDate,
  //   lastCommercialAccountingDate,
  //   connection: {
  //     ipV4,
  //     deviceAddress: deviceAddress || randomInteger(1, 255),
  //     port,
  //   },
  //   futureCommercialAccountingDate,
  //   housingStockId,
  //   infoId: Number(value),
  // };



};

export default EditCalculator;
