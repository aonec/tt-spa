import React, { useContext, useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Modal } from 'antd';

import CalcReportForm from './CalcReportForm';
import CalculatorTemplate from './CalculatorTemplate';

import { DeviceContext } from "../../../CalculatorProfile";

const ModalCalcReport = ({ deviceId }) => {

  const {report, setReport} =useContext(DeviceContext)
  const [device, setDevice] = useState();

  useEffect(() => {
    // getHousingMeteringDevices(deviceId).then((res) => {
    //   setDevice(res);
    // });

    setDevice(CalculatorTemplate);
  }, []);

  const handleCancel = () => {
    setReport(false);
  };

  return (
    <Modal
      visible={report}
      onCancel={handleCancel}
      footer={null}
      width="800px"
    >

      <CalcReportForm device={CalculatorTemplate} />

    </Modal>
  );
};
export default ModalCalcReport;
