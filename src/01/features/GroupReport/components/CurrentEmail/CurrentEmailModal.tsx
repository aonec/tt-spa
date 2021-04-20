import React, { Dispatch, SetStateAction } from 'react';
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

const CurrentEmailModal = () => {
  const groupReportFormState = useAppSelector(
    (state) => state.groupReport.groupReportFormState
  );
  const groupReportStatus = useAppSelector(
    (state) => state.groupReport.groupReportStatus
  );
  const dispatch = useAppDispatch();
  const isVisible = groupReportStatus === 'currentEmailForm';
  const { email } = JSON.parse(localStorage.getItem('user')!);
  debugger;
  // const link = `Reports/GetGroupReport?houseManagementId=${values.group}&NodeResourceType=${resource}&NodeStatus=${values.category}&ReportType=${values.detailing}&From=${beginDayQuery}&To=${endDayQuery}`;
  const formQuery = (formState: GroupReportValuesInterface) => {
    return {};
  };

  const {
    houseManagementId,
    category,
    detailing,
    resource,
    dates,
  } = groupReportFormState;
  debugger;
  // const resources = resource!.map((item: string) => {
  //   return `NodeResourceType=${item}`;
  // });
  // const resResources = resources.join('&');

  return (
    <StyledModal
      visible={isVisible}
      title={<Header>Отправить отчёт на почту</Header>}
      onCancel={() => dispatch(setGroupStatus(undefined))}
      width={800}
      footer={
        <Footer>
          <ButtonTT
            color={'white'}
            key="submit"
            onClick={() => dispatch(setGroupStatus(undefined))}
          >
            Отмена
          </ButtonTT>
          <ButtonTT
            color={'white'}
            key="submit"
            onClick={() => dispatch(setGroupStatus('otherEmailForm'))}
          >
            Указать другую почту
          </ButtonTT>
          <ButtonTT
            color={'blue'}
            key="back"
            // houseManagementId=${values.houseManagementId}&NodeResourceType=${resResources}&NodeStatus=${values.category}&ReportType=${values.detailing}&From=${beginDayQuery}&To=${endDayQuery}
            onClick={() =>
              sendGroupReport({
                HouseManagementId: houseManagementId,
                NodeResourceTypes: resource,
                NodeStatus: category,
                ReportType: detailing,
                From: dates[0],
                To: dates[1],
                DelayedEmailTarget: email,
              })
            }
          >
            Отправить отчёт
          </ButtonTT>
        </Footer>
      }
    >
      <p style={{ color: 'var(--main-100)', margin: 0 }}>
        Вы внесли не все показания, если вы покинете страницу, то все изменения,
        которые были сделаны вами на этой странице не сохранятся
      </p>
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
