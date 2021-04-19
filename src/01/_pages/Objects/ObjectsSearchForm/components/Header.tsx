import React, { useState } from 'react';
import getAccessesList from '../../../../_api/utils/getAccessesList';
import { MenuButtonTT } from '../../../../tt-components';
import styled from 'styled-components';
import ModalGroupReport, {
  GroupReportValuesInterface,
} from '../../../../features/GroupReport/components/GroupReport';
import { Title, HeaderWrap } from '01/_components/Headers';
import CurrentEmailModal from '../../../../features/GroupReport/components/CurrentEmail/CurrentEmailModal';
import OtherEmailModal from '../../../../features/GroupReport/components/OtherEmail/OtherEmailModal';
import GroupReport from '../../../../features/GroupReport';
import { ReportModalType } from '../../../../features/GroupReport/store/groupReportReducer';

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

  return (
    <ObjectHeader>
      <Title>Объекты</Title>
      <GroupReport
        groupReportStatus={groupReportStatus}
        setGroupReportStatus={setGroupReportStatus}
        setGroupReportFormState={setGroupReportFormState}
        groupReportFormState={groupReportFormState}
      />
      <div style={{ position: 'relative' }}>
        <MenuButtonTT menuButtonArr={menuButtonArr} />
      </div>
    </ObjectHeader>
  );
};

export default Header;

const ObjectHeader = styled(HeaderWrap)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;
