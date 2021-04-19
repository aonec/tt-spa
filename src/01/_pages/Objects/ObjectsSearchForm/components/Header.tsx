import React, { useState } from 'react';
import getAccessesList from '../../../../_api/utils/getAccessesList';
import { MenuButtonTT } from '../../../../tt-components';
import styled from 'styled-components';
import ModalGroupReport, {
  GroupReportValuesInterface,
} from '../../components/Modals/GroupReport';
import { Title, HeaderWrap } from '01/_components/Headers';
import CurrentEmailModal from '../../components/Modals/CurrentEmail/CurrentEmailModal';
import OtherEmailModal from '../../components/Modals/OtherEmail/OtherEmailModal';

export const Header = () => {
  const access = getAccessesList();
  const { show } = access;

  const [groupReportStatus, setGroupReportStatus] = useState<ReportModalType>(
    undefined
  );
  const [groupReportFormState, setGroupReportFormState] = useState<
    GroupReportValuesInterface | undefined
  >(undefined);

  const menuButtonArr = [
    {
      title: 'Выгрузка группового отчёта',
      // cb: () => setGroupReport('reportForm'),
      cb: () => setGroupReportStatus('reportForm'),
      show: show('ReportRead'),
      color: 'default',
      clickable: false,
    },
  ];

  const isReportModalModalVisible = groupReportStatus === 'reportForm';
  const isCurrentEmailModalVisible = groupReportStatus === 'currentEmailForm';
  const isOtherEmailModalVisible = groupReportStatus === 'otherEmailForm';

  return (
    <ObjectHeader>
      <ModalGroupReport
        visible={isReportModalModalVisible}
        setVisible={setGroupReportStatus}
        setGroupReportFormState={setGroupReportFormState}
      />
      <CurrentEmailModal
        visible={isCurrentEmailModalVisible}
        setVisible={setGroupReportStatus}
        groupReportFormState={groupReportFormState}
      />
      <OtherEmailModal
        visible={isOtherEmailModalVisible}
        setVisible={setGroupReportStatus}
        groupReportFormState={groupReportFormState}
      />
      <Title>Объекты</Title>
      <div style={{ position: 'relative' }}>
        <MenuButtonTT menuButtonArr={menuButtonArr} />
      </div>
    </ObjectHeader>
  );
};

export type ReportModalType =
  | 'reportForm'
  | 'currentEmailForm'
  | 'otherEmailForm'
  | undefined;
export default Header;

const ObjectHeader = styled(HeaderWrap)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;
