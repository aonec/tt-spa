import React, { useContext } from 'react';
import '../../../../tt-components/antd.scss';
import AddCalculatorForm from './AddCalculatorForm';
import { StyledModal } from '../../../../tt-components';
import { AddNodeContext } from '../../AddNodeContext';

const ModalAddCalculator = () => {
  const { addCalculatorVisible, setAddCalculatorVisible } = useContext(
    AddNodeContext
  );
  return (
    <>
      <StyledModal
        visible={addCalculatorVisible}
        onCancel={() => {
          setAddCalculatorVisible(false);
        }}
        footer={null}
        width={800}
      >
        <AddCalculatorForm />
      </StyledModal>
    </>
  );
};

export default ModalAddCalculator;
