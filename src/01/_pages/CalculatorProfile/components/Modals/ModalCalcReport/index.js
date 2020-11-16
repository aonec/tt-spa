import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'antd';
import CalcReportForm from './CalcReportForm';
import CalculatorTemplate from './CalculatorTemplate';

import { DeviceContext } from '../../../CalculatorProfile';

const ModalCalcReport = ({ deviceId }) => {
  const { report, setReport } = useContext(DeviceContext);
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
      {device ? <CalcReportForm device={CalculatorTemplate} /> : <div>ЗАГРУЗКА</div>}
    </Modal>
  );
};
export default ModalCalcReport;
