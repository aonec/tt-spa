import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import {
  setModalCalculatorReportVisible,
} from '../../../../../Redux/actions/actions';
import { ButtonTT } from '../../../../../tt-components';
import ModalCalculatorReportForm from './ModalCalculatorReportForm';
import axios from '../../../../../axios';

const ModalCalculatorReport = () => {
  const { deviceId } = useParams();
  const [device, setDevice] = useState({});

  async function getCalculator(id = '') {
    try {
      const res = await axios.get(`MeteringDevices/${id}`);
      setDevice(res);
      console.log("ModalCalculatorReport", res)
      return res;
    } catch (error) {
      console.log(error);
      throw {
        resource: 'device',
        message: 'Произошла ошибка запроса Вычислителя',
      };
    }
  }

  useEffect(() => {
    getCalculator(deviceId);
  }, []);

  const dispatch = useDispatch();
  const visible = useSelector(
    (state) => _.get(state, ['modalsReducer', 'ModalCalculatorReport', 'visible'], false),
  );

  const handleCancel = () => {
    dispatch(setModalCalculatorReportVisible(['ModalCalculatorReport', 'visible'], false));
  };

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      footer={null}
      width="800px"
    >
      <ModalCalculatorReportForm  device={device} />
      <ButtonTT
        type="submit"
        color="blue"
        form="formikForm"
      >
        Выгрузить
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
export default ModalCalculatorReport;
