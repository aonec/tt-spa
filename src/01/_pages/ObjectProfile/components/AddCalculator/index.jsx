import React, { useState, useEffect } from 'react';
import moment from 'moment';
import $ from 'jquery';
import { useParams } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import '../../../../tt-components/antd.scss';
import {
  Modal,
  ModalWrap,
  ModalTop,
  ModalMain,
  ModalBottom,
  ModalClose,
} from '../../../../tt-components/Modal';
import { Title, ButtonTT } from '../../../../tt-components';
import axios from '../../../../axios';
import TabsComponent from './components/Tabs/Main';
import { setAddCalculatorForm } from '../../../../Redux/actions/actions';

const ModalCalculator = () => {
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
    documentsIds: [],
    connection: {
      ipV4: '',
      deviceAddress: 0,
      port: null,
    },
    futureCommercialAccountingDate: moment().add(4, 'year').toISOString(),
    housingStockId: Number(objid),
    infoId: 1,
  };

  useEffect(() => {
    dispatch(
      setAddCalculatorForm(calculatorPage, initialStateDefaultValues),
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

  const hideMe = () => {
    $('#add-calculator').css('display', 'none');
  };

  const buttonHandler = () => {
    console.log('buttonHandler');
  };

  const handleSubmit = async () => {
    alert('Cейчас будем отправлять данные!');
    console.log(JSON.stringify(calculatorPage));
    try {
      const res = await axios.post('Calculators', calculatorPage);
      alert('Вычислитель успешно создан !');
      console.log(res)
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
    <Modal id="add-calculator" ref={modalRef}>
      <ModalWrap>
        {/* <button onClick={buttonHandler}>buttonHandler</button> */}
        <ModalClose getModal={modalRef} />
        <ModalTop>
          <Title size="middle" color="black">
            Добавление нового вычислителя
          </Title>
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
      </ModalWrap>
    </Modal>
  );
};

export default ModalCalculator;
