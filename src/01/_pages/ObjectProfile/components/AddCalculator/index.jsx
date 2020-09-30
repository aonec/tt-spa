import React, { useState, useRef, useContext, useEffect } from 'react';
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

// const redux = require('redux');
import {store} from '01/App/App'

export const AddDeviceContext = React.createContext();

export const ModalCalculator = (props) => {
 
  function randomInteger(min, max) {
    const rand = min + Math.random() * (max - min);
    return Math.round(rand);
  }

  const serialNumberRandom = randomInteger(1, 999999999);
  const deviceAddressRandom = randomInteger(1, 255);

  const { 0: objid } = useParams();
  console.log(Number(objid));

  const [currentTabKey, setTab] = useState('1');

  const modalRef = React.createRef();
  useEffect(()=>{
    console.log("APP", props)
    store.dispatch({ type: 'housingStockId', value: Number(objid) });
  },[])
  const lastCommercialAccountingDate = useRef(moment().toISOString());
  const futureCommercialAccountingDate = useRef(moment().toISOString());
  const lastCheckingDate = useRef(moment().toISOString());
  const futureCheckingDate = useRef(moment().toISOString());
  const port = useRef(1234);
  const infoId = useRef(1);

  const form = {
    serialNumberRandom,
    deviceAddressRandom,
    lastCommercialAccountingDate,
    futureCommercialAccountingDate,
    lastCheckingDate,
    futureCheckingDate,
    port,
    infoId,
  };

  function handleChangeTab(value) {
    setTab(value);
  }

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
        // тоже строковое значение
        store.dispatch({ type: 'serialNumber', value });
        break;
      case 'port':
        store.dispatch({ type: 'port', value });
        break;
      case 'ipV4':
        store.dispatch({ type: 'ipV4', value });
        break;
      case 'lastCommercialAccountingDate':
        store.dispatch({ type: 'lastCommercialAccountingDate', value });
        break;
        case 'checkingDate':
          store.dispatch({ type: 'checkingDate', value });
          break;
          case 'futureCommercialAccountingDate':
            store.dispatch({ type: 'futureCommercialAccountingDate', value });
            break;  
            case 'futureCheckingDate':
              store.dispatch({ type: 'futureCheckingDate', value });
              break;  
        default:
        console.log('Кажется, нужно проверить правильно ли передан ID', name, value);
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

  function addPeriod(period, someRef) {
    const name = someRef.toString();
    const value = moment()
      .add(period, 'year')
      .toISOString();
    onChangeUniversal(name, value);
  }

  function datetoISOString(date, dateString, someRef) {
    // someRef.current = date.toISOString();
    const value = date.toISOString();
    const name = someRef;

    console.log('name', name)
    console.log('value', value)
    onChangeUniversal(name, value);
    // console.log(someRef.current);
    // store.dispatch()
  }

  const hideMe = () => {
    $('#add-calculator').css('display', 'none');
  };

  const buttonHandler = () => {};

  const before = () => {
    console.log(store.getState())
  
  };

  const after = () => {
    store.dispatch({ type: 'ADD_TODO' });
  };

  const reference = useRef();

  store.subscribe(() => {
    console.log('subscribe');
    reference.current = store.getState();
  });


 

  const handleSubmit = async () => {
    alert('Cейчас будем отправлять данные!');

    try {
      // но здесь ругается, потому что его не устрривает формат
      // делаю так же как у ipV4, но serialNumber всё равно выдет ошибку
      // при этом если в initialState прописать готовое значение в кавычках, и его не менять, то всё ок
      console.log(store.getState());
      const res = await axios.post('Calculators', reference.current);
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
          <button onClick={before}>before</button>
          <button onClick={after}>after</button>
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
