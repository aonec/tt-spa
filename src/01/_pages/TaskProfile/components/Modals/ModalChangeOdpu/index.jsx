import React from 'react';
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import {
  setModalDeregisterVisible,
} from '../../../../../Redux/actions/actions';
import { ButtonTT } from '../../../../../tt-components';
import DeregisterForm from './DeregisterForm';

const ModalChangeOdpu = () => {
  const dispatch = useDispatch();
  const visible = useSelector(
    (state) => _.get(state, ['deviceDeregisterReducer', 'visible'], false),
  );

  const handleCancel = () => {
    dispatch(setModalDeregisterVisible(false));
  };

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      footer={null}
    >
      <DeregisterForm />
      <ButtonTT
        type="submit"
        color="red"
        form="formikForm"
      >
        Снять прибор с учета
      </ButtonTT>
      <ButtonTT
        style={{ marginLeft: '16px' }}
        type="submit"
        color="white"
        onClick={handleCancel}
      >
        Отмена
      </ButtonTT>
    </Modal>
  );
};
export default ModalChangeOdpu;
