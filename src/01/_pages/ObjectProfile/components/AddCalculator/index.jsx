import React, { useState, useContext } from 'react';
import '../../../../tt-components/antd.scss';
import { Modal } from 'antd';
import { ObjectContext } from '../../index';
import AddCalculatorForm from './AddCalculatorForm';

const ModalCalculator = () => {


  const { addCalculator, setAddCalculator, objid } = useContext(ObjectContext);
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
      <AddCalculatorForm
        objid={objid}
        addCalculator={addCalculator}
        setAddCalculator={setAddCalculator}
      />

    </Modal>
  );
};

export default ModalCalculator;
