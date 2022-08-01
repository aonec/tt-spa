import React from 'react';
import getAccessesList from '../../../../_api/utils/getAccessesList';
import { MenuButtonTT } from '../../../../tt-components';
import styled from 'styled-components';
import GroupReport from '../../../../features/groupReport';
import { setGroupStatus } from '../../../../features/groupReport/models/groupReportReducer';
import { useAppDispatch } from '../../../../Redux/store';
import { HeaderWrap, Title } from '../../../../_components/Headers';

export const Header = () => {
  const access = getAccessesList();
  const { show } = access;

  const dispatch = useAppDispatch();

  const menuButtonArr = [
    {
      title: 'Выгрузка группового отчёта',
      cb: () => dispatch(setGroupStatus('reportForm')),
      show: show('ReportRead'),
      color: 'default',
      clickable: false,
    },
  ];

  return (
    <ObjectHeader>
      <Title>Объекты</Title>
      <GroupReport />
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
