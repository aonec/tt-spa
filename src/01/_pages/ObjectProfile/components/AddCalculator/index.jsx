import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import '../../../../tt-components/antd.scss';
import {  Modal } from 'antd';
import {
  Title, ButtonTT
} from '../../../../tt-components';
import TabsComponent from './components/addCalculatorTabs';
import { ObjectContext } from '../../index';
import AddCalculatorForm from './AddCalculatorForm';

const ModalCalculator = () => {
  const [currentTabKey, setTab] = useState('1');
  const { addCalculator, setAddCalculator,objid } = useContext(ObjectContext);

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
    console.log("DONE");
    // try {
    //   const res = await axios.post('Calculators', calculatorPage);
    //   alert('Вычислитель успешно создан !');
    //   return res;
    // } catch (error) {
    //   alert(
    //     'Что-то пошло не так: попробуйте исправить CЕРИЙНЫЙ НОМЕР И АДРЕС УСТРОЙСТВА',
    //   );
    //   throw new Error(error);
    // }
  };

  return (
    <Modal
      visible={addCalculator}
      // visible={true}
      onCancel={handleCancel}
      footer={null}
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

      <AddCalculatorForm currentTabKey={currentTabKey} objid={objid}/>
      <Buttons style={{ margin: '16px 0' }} />

    </Modal>
  );
};

export default ModalCalculator;
