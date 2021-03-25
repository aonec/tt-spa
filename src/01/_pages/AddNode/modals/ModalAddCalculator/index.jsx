import React, { useContext } from 'react';
import '../../../../tt-components/antd.scss';
import AddCalculatorForm from './AddCalculatorForm';
import { StyledModal } from '../../../../tt-components';
import { AddNodeContext } from '../../index';

const ModalAddCalculator = (props) => {
  const { addCalculator, setAddCalculator, housingStockId } = useContext(
    AddNodeContext
  );
  const handleCancel = () => {
    setAddCalculator(false);
  };

  const modalProps = {
    handleCancel,
  };

  return (
    <>
      <StyledModal
        visible={addCalculator}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <AddCalculatorForm {...modalProps} {...props} />
      </StyledModal>
    </>
  );
};

export default ModalAddCalculator;
