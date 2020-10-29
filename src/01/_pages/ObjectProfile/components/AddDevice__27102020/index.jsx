import React, { useState, useEffect } from 'react';
import moment from 'moment';
import $ from 'jquery';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';
import axios from '../../../../axios';
import { Title, ButtonTT } from '../../../../tt-components';
import AddDeviceForm from './components/AddDeviceForm'
import {
  ModalWrap,
  ModalTop,
  ModalMain,
  ModalBottom,
  ModalClose,
} from '../../../../tt-components/Modal';
import TabsComponent from './components/Tabs/Main';
import { setAddDeviceForm, setModalDeregisterVisible } from '../../../../Redux/actions/actions';

const ModalAddDevice = () => {
  const { 0: objid } = useParams();
  const [currentTabKey, setTab] = useState('1');
  const modalRef = React.createRef();
  const dispatch = useDispatch();
  const deviceReducer = useSelector((state) => state.deviceReducer);

  function randomInteger(min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
  const visible = true;

  const handleCancel = () => {
    dispatch(setModalDeregisterVisible(false));
  };

  const initialStateDefaultValues = {
    calculatorId: '',
    checkingDate: moment().toISOString(),
    connection: {
      ipV4: '192.168.1.1',
      deviceAddress: randomInteger(1, 255),
      port: 1234,
    },
    futureCheckingDate: moment().toISOString(),
    futureCommercialAccountingDate: moment().toISOString(),
    housingMeteringDeviceType: 'FlowMeter',
    housingStockId: Number(objid),
    lastCommercialAccountingDate: moment().toISOString(),
    model: '',
    pipe: {
      entryNumber: 1,
      hubNumber: 1,
      pipeNumber: 1,
      magistral: 'FeedFlow',
    },
    resource: 'ColdWaterSupply',
    serialNumber: '',
  };

  useEffect(() => {
    dispatch(
      setAddDeviceForm(deviceReducer, initialStateDefaultValues),
    );
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


  const buttonHandler = () => {
    console.log('buttonHandler');
  };

  const handleSubmit = async () => {
    alert('Cейчас будем отправлять данные!');
    try {
      const res = await axios.post('HousingMeteringDevices', deviceReducer);
      // console.log(deviceReducer)
      alert('ОДПУ успешно создан !');
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
    <Modal
      visible={visible}
      onCancel={handleCancel}
      footer={null}
      width={'800px'}
    >
      <ModalTop>
        <Title size="middle" color="black">
          Добавление нового ОДПУ
        </Title>
      </ModalTop>
      <ModalMain>
        <TabsComponent
          currentTabKey={currentTabKey}
          handleChangeTab={handleChangeTab}
        />
      </ModalMain>
      <AddDeviceForm />
      <ModalBottom>
        <ButtonTT color="white" onClick={handleCancel}>
          Отмена
        </ButtonTT>
        {renderNextButton()}
        {renderSubmitButton()}
      </ModalBottom>
    </Modal>
  );
};

export default ModalAddDevice;
