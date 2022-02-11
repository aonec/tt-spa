import React, { useContext } from 'react';
import '../../../../tt-components/antd.scss';
import AddCalculatorForm from './AddCalculatorForm';
import { StyledModal } from '../../../../tt-components';
import { AddNodeContext } from '../../AddNodeContext';

const ModalAddCalculator = (props: any) => {
  const { addCalculator, setAddCalculator } = useContext(AddNodeContext);
  const handleCancel = () => {
    setAddCalculator(false);
  };

  return (
    <>
      <StyledModal
        visible={addCalculator}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <AddCalculatorForm handleCancel={handleCancel} />
      </StyledModal>
    </>
  );
};

export default ModalAddCalculator;
