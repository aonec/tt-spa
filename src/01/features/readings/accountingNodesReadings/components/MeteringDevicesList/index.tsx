import {
  fetchNodes,
  $electricNodes,
} from '01/features/nodes/displayNodes/models';
import { Grid } from '01/shared/ui/Layout/Grid';
import { PendingLoader } from '01/shared/ui/PendingLoader';
import { useStore } from 'effector-react';
import React from 'react';
import styled from 'styled-components';

export const MeteringDevicesList = () => {
  const pendingNodes = useStore(fetchNodes.pending);
  const electicNodes = useStore($electricNodes);

  const header = (
    <Header temp={gridTemp}>
      <HeaderTitleElem>Прибор</HeaderTitleElem>
      <HeaderTitleElem>Коэф.трансф.</HeaderTitleElem>
      <HeaderTitleElem>Январь</HeaderTitleElem>
      <HeaderTitleElem>Февраль</HeaderTitleElem>
      <HeaderTitleElem>Прибор</HeaderTitleElem>
      <HeaderTitleElem>Общ. потр.</HeaderTitleElem>
      <HeaderTitleElem>Расход на нежил. пом.</HeaderTitleElem>
    </Header>
  );

  return (
    <PendingLoader loading={pendingNodes}>
      {electicNodes ? <>{header}</> : 'Нет нод'}
    </PendingLoader>
  );
};

const gridTemp = '1fr 0.75fr 0.75fr 0.75fr 0.75fr 0.75fr 20px';

const HeaderTitleElem = styled.div``;

const Header = styled(Grid)`
  background: rgba(39, 47, 90, 0.04);
  padding: 15px;
  border-bottom: 2px solid #dcdee4;
`;
