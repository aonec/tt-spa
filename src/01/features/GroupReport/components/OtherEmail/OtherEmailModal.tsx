import React, { ChangeEventHandler, useEffect, useState } from 'react';
import ButtonTT from '../../../../tt-components/ButtonTT';
import styled from 'styled-components';
import { Modal, Form } from 'antd';
import InputTT from '../../../../tt-components/InputTT';
import { setGroupStatus } from '../../models/groupReportReducer';
import { useAppDispatch, useAppSelector } from '../../../../Redux/store';
import { sendGroupReport } from '../../../../_api/group_report';
import { Loader } from '../../../../_components/Loader';

const OtherEmailModal = () => {
  const [error, setError] = useState(null);
  const [sendingStatus, setSendingStatus] = useState('idle');
  const [inputValue, setInputValue] = useState('');
  const groupReportFormState = useAppSelector(
    (state) => state.groupReport.groupReportFormState
  );
  const groupReportStatus = useAppSelector(
    (state) => state.groupReport.groupReportStatus
  );
  const isMounted = React.useRef(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const {
    houseManagementId,
    category,
    detailing,
    resource,
    dates,
  } = groupReportFormState;

  const isSending = sendingStatus === 'loading';
  const isError = sendingStatus === 'error';

  const isVisible = groupReportStatus === 'otherEmailForm';

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };

  const closeModal = () => dispatch(setGroupStatus(undefined));

  const handleSubmit = async () => {
    setSendingStatus('loading');
    try {
      await sendGroupReport({
        HouseManagementId: houseManagementId,
        NodeResourceTypes: resource,
        NodeStatus: category,
        ReportType: detailing,
        From: dates[0],
        To: dates[1],
        DelayedEmailTarget: inputValue,
      });
      if (!isMounted.current) return;
      setSendingStatus('success');
      closeModal();
    } catch (error) {
      if (!isMounted.current) return;
      setError(error);
      setSendingStatus('error');
    }
  };

  return (
    <StyledModal
      confirmLoading={true}
      visible={isVisible}
      title={<Header>Новая почта для отправки отчёта</Header>}
      width={800}
      onCancel={closeModal}
      footer={
        <Footer>
          <ButtonTT color={'white'} onClick={closeModal}>
            Отмена
          </ButtonTT>
          <ButtonTT color={'blue'} onClick={handleSubmit} disabled={isSending}>
            Отправить отчёт
          </ButtonTT>
        </Footer>
      }
    >
      {isSending ? (
        <Loader show />
      ) : (
        <Form.Item
          validateStatus={isError ? 'error' : ''}
          help={
            isError
              ? 'Произошла ошибка отправления. Попробуйте позже или обратитесь в техподдержку'
              : ''
          }
        >
          <InputTT
            name="email"
            placeholder="Email"
            value={inputValue}
            onChange={handleChange}
          />
        </Form.Item>
      )}
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

const StyledModal = styled(Modal)`
  .ant-modal-header {
    padding: 24px 32px;
    border: 0;
  }

  .ant-modal-body {
    padding: 0 32px 32px 32px;
  }

  .ant-modal-footer {
    padding: 0;
  }

  .ant-modal-close-x {
    fill: var(--main-100);
  }

  .ant-modal-footer button + button {
    margin-bottom: 0;
    margin-left: 16px;
  }
`;

export default OtherEmailModal;
