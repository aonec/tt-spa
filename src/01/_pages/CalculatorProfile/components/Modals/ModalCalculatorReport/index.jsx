import React, { useContext } from 'react';
import { Form, Modal } from 'antd';
import ModalCalculatorReportForm from './ModalCalculatorReportForm';
import { DeviceContext } from '../../../CalculatorProfile';
import ModalSonoSafeReportForm, { App } from './ModalSonoSafeReportForm';
import { ButtonTT } from '../../../../../tt-components/ButtonTT';
import { StyledModal } from "../../../../../tt-components";

export const ModalCalculatorReport = () => {
  const { report, setReport, device } = useContext(DeviceContext);
  const handleCancel = () => {
    setReport(false);
  };
  if (device.infoId !== 10) {
    return (
      <StyledModal
        visible={report}
        // visible
        width={800}
        footer={null}
        onCancel={handleCancel}
      >
        <ModalCalculatorReportForm device={device} handleCancel={handleCancel} />
      </StyledModal>
    );
  }

  return (
    <StyledModal
      visible={report}
      // visible
      width={800}
      footer={null}
      onCancel={handleCancel}
    >
      <ModalSonoSafeReportForm device={device} handleCancel={handleCancel} />
    </StyledModal>

  );
};

export default ModalCalculatorReport;
