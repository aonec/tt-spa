import React, {useContext, useState} from 'react';
import { Modal } from 'antd';
import ModalCalculatorDeregisterForm from './ModalCalculatorDeregisterForm';

const ModalCalculatorDeregister = (props) => {
  const {visible, id, setVisible} = props;

  const [device, setDevice] = useState();

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <Modal
      visible={visible}
      height={488}
      width={800}
      footer={null}
      onCancel={handleCancel}
    >
      <ModalCalculatorDeregisterForm handleCancel={handleCancel} {...props} />
    </Modal>
  );
};

export default ModalCalculatorDeregister;
