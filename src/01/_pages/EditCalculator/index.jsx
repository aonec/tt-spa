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

import { Title, ButtonTT, Header } from '01/tt-components';
import TabsComponent from './components/Tabs/Main';
import { setAddCalculatorForm } from './store/actions';

import { items } from './components/CalculatorJSON';

export const AddDeviceContext = React.createContext();

const EditCalculator = () => {
  const { 0: objid, 1: deviceId } = useParams();
  const [currentTabKey, setTab] = useState('1');
  const modalRef = React.createRef();
  const dispatch = useDispatch();
  const calculatorPage = useSelector((state) => state.calculatorPage);
  const [currentCalc, setCurrentCalc] = useState({});

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
      // const res = await axios.get(replaceURL(url));
      const res = await axios.get(`MeteringDevices/${url}`);
      console.log('getCalculator', res);
      //  return { ...res, info: true, header: createTitleObject(res) };
      return res;
    } catch (error) {
      console.log(error);
      throw {
        resource: 'device',
        message: 'Произошла ошибка запроса устройства',
      };
    }
  }

  useEffect(() => {
    getCalculator(deviceId).then((result) => {
      setCurrentCalc(result);
    });

  }, []);

  useEffect(() => {
    // console.log('some', currentCalc);
    const currentInfoId = _.find(items, { label: model });
    console.log(currentInfoId)
    const { value } = {...currentInfoId} ;
    console.log(value)


    async function getDevice(url = '') {
      try {
        const res = await axios.get(`MeteringDevices/${url}`);
        return res;
      } catch (error) {
        console.log(error);
        throw {
          resource: 'device',
          message: 'Произошла ошибка запроса устройства',
        };
      }
    }
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
          infoId: Number(value),
          // infoId: Number((_.find(items, {'label': 'ВКТ-7'})).value)
      };



    getDevice(deviceId).then(() => {
      dispatch(
        setAddCalculatorForm(calculatorPage, initialStateDefaultValues),
      );
    });


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
    console.log(serialNumber);
  };

  const handleSubmit = async () => {
    alert('Cейчас будем отправлять данные!');
    try {
      // const res = await axios.post('Calculators', calculatorPage);
      // alert('Вычислитель успешно создан !');
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

      {/* <Modal id="add-calculator" ref={modalRef}>
        <ModalWrap>
          <ModalClose getModal={modalRef} /> */}
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
        {/* </ModalBottom>
        </ModalWrap> */}
        {/* </Modal> */}
      </ModalBottom>

    </AddDeviceContext.Provider>
  );
};

export default connect()(EditCalculator);

// const initialState = {
//   serialNumber: '',
//   checkingDate: moment().toISOString(),
//   futureCheckingDate: moment().toISOString(),
//   lastCommercialAccountingDate: moment().toISOString(),
//   connection: {
//     ipV4: '192.168.0.1',
//     deviceAddress: 0,
//     port: 1234,
//   },
//   futureCommercialAccountingDate: moment().toISOString(),
//   housingStockId: Number(objid),
//   infoId: 1,
// };

// const initialStateFullfill = [
//   { id: ['serialNumber'], value: 'serialNumber' },
//   { id: ['housingStockId'], value: Number(objid) },
//   { id: ['infoId'], value: 1 },
//   { id: ['lastCommercialAccountingDate'], value: moment().toISOString() },
//   { id: ['checkingDate'], value: moment().toISOString() },
//   { id: ['futureCheckingDate'], value: moment().toISOString() },
//   { id: ['connection', 'ipV4'], value: '192.168.1.1' },
//   { id: ['connection', 'deviceAddress'], value: 0 },
//   { id: ['connection', 'port'], value: 1 },
//   {
//     id: ['futureCommercialAccountingDate'],
//     value: moment()
//       .add(4, 'year')
//       .toISOString(),
//   },
// ];
