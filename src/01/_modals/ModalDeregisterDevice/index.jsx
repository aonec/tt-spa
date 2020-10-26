import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import {
  setModalDeregisterVisible,
} from '../../Redux/actions/actions';
import { ButtonTT } from '../../tt-components';
import DeregisterForm from './DeregisterForm';
import axios from '../../axios';

async function getHousingMeteringDevices(id = '') {
  try {
    // const res = await axios.get(replaceURL(url));
    const res = await axios.get(`HousingMeteringDevices/${id}`);
    console.log('res', res);
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'device',
      message: 'Произошла ошибка запроса устройства',
    };
  }
}

const ModalDeregisterDevice = ({ deviceId }) => {
  const dispatch = useDispatch();
  const visible = useSelector(
    (state) => _.get(state, ['deviceDeregisterReducer', 'visible'], false),
  );
  const [device, setDevice] = useState();

  useEffect(() => {
    getHousingMeteringDevices(deviceId).then((res) => {
      setDevice(res);
    });
  }, []);

  const handleCancel = () => {
    dispatch(setModalDeregisterVisible(false));
  };

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      footer={null}
    >
      <DeregisterForm device={device} />
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
