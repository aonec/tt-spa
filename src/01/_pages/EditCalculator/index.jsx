import React, { useState, useEffect } from 'react';
import moment from 'moment';
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

import { Title, ButtonTT, Header } from '01/tt-components'
import TabsComponent from './components/Tabs/Main';
import { setAddCalculatorForm } from './store/actions';

export const AddDeviceContext = React.createContext();

const EditCalculator = () => {
  const { 0: objid, 1: deviceId } = useParams();
  const [currentTabKey, setTab] = useState('1');
  const modalRef = React.createRef();
  const dispatch = useDispatch();
  const calculatorPage = useSelector((state) => state.calculatorPage);

  const initialStateDefaultValues = {
    serialNumber: '',
    checkingDate: moment().toISOString(),
    futureCheckingDate: moment().toISOString(),
    lastCommercialAccountingDate: moment().toISOString(),
    connection: {
      ipV4: '192.168.0.1',
      deviceAddress: 0,
      port: 1234,
    },
    futureCommercialAccountingDate: moment().toISOString(),
    housingStockId: Number(objid),
    infoId: 1,
  };

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
    // initialStateFullfill.map((item) => {
    //   dispatch(onChangeFormValueByPath(item.id, item.value));
    // });
  console.log("deviceId",deviceId)
    // getCalculator(deviceId).then(result => {dispatch(
    //     setAddCalculatorForm(calculatorPage, result)
    // )})
    const a = getCalculator(deviceId);
    a.then((res) => console.log("testres", res))

    
    // dispatch(
    //   setAddCalculatorForm(calculatorPage, initialStateDefaultValues),
    // );
  }, []);

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
    console.log("test")
  };

  const handleSubmit = async () => {
    alert('Cейчас будем отправлять данные!');
    try {
      const res = await axios.post('Calculators', calculatorPage);
      alert('Вычислитель успешно создан !');
      // console.log(res);
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
      {/*</Modal>*/}
          </ModalBottom>

    </AddDeviceContext.Provider>
  )
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
