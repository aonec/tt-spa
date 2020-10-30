import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import {
  setModalCalcReportVisible,
} from '../../../../../Redux/actions/actions';
import { ButtonTT } from '../../../../../tt-components';

import axios from '../../../../../axios';
import CalcReportForm from './CalcReportForm';
import CalculatorTemplate from './CalculatorTemplate';

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

const ModalCalcReport = ({ deviceId }) => {
  const dispatch = useDispatch();
  const visible = useSelector(
    (state) => _.get(state, ['calcReportDeregisterReducer', 'visible'], false),
  );
  const [device, setDevice] = useState();

  useEffect(() => {
    // getHousingMeteringDevices(deviceId).then((res) => {
    //   setDevice(res);
    // });

    setDevice(CalculatorTemplate);
  }, []);

  const handleCancel = () => {
    dispatch(setModalCalcReportVisible(false));
  };


  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      footer={null}
      width="800px"
    >

      <CalcReportForm device={CalculatorTemplate} />

      <ButtonTT
        type="submit"
        color="white"
        onClick={handleCancel}
      >
        Отмена
      </ButtonTT>

      <ButtonTT
        style={{ marginLeft: '16px' }}
        type="submit"
        color="blue"
        form="formikForm"
      >
        Выгрузить
      </ButtonTT>

    </Modal>
  );
};
export default ModalCalcReport;
