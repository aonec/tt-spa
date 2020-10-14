import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  setModalDeregisterVisible,
} from '../../../../../Redux/actions/actions';
import { ButtonTT } from '../../../../../tt-components';
import DeregisterForm from './DeregisterForm';

const ModalDeregisterDevice = () => {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.deviceDeregisterReducer.visible) || false;

  const handleCancel = (e) => {
    dispatch(setModalDeregisterVisible(['visible'], false));
  };

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      footer={null}
    >
      <DeregisterForm/>
      <ButtonTT type="submit" color="red" form="formikForm">Снять прибор с учета</ButtonTT>
      <ButtonTT style={{ marginLeft: '16px' }} type="submit" color="white" onClick={handleCancel}>Отмена</ButtonTT>
    </Modal>
  );
};
export default ModalDeregisterDevice;
