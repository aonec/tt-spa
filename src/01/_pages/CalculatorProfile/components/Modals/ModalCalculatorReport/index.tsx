import React, { Dispatch, SetStateAction } from 'react';
import ModalCalculatorReportForm from './ModalCalculatorReportForm';
import ModalSonoSafeReportForm from './ModalSonoSafeReportForm';
import { StyledModal } from '../../../../../tt-components';
import { CalculatorResponse } from '../../../../../../myApi';

interface ModalCalculatorReportInterface {
  report: boolean;
  setReport: Dispatch<SetStateAction<boolean>>;
  device: CalculatorResponse;
}

export const ModalCalculatorReport = ({
  report,
  setReport,
  device,
}: ModalCalculatorReportInterface) => {
  if (!report || !setReport || !device) {
    return null;
  }

  const handleCancel = () => {
    setReport(false);
  };

  if (device.infoId !== 10) {
    return (
      <StyledModal
        visible={true}
        width={800}
        footer={null}
        onCancel={handleCancel}
      >
        <ModalCalculatorReportForm
          device={device}
          handleCancel={handleCancel}
        />
      </StyledModal>
    );
  }

  return (
    <StyledModal
      visible={report}
      width={800}
      footer={null}
      onCancel={handleCancel}
    >
      <ModalSonoSafeReportForm device={device} handleCancel={handleCancel} />
    </StyledModal>
  );
};

export default ModalCalculatorReport;
