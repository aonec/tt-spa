import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'antd';
import CalcReportForm from './CalcReportForm';
import CalculatorTemplate from './CalculatorTemplate';

import { DeviceContext } from '../../../CalculatorProfile';

const ModalCalcReport = ({ deviceId }) => {
  // const { report, setReport } = useContext(DeviceContext);
  const [device, setDevice] = useState();

  useEffect(() => {
    // getHousingMeteringDevices(deviceId).then((res) => {
    //   setDevice(res);
    // });

    setDevice(CalculatorTemplate);
  }, []);

  const handleCancel = () => {
    // setReport(false);
  };
  if (!device) {
    return (
      null
    )

  }
  return (
    <Modal
      visible={true}
      onCancel={handleCancel}
      footer={null}
      width="800px"
    >
    <CalcReportForm device={device} />
    </Modal>
  );
};
export default ModalCalcReport;
