import React, { useState, useContext } from 'react';
import '../../../../tt-components/antd.scss';
import { Modal } from 'antd';
import { Title } from '../../../../tt-components';
import TabsComponent from './addCalculatorTabs';
import { ObjectContext } from '../../index';
import AddCalculatorForm from './AddCalculatorForm';

const ModalCalculator = () => {

  const [currentTabKey, setTab] = useState('1');
  const { addCalculator, setAddCalculator, objid } = useContext(ObjectContext);

  function handleChangeTab(value) {
    setTab(value);
  }

  function handleNext() {
    setTab(String(Number(currentTabKey) + 1));
  }

  const handleCancel = () => {
    setAddCalculator(false);
  };

  return (
    <Modal
      visible={addCalculator}
      onCancel={handleCancel}
      footer={null}
      width={800}
    >
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
