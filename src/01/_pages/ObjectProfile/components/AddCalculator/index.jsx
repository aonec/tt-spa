import React, { useState, useRef } from 'react';
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import '01/tt-components/antd.scss';
import {
  Modal,
  ModalWrap,
  ModalTop,
  ModalMain,
  ModalBottom,
  ModalClose,
} from '01/tt-components/Modal';

import { Title, ButtonTT } from '../../../../tt-components';
import TabsComponent from './components/Tabs/Main';

const redux = require('redux');

export const AddDeviceContext = React.createContext();

export const ModalCalculator = () => {
  const [currentTabKey, setTab] = useState('1');
  const { 0: objid } = useParams();
  const modalRef = React.createRef();

  const serialNumberRandom = randomInteger(1, 999999999);
  const deviceAddressRandom = randomInteger(1, 255);

  const serialNumber = useRef(`${serialNumberRandom}`);
  const lastCommercialAccountingDate = useRef(moment().toISOString());
  const futureCommercialAccountingDate = useRef(moment().toISOString());
  const lastCheckingDate = useRef(moment().toISOString());
  const futureCheckingDate = useRef(moment().toISOString());
  const port = useRef(1234);
  const infoId = useRef(1);
  const ipV4 = useRef('192.168.0.1');

  const form = {
    serialNumberRandom,
    deviceAddressRandom,
    serialNumber,
    lastCommercialAccountingDate,
    futureCommercialAccountingDate,
    lastCheckingDate,
    futureCheckingDate,
    port,
    infoId,
    ipV4,
  };

  function handleChangeTab(value) {
    setTab(value);
  }

  const initialState = {
    serialNumber: serialNumber.current,
    checkingDate: lastCheckingDate.current,
    futureCheckingDate: futureCheckingDate.current,
    lastCommercialAccountingDate: lastCommercialAccountingDate.current,
    connection: {
      ipV4: ipV4.current,
      deviceAddress: deviceAddressRandom,
      port: parseInt(port.current),
    },
    futureCommercialAccountingDate: futureCommercialAccountingDate.current,
    housingStockId: parseInt(objid),
    infoId: parseInt(infoId.current),
  };

  const reducer = (state = initialState, action) => {
    if (action.type === 'ADD') {
      return { counter: state.counter + 1 };
    }
    if (action.type === 'SUB') {
      return { counter: state.counter - 1 };
    }

    if (action.type === 'ADD_NUMBER') {
      return { counter: state.counter + action.value };
    }
    return state;
  };

  const store = redux.createStore(reducer);
  store.subscribe(() => {
    console.log('subscribe', store.getState());
  });

  // Actions
  const addCounter = {
    type: 'ADD',
  };

  store.dispatch(addCounter);

  store.dispatch({ type: 'SUB' });

  store.dispatch({ type: 'ADD_NUMBER', value: 10 });

  const handleSubmit = async () => {
    alert('Cейчас будем отправлять данные!');
    const newCalculator = {
      serialNumber: serialNumber.current,
      checkingDate: lastCheckingDate.current,
      futureCheckingDate: futureCheckingDate.current,
      lastCommercialAccountingDate: lastCommercialAccountingDate.current,
      connection: {
        ipV4: ipV4.current,
        deviceAddress: deviceAddressRandom,
        port: parseInt(port.current),
      },
      futureCommercialAccountingDate: futureCommercialAccountingDate.current,
      housingStockId: parseInt(objid),
      infoId: parseInt(infoId.current),
    };
    console.log(newCalculator);

    try {
      const res = await axios.post('Calculators', newCalculator);
      alert('Вычислитель успешно создан !');
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      alert(
        'Что-то пошло не так: попробуйте исправить CЕРИЙНЫЙ НОМЕР И АДРЕС УСТРОЙСТВА',
      );
      throw new Error(error);
    }
  };

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

  // Применяем только для select, для select - onInputChange
  const onSelectChange = (value, target) => {
    const selectId = target.parent;
    switch (selectId) {
      case 'infoId':
        infoId.current = value;
        console.log(infoId.current);
        break;
      default:
        console.log('Что-то пошло не так');
    }
  };

  // Применяем только для input, для select - onSelectChange
  const onInputChange = (event) => {
    const { id } = event.target;
    switch (id) {
      case 'serialNumber':
        serialNumber.current = event.target.value;
        console.log(serialNumber.current);
        break;
      case 'port':
        port.current = event.target.value;
        console.log(port.current);
        break;
      case 'ipV4':
        ipV4.current = event.target.value;
        console.log(ipV4.current);
        break;
      default:
        console.log('Кажется, нужно проверить правильно ли передан ID', id);
    }
  };

  function randomInteger(min, max) {
    const rand = min + Math.random() * (max - min);
    return Math.round(rand);
  }

  function addPeriod(period, someRef) {
    someRef.current = moment()
      .add(parseInt(period), 'year')
      .toISOString();
  }

  function datetoISOString(date, dateString, someRef) {
    someRef.current = date.toISOString();
    console.log(someRef.current);
  }

  const hideMe = () => {
    $('#add-calculator').css('display', 'none');
  };

  const buttonHandler = () => {};

  return (
    <AddDeviceContext.Provider
      value={{
        form,
        onInputChange,
        datetoISOString,
        addPeriod,
        onSelectChange,
      }}
    >
      <Modal id="add-calculator" ref={modalRef}>
        <ModalWrap>
          <ModalClose getModal={modalRef} />
          <ModalTop>
            <Title size="middle" color="black">
              Добавление нового вычислителя
            </Title>
            {/* <button onClick={buttonHandler}>getKey</button> */}
          </ModalTop>

          <ModalMain>
            <TabsComponent
              currentTabKey={currentTabKey}
              handleChangeTab={handleChangeTab}
            />
          </ModalMain>

          <ModalBottom>
            <ButtonTT onClick={hideMe}>Отмена</ButtonTT>
            {renderNextButton()}
            {renderSubmitButton()}
          </ModalBottom>
        </ModalWrap>
      </Modal>
    </AddDeviceContext.Provider>
  );
};
export default ModalCalculator;

// const reducer = (state = initialState, action) => {
//   if (action.type === 'ADD') {
//     return { counter: state.counter + 1 };
//   }
//   if (action.type === 'SUB') {
//     return { counter: state.counter - 1 };
//   }

//   if (action.type === 'ADD_NUMBER') {
//     return { counter: state.counter + action.value };
//   }
//   return state;
// };
