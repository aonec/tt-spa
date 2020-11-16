import React from 'react';
import { Modal } from 'antd';
import { device } from './CalculatorTemplate';
import ModalCalculatorReportForm from './ModalCalculatorReportForm';

export const ModalCalculatorReport = () => {
  console.log('ModalCalculatorReport');
  return (
    <Modal
      visible
      width={800}
      footer={null}
    >
      <ModalCalculatorReportForm device={device} />
    </Modal>
  );
};

export default ModalCalculatorReport;
