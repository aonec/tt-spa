import React from 'react';
import { Modal } from 'antd';
import { ButtonTT } from '../../tt-components';
import ModalTemplateForm from './ModalTemplateForm';

const ModalTemplate = () => {

  const handleCancel = () => {
      setModalTemplateVisible(false)
  };

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      footer={null}
    >
      <ModalTemplateForm />
      <ButtonTT
        type="submit"
        color="blue"
        form="formikForm"
      >
        ОК
      </ButtonTT>
      <ButtonTT
        style={{ marginLeft: '16px' }}
        color="white"
        onClick={handleCancel}
      >
        Отмена
      </ButtonTT>
    </Modal>
  );
};
export default ModalTemplate;
