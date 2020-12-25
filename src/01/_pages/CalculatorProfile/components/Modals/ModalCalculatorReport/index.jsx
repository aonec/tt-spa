import React, { useContext } from 'react';
import { Form, Modal } from 'antd';
import ModalCalculatorReportForm from './ModalCalculatorReportForm';
import { DeviceContext } from '../../../CalculatorProfile';
import ModalSonoSafeReportForm, { App } from './ModalSonoSafeReportForm';
import { ButtonTT } from '../../../../../tt-components/ButtonTT';

export const ModalCalculatorReport = () => {
  // console.log('ModalCalculatorReport');

  // const { report, setReport, device } = useContext(DeviceContext);

  const { report, setReport, device } = useContext(DeviceContext);
  const handleCancel = () => {
    setReport(false);
  };
  console.log(device);
  // if (device.infoId !== 10) {
    return (
      <Modal
        visible={report}
        width={800}
        footer={null}
        onCancel={handleCancel}
      >
        <ModalCalculatorReportForm device={device} handleCancel={handleCancel} />
      </Modal>
    );
  // }

  // return (
  //   <ModalSonoSafeReportForm device={device} handleCancel={handleCancel} />
  // );
};

export default ModalCalculatorReport;
