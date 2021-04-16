import React, { useState } from 'react';
import getAccessesList from '../../../../_api/utils/getAccessesList';
import { MenuButtonTT } from '../../../../tt-components';
import styled from 'styled-components';
import ModalGroupReport from '../../components/Modals/GroupReport';
import { Title, HeaderWrap } from '01/_components/Headers';
import CurrentEmailModal from '../../components/Modals/CurrentEmail/CurrentEmailModal';
import OtherEmailModal from '../../components/Modals/OtherEmail/OtherEmailModal';

export const Header = () => {
  const access = getAccessesList();
  const { show } = access;

  const [groupReport, setGroupReport] = useState<ReportModalType>(undefined);

  const menuButtonArr = [
    {
      title: 'Выгрузка группового отчёта',
      // cb: () => setGroupReport('reportForm'),
      cb: () => setGroupReport('currentEmailForm'),
      show: show('ReportRead'),
      color: 'default',
      clickable: false,
    },
  ];

  const isReportModalModalVisible = groupReport === 'reportForm';
  const isCurrentEmailModalVisible = groupReport === 'currentEmailForm';
  const isOtherEmailModalVisible = groupReport === 'otherEmailForm';

  return (
    <ObjectHeader>
      <ModalGroupReport
        visible={isReportModalModalVisible}
        setVisible={setGroupReport}
      />
      <CurrentEmailModal
        visible={isCurrentEmailModalVisible}
        setVisible={setGroupReport}
      />
      <OtherEmailModal
        visible={isOtherEmailModalVisible}
        setVisible={setGroupReport}
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
