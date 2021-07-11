import React, {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import ButtonTT from '../../../../tt-components/ButtonTT';
import styled from 'styled-components';
import { Modal } from 'antd';
import { GroupReportValuesInterface } from '../GroupReport';
import {
  ReportModalType,
  setGroupStatus,
} from '../../models/groupReportReducer';
import { useAppDispatch, useAppSelector } from '../../../../Redux/store';
import axios from '01/axios';
import { sendGroupReport } from '../../../../_api/group_report';
import { Loader } from '../../../../components/Loader';

const CurrentEmailModal = () => {
  const groupReportFormState = useAppSelector(
    (state) => state.groupReport.groupReportFormState,
  );
  const groupReportStatus = useAppSelector(
    (state) => state.groupReport.groupReportStatus,
  );
  const dispatch = useAppDispatch();
  const isVisible = groupReportStatus === 'currentEmailForm';
  const user = localStorage.getItem('user');
  const { email } = user ? JSON.parse(user) : '';

  const {
    houseManagementId,
    category,
    detailing,
    resource,
    dates,
  } = groupReportFormState;

  const [error, setError] = useState(null);
  const [sendingStatus, setSendingStatus] = useState('idle');
  const [inputValue, setInputValue] = useState('');

  const isSending = sendingStatus === 'loading';
  const isError = sendingStatus === 'error';
  const isMounted = React.useRef(true);

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
        DelayedEmailTarget: email,
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

  const handleOtherEmailClick = () =>
    dispatch(setGroupStatus('otherEmailForm'));

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  // const resources = resource!.map((item: string) => {
  //   return `NodeResourceType=${item}`;
  // });
  // const resResources = resources.join('&');

  return (
    <StyledModal
      visible={isVisible}
      title={<Header>Отправить отчёт на почту</Header>}
      onCancel={closeModal}
      width={800}
      footer={
        <Footer>
          <ButtonTT color={'white'} key="submit" onClick={closeModal}>
            Отмена
          </ButtonTT>
          <ButtonTT
            color={'white'}
            key="submit"
            onClick={handleOtherEmailClick}
          >
            Указать другую почту
          </ButtonTT>
          <ButtonTT
            color={'blue'}
            key="back"
            onClick={handleSubmit}
            disabled={isSending}
          >
            Отправить отчёт
          </ButtonTT>
        </Footer>
      }
    >
      <p>Отчет будет отправлен на почту {email}</p>
      {isSending ? <Loader show /> : null}
      {isError ? <div>ОШИБКА ОТПРАВКИ</div> : null}
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

export default CurrentEmailModal;
