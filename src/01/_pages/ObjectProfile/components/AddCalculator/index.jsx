import React, { useEffect, useState, useRef } from 'react';
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

import {
  Label, Title, Text, Icon, ButtonTT,
} from '../../../../tt-components';
import TabsComponent from './components/Tabs';

export const AddDeviceContext = React.createContext();

export const ModalCalculator = () => {
  const { 0: objid } = useParams();
  const modalRef = React.createRef();

  const [tab, setTab] = useState(1);
  const [ok, setOk] = useState('Далее');

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

  const onInputChange = (event) => {
    const selected = $('#infoId')
      .find('option:selected')
      .attr('id');

    const id = $(event.target).attr('id');
    switch (id) {
      case 'serialNumber':
        serialNumber.current = event.target.value;
        console.log(serialNumber.current);
        break;
      case 'infoId':
        infoId.current = selected;
        console.log(selected);
        console.log(infoId.current);
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
        alert('Нет таких значений');
    }
  };

  function callback(key) {
    setTab(key);
    if (key == 3) {
      setOk('Выгрузить');
    } else {
      setOk('Далее');
    }
  }

  const nextOrDone = () => {
    if (tab == 3) {
      alert('Cейчас будем отправлять данные!');
      setCalculator();
    } else {
      callback(parseInt(tab) + 1);
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
  }

  // date.toISOString()
  const setCalculator = () => {
    const someCalculator = {
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

    async function getCalculatorResources(id = '') {
      try {
        const res = await axios.post('Calculators', someCalculator);
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
    }

    getCalculatorResources();
  };

  const hideMe = () => {
    $('#add-calculator').css('display', 'none');
  };

  const buttonHandler = () => {
    console.log(`${serialNumberRandom}`);
    console.log(serialNumber.current);
    console.log(infoId.current);
    console.log(objid);
  };
  const getKey = () => {
    console.log(lastCommercialAccountingDate.current);
    console.log(
      'futureCommercialAccountingDate',
      futureCommercialAccountingDate,
    );
  };
  return (
    <AddDeviceContext.Provider
      value={{
        tab,
        setTab,
        callback,
        deviceAddressRandom,
        serialNumberRandom,
        onInputChange,
        datetoISOString,
        lastCommercialAccountingDate,
        futureCommercialAccountingDate,
        lastCheckingDate,
        futureCheckingDate,
        addPeriod,
      }}
    >
      <Modal id="add-calculator" ref={modalRef}>
        <ModalWrap>
          <ModalClose getModal={modalRef} />
          <ModalTop>
            <Title size="middle" color="black">
              Добавление нового вычислителя
            </Title>
            {/* <button onClick={getKey}>getKey</button> */}
          </ModalTop>

          <ModalMain>
            <TabsComponent />
          </ModalMain>

          <ModalBottom>
            <ButtonTT onClick={hideMe}>Отмена</ButtonTT>
            <ButtonTT color="blue" onClick={nextOrDone}>
              {ok}
            </ButtonTT>
          </ModalBottom>
        </ModalWrap>
      </Modal>
    </AddDeviceContext.Provider>
  );
};
export default ModalCalculator;
