/* eslint-disable */

import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { setModalCalcReportVisible } from '../../../../../Redux/actions/actions';
import { ButtonTT } from '../../../../../tt-components';

import axios from '../../../../../../api/axios';
import CalcReportForm from './CalcReportForm';

// import CalculatorTemplate from './CalculatorTemplate';

const ModalCalcReport = ({ deviceId }) => {
  const dispatch = useDispatch();
  const visible = useSelector((state) =>
    _.get(state, ['calcReportDeregisterReducer', 'visible'], false)
  );
  // const [device, setDevice] = useState();

  const { device: data, run, status, isSuccess } = useAsync();

  useEffect(() => {
    // getHousingMeteringDevices(deviceId).then((res) => {
    //   setDevice(res);
    // });

    run(getHousingMeteringDevices(deviceId));

    // setDevice(CalculatorTemplate);
  }, [deviceId]);

  const handleCancel = () => {
    dispatch(setModalCalcReportVisible(false));
  };

  return (
    <>
      {status === 'error' && <div style={{ background: 'red' }}>ОШИБКА</div>}
      {status === 'pending' || (status === 'idle' && <div>ЗАГРУЗКА...</div>)}
      {status === 'resolved' && (
        <Modal
          visible={visible}
          onCancel={handleCancel}
          footer={null}
          width="800px"
        >
          <CalcReportForm device={device} />

          <ButtonTT type="submit" color="white" onClick={handleCancel}>
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
      )}
    </>
  );
};
export default ModalCalcReport;
