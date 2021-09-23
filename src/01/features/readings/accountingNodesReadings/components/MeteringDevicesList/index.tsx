import {
  fetchNodes,
  $electricNodes,
} from '01/features/nodes/displayNodes/models';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Grid } from '01/shared/ui/Layout/Grid';
import { PendingLoader } from '01/shared/ui/PendingLoader';
import { useStore } from 'effector-react';
import React from 'react';
import styled from 'styled-components';
import { MeteringDeviceReadingsLine } from '../MeteringDeviceReadingsLine';

export const MeteringDevicesList = () => {
  const pendingNodes = useStore(fetchNodes.pending);
  const electicNodes = useStore($electricNodes);

  const header = (
    <Header temp={gridTemp} gap="15px">
      <HeaderTitleElem>Прибор</HeaderTitleElem>
      <HeaderTitleElem>Коэф. трансф.</HeaderTitleElem>
      <HeaderTitleElem>
        <MonthSlider>
          <div>Январь</div>
        </MonthSlider>
      </HeaderTitleElem>
      <HeaderTitleElem>
        <MonthSlider>
          <div>Февраль</div>
        </MonthSlider>
      </HeaderTitleElem>
      <HeaderTitleElem>Общ. потр.</HeaderTitleElem>
      <HeaderTitleElem>Расход на нежил. пом.</HeaderTitleElem>
    </Header>
  );

  return (
    <PendingLoader loading={pendingNodes}>
      {electicNodes?.length === 0 ? 'Нет нод' : header}
      {electicNodes?.map((node) => (
        <MeteringDeviceReadingsLine node={node} />
      ))}
    </PendingLoader>
  );
};

const MonthSlider = styled(Flex)`
  justify-content: center;
`;

export const gridTemp = '0.9fr 0.38fr 0.6fr 0.6fr 0.35fr 0.75fr 20px';

const HeaderTitleElem = styled.div`
  font-size: 12px;
  color: rgba(39, 47, 90, 0, 9);
`;

const Header = styled(Grid)`
  align-items: center;
  background: rgba(39, 47, 90, 0.04);
  padding: 15px;
  border-bottom: 2px solid #dcdee4;
`;
