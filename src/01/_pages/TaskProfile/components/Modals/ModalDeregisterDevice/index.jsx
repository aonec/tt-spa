import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import {
  setModalDeregisterVisible,
} from '../../../../../Redux/actions/actions';
import { ButtonTT } from '../../../../../tt-components';
import DeregisterForm from './DeregisterForm';
import axios from '../../../../../axios';

const ModalDeregisterDevice = (props) => {
  const { number } = props;
  const [device, setDevice] = useState();
  const dispatch = useDispatch();
  const visible = useSelector(
    (state) => _.get(state, ['deviceDeregisterReducer', 'visible'], false),
  );

  async function getDevice(url = '') {
    try {
      const res = await axios.get(`MeteringDevices/search?DeviceType=Housing&Question=${url}`);
      console.log(res)
      return res;
    } catch (error) {
      console.log(error);
      throw {
        resource: 'device',
        message: 'Произошла ошибка запроса устройства',
      };
    }
  }
  useEffect(() => {
    getDevice(number).then((res) => {
      console.log('Res', res[0]);
      setDevice(res[0]);
    });
  }, [number]);

  const handleCancel = () => {
    dispatch(setModalDeregisterVisible(false));
  };
  const buttonHandler = () => {
    console.log(props);
    console.log(number);
    console.log(device);
  };

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      footer={null}
    >
      {/*<ButtonTT onClick={buttonHandler} />*/}
      <DeregisterForm deviceOdpu={device} />
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
export default ModalDeregisterDevice;
