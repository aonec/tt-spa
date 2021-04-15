import React, { useState } from 'react';
import getAccessesList from '../../../../_api/utils/getAccessesList';
import { MenuButtonTT } from '../../../../tt-components';
import styled from 'styled-components';
import ModalGroupReport from '../../components/Modals/GroupReport';
import { Title, HeaderWrap } from '01/_components/Headers';

export const Header = () => {
  const access = getAccessesList();
  const { show } = access;

  const [groupReport, setGroupReport] = useState(false);

  const menuButtonArr = [
    {
      title: 'Выгрузка группового отчёта',
      cb: () => setGroupReport(true),
      show: show('ReportRead'),
      color: 'default',
      clickable: false,
    },
  ];

  return (
    <ObjectHeader>
      <ModalGroupReport visible={groupReport} setVisible={setGroupReport} />
      <Title>Объекты</Title>
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
