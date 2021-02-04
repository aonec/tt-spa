import React, { useState } from 'react';
import '../../../../tt-components/antd.scss';
import AddCalculatorForm from './AddCalculatorForm';
import { StyledModal } from '../../../../tt-components';

const ModalAddCalculator = (props) => {
  const { addCalculator, setAddCalculator, housingStockId } = props;
  const handleCancel = () => {
    setAddCalculator(false);
  };

  const modalProps = {
    handleCancel,
  }

  return (
    <>
      <StyledModal
        visible={addCalculator}
        // visible
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <AddCalculatorForm {...props} {...modalProps}/>

      </StyledModal>
    </>
  );
};

export default ModalAddCalculator;
