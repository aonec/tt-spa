import React, { useEffect, useState, useRef } from 'react';
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';
import { SearchCalculator } from './components/SearchCalculator';
import { useParams } from 'react-router-dom';
import '01/tt-components/antd.scss';
import {
  Modal,
  ModalWrap,
  ModalTop,
  ModalMain,
  ModalBottom,
  ModalClose,
  InputWrap,
} from '01/tt-components/Modal';

import {
  Label, Title, Text, Icon, ButtonTT,
} from '../../../../tt-components';
import TabsComponent from './components/Tabs';

export const AddDeviceContext = React.createContext();

const TEMPLATE_CALCULATOR_983 = {
  id: 983,
  isConnected: true,
  underTransaction: false,
  model: 'ВКТ-7',
  serialNumber: '72381',
  ipV4: null,
  port: null,
  deviceAddress: null,
  address: {
    city: 'Нижнекамск',
    street: 'Гагарина',
    housingStockNumber: '5 А',
    corpus: null,
  },
  hubs: [
    {
      hubNumber: 0,
      entryNumber: 1,
      resource: 'Heat',
      pipes: [
        {
          number: 0,
          type: 'FeedFlow',
          devices: [
            {
              id: 4567,
              serialNumber: '218920',
              type: 'FlowMeter',
            },
            {
              id: 4568,
              serialNumber: '145204',
              type: 'TemperatureSensor',
            },
          ],
        },
        {
          number: 1,
          type: 'FeedBackFlow',
          devices: [
            {
              id: 4569,
              serialNumber: '238670',
              type: 'FlowMeter',
            },
          ],
        },
      ],
    },
    {
      hubNumber: 0,
      entryNumber: 2,
      resource: 'HotWaterSupply',
      pipes: [
        {
          number: 3,
          type: 'FeedFlow',
          devices: [
            {
              id: 4570,
              serialNumber: '371540',
              type: 'FlowMeter',
            },
            {
              id: 4571,
              serialNumber: '145194',
              type: 'TemperatureSensor',
            },
          ],
        },
        {
          number: 4,
          type: 'FeedBackFlow',
          devices: [
            {
              id: 4572,
              serialNumber: '328702',
              type: 'FlowMeter',
            },
          ],
        },
      ],
    },
    {
      hubNumber: 0,
      entryNumber: 2,
      resource: 'ColdWaterSupply',
      pipes: [
        {
          number: 5,
          type: 'FeedFlow',
          devices: [
            {
              id: 4573,
              serialNumber: '044626',
              type: 'FlowMeter',
            },
          ],
        },
      ],
    },
  ],
  lastCommercialAccountingDate: null,
  futureCommercialAccountingDate: null,
  lastCheckingDate: '2018-04-05T03:00:00',
  futureCheckingDate: '2022-02-26T03:00:00',
  closingDate: null,
};

const TEMPLATE_DEVICE_4608 = {
  id: 4608,
  housingStockId: 485,
  model: 'СВМ',
  serialNumber: '33431513',
  diameter: '40 мм',
  ipV4: null,
  port: null,
  deviceAddress: null,
  type: 'FlowMeter',
  resource: 'HotWaterSupply',
  underTransaction: false,
  canBeEdited: true,
  lastCommercialAccountingDate: '0001-01-01T03:00:00',
  futureCommercialAccountingDate: '0001-01-01T03:00:00',
  lastCheckingDate: '2018-04-08T03:00:00',
  futureCheckingDate: '2022-04-08T03:00:00',
  closingDate: null,
  calculator: null,
};

const TEMPLATE_DEVICE_MODIFIED = {
  serialNumber: 'string',
  checkingDate: '2020-09-25T07:50:29.316Z',
  futureCheckingDate: '2020-09-25T07:50:29.316Z',
  lastCommercialAccountingDate: '2020-09-25T07:50:29.316Z',
  documentsIds: [0],
  connection: {
    ipV4: 'string',
    deviceAddress: 0,
    port: 0,
  },
  futureCommercialAccountingDate: '2020-09-25T07:50:29.316Z',
  housingStockId: 0,
  calculatorId: 0,
  housingMeteringDeviceType: 'string',
  resource: 'string',
  model: 'string',
  pipe: {
    entryNumber: 0,
    hubNumber: 0,
    pipeNumber: 0,
    magistral: 'string',
  },
};

const TEMPLATE_DEVICE_POST = {
  serialNumber: '1554022',
  checkingDate: '2020-09-25T07:50:29.316Z',
  futureCheckingDate: '2020-09-25T07:50:29.316Z',
  lastCommercialAccountingDate: '2020-09-25T07:50:29.316Z',
  documentsIds: [0],
  connection: {
    ipV4: 'string',
    deviceAddress: 0,
    port: 0,
  },
  futureCommercialAccountingDate: '2020-09-25T07:50:29.316Z',
  housingStockId: 0,
  calculatorId: 0,
  housingMeteringDeviceType: 'string',
  resource: 'string',
  model: 'string',
  pipe: {
    entryNumber: 0,
    hubNumber: 0,
    pipeNumber: 0,
    magistral: 'string',
  },
};

export const ModalAddDevice = () => {
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

  // Tabs
  function callback(key) {
    setTab(key);
  }

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

  // date.toISOString()

  const createCalculator = async () => {
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

  const hideMe = () => {
    $('#add-calculator').css('display', 'none');
  };

  const buttonHandler = () => {
    console.log(`${serialNumberRandom}`);
    console.log(serialNumber.current);
    console.log(infoId.current);
    console.log(objid);
  };

  const Next = () => {
    callback(parseInt(tab) + 1);
  };

  const ButtonResult = () => {
    if (tab == 3) {
      return (
        <ButtonTT
          color="blue"
          onClick={createCalculator}
          style={{ marginLeft: '16px' }}
        >
          Выгрузить
        </ButtonTT>
      );
    }

    return (
      <ButtonTT onClick={Next} color="blue" style={{ marginLeft: '16px' }}>
        Далее
      </ButtonTT>
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
        infoId,
        onSelectChange,
      }}
    >
      <Modal id="add-device" ref={modalRef}>
        <ModalWrap>
          <ModalClose getModal={modalRef} />
          <ModalTop>
            <Title size="middle" color="black">
              Добавление нового ОДПУ
            </Title>
          </ModalTop>

          <ModalMain>
            <TabsComponent />
          </ModalMain>

          <ModalBottom>
            <ButtonTT onClick={hideMe}>Отмена</ButtonTT>
            <ButtonResult />
          </ModalBottom>
        </ModalWrap>
      </Modal>
    </AddDeviceContext.Provider>
  );
};
export default ModalAddDevice;
