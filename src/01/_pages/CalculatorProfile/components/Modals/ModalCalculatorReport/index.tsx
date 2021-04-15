import React, { Dispatch, SetStateAction } from 'react';
import ModalCalculatorReportForm from './ModalCalculatorReportForm';
import ModalSonoSafeReportForm from './ModalSonoSafeReportForm';
import { StyledModal } from '../../../../../tt-components';
import { CalculatorResponse } from '../../../../../../myApi';
import ButtonTT from '../../../../../tt-components/ButtonTT';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

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
  const { pathname } = useLocation();
  debugger;
  if (!report || !setReport || !device) {
    return null;
  }

  const handleCancel = () => {
    setReport(false);
  };

  if (!device.isConnected) {
    return (
      <StyledModal
        visible={report}
        title={
          <Header style={{ padding: '0 8px' }}>
            Вычислитель не опрашивается
          </Header>
        }
        onCancel={handleCancel}
        width={800}
        footer={
          <Footer>
            <Link to={`${pathname}/edit`}>
              <ButtonTT color={'blue'} key="back" onClick={handleCancel}>
                Перейти к настройкам соединения
              </ButtonTT>
            </Link>
          </Footer>
        }
      >
        <p
          style={{
            color: 'var(--main-100)',
            margin: 0,
            padding: '16px 32px 32px 32px',
          }}
        >
          К сожалению, мы не можем выгрузить отчёт об общедомовом потреблении с
          неопрашиваемого вычислителя. Проверьте настройки соединения и
          убедитесь, что вычислитель подключен к сети. После этого вы сможете
          выгружать отчёты и статистические данные.
        </p>
      </StyledModal>
    );
  }

  if (device.infoId !== 10) {
    return (
      <StyledModal
        visible={report}
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

const Footer = styled.div`
  background-color: var(--bg);
  height: 96px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 32px;
  font-weight: 700;
`;

const Header = styled.h1`
  font-size: 32px;
  line-height: 1.5;
  font-weight: 300;
  margin: 0;
`;

export default ModalCalculatorReport;
