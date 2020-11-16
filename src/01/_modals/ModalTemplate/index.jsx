import React from 'react';
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import {
  setModalTemplateVisible,
} from '../../Redux/actions/actions';
import { ButtonTT } from '../../tt-components';
import ModalTemplateForm from './ModalTemplateForm';

const ModalTemplate = () => {
  const dispatch = useDispatch();
  const visible = useSelector(
    (state) => _.get(state, ['modalsReducer', 'ModalTemplate', 'visible'], false),
  );

  const handleCancel = () => {
    dispatch(setModalTemplateVisible(['ModalTemplate', 'visible'], false));
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
