import React from 'react';
import '../../../../tt-components/antd.scss';
import AddCalculatorForm from './AddCalculatorForm';
import { StyledModal } from '../../../../tt-components';
import { ModalInterface } from '../../../../tt-components/interfaces';

const ModalAddCalculator = ({ visible, setVisible }: ModalInterface) => {
  return (
    <>
      <StyledModal
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        footer={null}
        width={800}
      >
        <AddCalculatorForm visible={visible} setVisible={setVisible} />
      </StyledModal>
    </>
  );
};

export default ModalAddCalculator;
