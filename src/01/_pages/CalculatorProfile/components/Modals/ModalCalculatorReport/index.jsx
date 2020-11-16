import React, { useContext } from 'react';
import { Modal } from 'antd';
import ModalCalculatorReportForm from './ModalCalculatorReportForm';
import { DeviceContext } from "../../../CalculatorProfile";

export const ModalCalculatorReport = () => {
  console.log('ModalCalculatorReport');

  const { report, setReport, device } = useContext(DeviceContext);
  const handleCancel = () => {
    setReport(false);
  };

  return (
    <Modal
      visible={report}
      width={800}
      footer={null}
      onCancel={handleCancel}
    >
      <ModalCalculatorReportForm device={device} handleCancel={handleCancel}/>
    </Modal>
  );
};

export default ModalCalculatorReport;
