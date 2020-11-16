import React, { useState, useEffect, useContext } from 'react';
import '../../../../tt-components/antd.scss';
import { Modal } from 'antd';
import {
  Title, ButtonTT,
} from '../../../../tt-components';
import TabsComponent from './components/addCalculatorTabs';
import { ObjectContext } from '../../index';
import AddCalculatorForm from './AddCalculatorForm';

const ModalCalculator = () => {
  const [currentTabKey, setTab] = useState('1');
  const { addCalculator, setAddCalculator, objid } = useContext(ObjectContext);

  function handleChangeTab(value) {
    setTab(value);
  }

  const handleNext = () => {
    setTab(String(Number(currentTabKey) + 1));
  };

  const handleCancel = () => {
    setAddCalculator(false);
  };

  const buttonHandler = () => {
    console.log('buttonHandler');
  };

  return (
    <Modal
      visible={addCalculator}
      onCancel={handleCancel}
      footer={null}
      width={800}
    >
      {/*<ButtonTT onClick={buttonHandler}>buttonHandler</ButtonTT>*/}
      <Title size="middle" color="black">
        Добавление нового вычислителя
      </Title>

      <TabsComponent
        currentTabKey={currentTabKey}
        handleChangeTab={handleChangeTab}
      />

      <AddCalculatorForm
        currentTabKey={currentTabKey}
        objid={objid}
        addCalculator={addCalculator}
        setAddCalculator={setAddCalculator}
        handleCancel={handleCancel}
        handleNext={handleNext}
      />

    </Modal>
  );
};

export default ModalCalculator;
