import React, { useEffect, useState, useRef } from 'react';
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';
// import { SearchCalculator } from './components/SearchCalculator';
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
// import TabsComponent from './components/Tabs';

export const AddODPUDeviceContext = React.createContext();

export const ModalAddDevice = () => {
  const serialNumberRandom = randomInteger(1, 999999999);
  const deviceAddressRandom = randomInteger(1, 255);

  const { 0: objid } = useParams();
  const modalRef = React.createRef();

  const [tab, setTab] = useState(1);
  const [ok, setOk] = useState('Далее');

  // Серийный номер ОДПУ
  const serialNumber = useRef(`${serialNumberRandom}`);
  // Серийный номер Вычислителя
  const calculatorId = useRef();

  const lastCommercialAccountingDate = useRef(moment().toISOString());
  const futureCommercialAccountingDate = useRef(moment().toISOString());
  const lastCheckingDate = useRef(moment().toISOString());
  const futureCheckingDate = useRef(moment().toISOString());

  const port = useRef(1234);
  const ipV4 = useRef(`192.168.0.${randomInteger(1, 255)}`);
  const resource = useRef('HotWaterSupply');
  const type = useRef('FlowMeter');
  const model = useRef('MODEL');
  const entryNumber = useRef(1);
  const hubNumber = useRef(1);
  const pipeNumber = useRef(1);
  const magistral = useRef('FeedFlow');

  // Применяем только для select, для select - onInputChange
  const onSelectChange = (value, target) => {
    const selectId = target.parent;
    switch (selectId) {
      case 'resource':
        resource.current = value;
        console.log(resource.current);
        break;
      case 'type':
        type.current = value;
        console.log(type.current);
        break;
      case 'magistral':
        magistral.current = value;
        console.log(magistral.current);
        break;
      default:
        console.log('Что-то пошло не так');
    }
  };

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
      case 'calculatorId':
        calculatorId.current = event.target.value;
        console.log(calculatorId.current);
        break;
      case 'model':
        model.current = event.target.value;
        console.log(model.current);
        break;
      case 'entryNumber':
        entryNumber.current = event.target.value;
        console.log(entryNumber.current);
        break;
      case 'hubNumber':
        hubNumber.current = event.target.value;
        console.log(hubNumber.current);
        break;
      case 'pipeNumber':
        pipeNumber.current = event.target.value;
        console.log(pipeNumber.current);
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

  const showMe = () => {
    console.log(model.current);
  };
  // date.toISOString()

  const createCalculator = async () => {
    alert('Cейчас будем отправлять данные!');
    const TEST = {
      calculatorId: 193130939,
      checkingDate: '2020-09-25T12:55:18.417Z',
      connection: {
        ipV4: '192.168.0.82',
        deviceAddress: 201,
        port: 1234,
      },
      futureCheckingDate: '2020-09-25T12:55:18.417Z',
      futureCommercialAccountingDate: '2020-09-25T12:55:18.417Z',
      housingMeteringDeviceType: 'FlowMeter',
      housingStockId: 485,
      lastCommercialAccountingDate: '2020-09-25T12:55:18.417Z',
      model: 'TEST',
      pipe: {
        entryNumber: 1,
        hubNumber: 1,
        pipeNumber: 1,
        magistral: 'FeedFlow',
      },
      resource: 'ColdWaterSupply',
      serialNumber: '193130939',
    };
    const TEMPLATE = {
      calculatorId: Number(calculatorId.current),
      checkingDate: lastCheckingDate.current,
      futureCheckingDate: futureCheckingDate.current,
      lastCommercialAccountingDate: lastCommercialAccountingDate.current,
      connection: {
        ipV4: ipV4.current,
        deviceAddress: Number(deviceAddressRandom),
        port: Number(port.current),
      },
      futureCommercialAccountingDate: futureCommercialAccountingDate.current,
      housingStockId: Number(objid),
      housingMeteringDeviceType: type.current,
      resource: resource.current,
      model: model.current,
      pipe: {
        entryNumber: Number(entryNumber.current),
        hubNumber: Number(hubNumber.current),
        pipeNumber: Number(pipeNumber.current),
        magistral: magistral.current,
      },
      serialNumber: serialNumber.current,
    };

    console.log(TEMPLATE);

    try {
      const res = await axios.post('HousingMeteringDevices', TEMPLATE);
      alert('ОДПУ успешно создан !');
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      alert('Что-то пошло не так');
      // throw new Error(error);
    }
  };

  const hideMe = () => {
    $('#add-calculator').css('display', 'none');
  };

  const buttonHandler = () => {};

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
    <AddODPUDeviceContext.Provider
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
            {/*<TabsComponent />*/}
          </ModalMain>

          <ModalBottom>
            <ButtonTT onClick={hideMe}>Отмена</ButtonTT>
            <ButtonResult />
          </ModalBottom>
        </ModalWrap>
      </Modal>
    </AddODPUDeviceContext.Provider>
  );
};
export default ModalAddDevice;

// serialNumber: serialNumber.current,
// const TEMPLATE_DEVICE_POST = {
//   serialNumber: '55555555555',
//   checkingDate: '2020-09-25T07:50:29.316Z',
//   futureCheckingDate: '2020-09-25T07:50:29.316Z',
//   lastCommercialAccountingDate: '2020-09-25T07:50:29.316Z',
//   documentsIds: [0],
//   connection: {
//     ipV4: '192.168.44.44',
//     deviceAddress: 0,
//     port: 0,
//   },
//   futureCommercialAccountingDate: '2020-09-25T07:50:29.316Z',
//   housingStockId: 485,
//   calculatorId: 1554022,
//   housingMeteringDeviceType: 'FlowMeter',
//   resource: 'HotWaterSupply',
//   model: 'СВМ',
//   pipe: {
//     entryNumber: 2,
//     hubNumber: 2,
//     pipeNumber: 2,
//     magistral: 'FeedFlow',
//   },
// };
// console.log(newCalculator);
