import React, { useState, useEffect } from 'react';
import moment from 'moment';
import _ from 'lodash';
import $ from 'jquery';
import axios from '01/axios';
import { useParams } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import '01/tt-components/antd.scss';
import {
  Modal,
  ModalWrap,
  ModalTop,
  ModalMain,
  ModalBottom,
  ModalClose,
} from '01/tt-components/Modal';

import { ButtonTT, Header } from '01/tt-components';
import TabsComponent from './components/Tabs/Main';
import { setAddCalculatorForm } from './store/actions';

export const AddDeviceContext = React.createContext();

const EditCalculator = () => {
  const { 0: objid, 1: deviceId } = useParams();
  const [currentTabKey, setTab] = useState('1');
  const dispatch = useDispatch();
  const calculatorPage = useSelector((state) => state.calculatorPage);
  const [currentCalc, setCurrentCalc] = useState();

  const items = [
    {
      value: '1',
      label: 'ТЭМ-106',
    },
    {
      value: '2',
      label: 'ТЭМ-104',
    },
    {
      value: '3',
      label: 'ТЭМ-104',
    },
    {
      value: '4',
      label: 'ВКТ-7',
    },
    {
      value: '5',
      label: 'ВИСТ',
    },
  ];

  async function getCalculator(url = '') {
    try {
      const res = await axios.get(`MeteringDevices/${url}`);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCalculator(deviceId).then((result) => {
      setCurrentCalc(result);
    });

  }, []);

  useEffect(() => {
    if (currentCalc) {
        const {
        calculator,
        canBeEdited,
        closingDate,
        deviceAddress,
        diameter,
        futureCheckingDate,
        futureCommercialAccountingDate,
        housingStockId,
        id,
        ipV4,
        lastCheckingDate,
        lastCommercialAccountingDate,
        model,
        port,
        resource,
        serialNumber,
        type,
        underTransaction,
      } = currentCalc;

   const currentInfoId = _.find(items, { label: model || 'ТЭМ-106' });

    const { value } = currentInfoId;


          const initialStateDefaultValues = {
          serialNumber,
          checkingDate: lastCommercialAccountingDate,
          futureCheckingDate,
          lastCommercialAccountingDate,
          connection: {
              ipV4,
              deviceAddress,
              port,
          },
          futureCommercialAccountingDate,
          housingStockId,
          infoId: Number(value)
      }
      dispatch(
        setAddCalculatorForm(calculatorPage, initialStateDefaultValues),
      )
  }
  
  }, [currentCalc]);

  function handleChangeTab(value) {
    setTab(value);
  }

  const handleNext = () => {
    setTab(String(Number(currentTabKey) + 1));
  };

  const renderNextButton = () => {
    if (currentTabKey === '3') {
      return null;
    }
    return (
      <ButtonTT
        color="blue"
        style={{ marginLeft: '16px' }}
        onClick={handleNext}
      >
        Далее
      </ButtonTT>
    );
  };

  const renderSubmitButton = () => {
    if (currentTabKey !== '3') {
      return null;
    }
    return (
      <ButtonTT
        color="blue"
        style={{ marginLeft: '16px' }}
        onClick={handleSubmit}
      >
        Выгрузить
      </ButtonTT>
    );
  };

  const hideMe = () => {
    $('#add-calculator').css('display', 'none');
  };

  const buttonHandler = () => {
    console.log('test');
   
  };

  const handleSubmit = async () => {
    alert('Cейчас будем отправлять данные!');
    try {
      const res = await axios.put(`Calculators/${deviceId}`, calculatorPage);
      alert('Вычислитель успешно создан !');
      // console.log(res);
      // return res;
        console.log(calculatorPage,"calculatorPage")
    } catch (error) {
      console.log(error);
      alert(
        'Что-то пошло не так: попробуйте исправить CЕРИЙНЫЙ НОМЕР И АДРЕС УСТРОЙСТВА',
      );
      throw new Error(error);
    }
  };

  return (
    <AddDeviceContext.Provider value={{}}>


      <ModalTop>

        <Header>ВКТ-7 (123456789). Редактирование</Header>

        <button onClick={buttonHandler}>getKey</button>
      </ModalTop>
      <ModalMain>
        <TabsComponent
          currentTabKey={currentTabKey}
          handleChangeTab={handleChangeTab}
        />
      </ModalMain>

      <ModalBottom>
        <ButtonTT color="white" onClick={hideMe}>
          Отмена
        </ButtonTT>
        {renderNextButton()}
        {renderSubmitButton()}

      </ModalBottom>

    </AddDeviceContext.Provider>
  );
};

export default connect()(EditCalculator);

