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
  function randomInteger(min, max) {
    const rand = min + Math.random() * (max - min);
    return Math.round(rand);
  }

  const serialNumberRandom = randomInteger(1, 999999999);
  const deviceAddressRandom = randomInteger(1, 255);

  const { 0: objid } = useParams();
  console.log(Number(objid));

  const initialState = {
    serialNumber: '{$serialNumberRandom}',
    checkingDate: moment().toISOString(),
    futureCheckingDate: moment().toISOString(),
    lastCommercialAccountingDate: moment().toISOString(),
    connection: {
      ipV4: '192.168.0.1',
      deviceAddress: deviceAddressRandom,
      port: 1234,
    },
    futureCommercialAccountingDate: moment().toISOString(),
    housingStockId: Number(objid),
    infoId: 1,
  };

  const reducer = (state = initialState, action) => {
    if (action.type === 'InfoId') {
      return { ...state, infoId: action.value };
    }
    if (action.type === 'serialNumber') {
      return { ...state, serialNumber: action.value };
    }
    if (action.type === 'port') {
      return { ...state, port: action.value };
    }
    if (action.type === 'ipV4') {
      return { ...state, ipV4: action.value };
    }
    return state;
  };

  const store = redux.createStore(reducer);

  const [currentTabKey, setTab] = useState('1');

  const modalRef = React.createRef();

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
      const res = await axios.post('Calculators', store.getState());
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
    const name = target.parent;
    onChangeUniversal(name, value);
  };

  // Применяем только для input, для select - onSelectChange
  const onInputChange = (event) => {
    const name = event.target.id;
    onChangeUniversal(name, event.target.value);
  };

  // Универсальная функция
  const onChangeUniversal = (name, value) => {
    console.log(name, value);
    switch (name) {
      case 'infoId':
        store.dispatch({ type: 'InfoId', value });
        break;
      case 'serialNumber':
        store.dispatch({ type: 'serialNumber', value });
        break;
      case 'port':
        store.dispatch({ type: 'port', value });
        break;
      case 'ipV4':
        store.dispatch({ type: 'ipV4', value });
        break;
      case 'futureCommercialAccountingDate':
        store.dispatch({ type: 'futureCommercialAccountingDate', value });
        break;

      default:
        console.log('Кажется, нужно проверить правильно ли передан ID', name);
    }
  };

  function addPeriod(period, someRef) {
    const name = someRef.toString();
    const value = moment().add(period, 'year').toISOString();

    console.log(name);
    console.log(value);
    onChangeUniversal(name, value);
  }

  function datetoISOString(date, dateString, someRef) {
    someRef.current = date.toISOString();
    console.log(someRef.current);
  }

  const hideMe = () => {
    $('#add-calculator').css('display', 'none');
  };

  const buttonHandler = () => {};

  store.subscribe(() => {
    console.log('subscribe', store.getState());
  });

  // store.dispatch({ type: 'ADD_NUMBER', value: 10 });

  const test = () => {
    console.log('test');
    console.log(store.getState());
    // store.dispatch({ type: 'ADD', value: 10 });
    // store.dispatch({ type: 'ADD' });
  };

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
          <button onClick={test}>test</button>
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
