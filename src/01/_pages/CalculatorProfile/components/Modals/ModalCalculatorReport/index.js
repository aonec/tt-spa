import React, { useContext, useEffect } from 'react';
import { Modal } from 'antd';
import { DeviceContext } from "../../../CalculatorProfile";
import device from './CalculatorTemplate';
import CalculatorReportForm from './CalculatorReportForm'
const ModalCalculatorReport = () => {
  console.log('DeregisterDevice');
  const { report, setReport } = useContext(DeviceContext);
  const handleCancel = () => {
    setReport(false);
  };

  if (device ==undefined) {
    return null
  }
  console.log("device", device)
  return (
    <Modal
      visible={report}
      width={800}
      footer={null}
      onCancel={handleCancel}
    >
      <div>ModalCalculatorReport</div>
      <CalculatorReportForm device={device}/>
    </Modal>
  );
};
export default ModalCalculatorReport;
