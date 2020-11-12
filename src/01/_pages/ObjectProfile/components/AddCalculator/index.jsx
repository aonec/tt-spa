import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../../../../tt-components/antd.scss';
import { Form, Modal } from 'antd';
import { Title, ButtonTT, InputTT, SelectTT, DatePickerTT } from '../../../../tt-components';
import axios from '../../../../axios';
import TabsComponent from './components/addCalculatorTabs';
import { onChangeFormValueByPath, setAddCalculatorForm } from '../../../../Redux/actions/actions';
import { ObjectContext } from '../../index';
import AddCalculatorForm from './AddCalculatorForm'
import { items, serviceLife } from "../../../../tt-components/localBases";

const ModalCalculator = () => {
  const { 0: objid, 1: deviceId } = useParams();
  const [currentTabKey, setTab] = useState('1');
  const modalRef = React.createRef();
  const dispatch = useDispatch();
  const calculatorPage = useSelector((state) => state.calculatorPage);
  const { addCalculator, setAddCalculator } = useContext(ObjectContext);
  const initialStateDefaultValues = {
    serialNumber: '',
    checkingDate: moment().toISOString(),
    futureCheckingDate: moment().toISOString(),
    lastCommercialAccountingDate: moment().toISOString(),
    documentsIds: [],
    connection: {
      ipV4: '',
      deviceAddress: null,
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

  const Buttons = () => {
    const RenderNextButton = () => {
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

    const RenderSubmitButton = () => {
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

    const CancelButton = () => (

      <ButtonTT color="white" onClick={handleCancel} style={{ marginLeft: '16px' }}>
        Отмена
      </ButtonTT>
    );
    return (
      <div>
        <RenderNextButton />
        <RenderSubmitButton />
        <CancelButton />
      </div>
    );
  };

  const buttonHandler = () => {
    console.log('buttonHandler');
    console.log(addCalculator);
  };

  const handleCancel = () => {
    setAddCalculator(false);
  };

  const handleSubmit = async () => {
    alert('Cейчас будем отправлять данные!');
    console.log(JSON.stringify(calculatorPage));
    try {
      const res = await axios.post('Calculators', calculatorPage);
      alert('Вычислитель успешно создан !');
      return res;
    } catch (error) {
      alert(
        'Что-то пошло не так: попробуйте исправить CЕРИЙНЫЙ НОМЕР И АДРЕС УСТРОЙСТВА',
      );
      throw new Error(error);
    }
  };

  return (
    <Modal
      // visible={addCalculator}
      visible={true}
      onCancel={handleCancel}
      footer={null}
      ref={modalRef}
      width={800}
    >
      <ButtonTT onClick={buttonHandler}>buttonHandler</ButtonTT>
      <Title size="middle" color="black">
        Добавление нового вычислителя
      </Title>

      <TabsComponent
        currentTabKey={currentTabKey}
        handleChangeTab={handleChangeTab}
      />

      <AddCalculatorForm />
      <Buttons style={{ margin: '16px 0' }} />

    </Modal>
  );
};

export default ModalCalculator;
