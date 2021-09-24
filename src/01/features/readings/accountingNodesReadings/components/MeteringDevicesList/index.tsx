import { useSliderIndex } from '01/features/individualDevices/switchIndividualDevice/components/ReadingsInput';
import {
  fetchNodes,
  $electricNodes,
} from '01/features/nodes/displayNodes/models';
import { getPreviousReadingsMonth } from '01/shared/lib/readings/getPreviousReadingsMonth';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Grid } from '01/shared/ui/Layout/Grid';
import { PendingLoader } from '01/shared/ui/PendingLoader';
import Arrow from '01/_components/Arrow/Arrow';
import { useStore } from 'effector-react';
import React from 'react';
import styled from 'styled-components';
import { MeteringDeviceReadingsLine } from '../MeteringDeviceReadingsLine';

export const MeteringDevicesList = () => {
  const pendingNodes = useStore(fetchNodes.pending);
  const electicNodes = useStore($electricNodes);
  const { sliderIndex, up, down, canDown, canUp } = useSliderIndex();

  const header = (
    <Header temp={gridTemp} gap="15px" style={{ userSelect: 'none' }}>
      <HeaderTitleElem>Прибор</HeaderTitleElem>
      <HeaderTitleElem>Коэф. трансф.</HeaderTitleElem>
      <HeaderTitleElem>
        <MonthSlider>
          <ArrowContainer onClick={up}>{canUp && <Arrow />}</ArrowContainer>
          <div>{getPreviousReadingsMonth(sliderIndex)}</div>
          <ArrowContainer
            onClick={down}
            style={{ transform: 'rotate(180deg)' }}
          >
            {canDown && <Arrow />}
          </ArrowContainer>
        </MonthSlider>
      </HeaderTitleElem>
      <HeaderTitleElem>
        <MonthSlider style={{ justifyContent: 'center' }}>
          <div>{getPreviousReadingsMonth(-1)}</div>
        </MonthSlider>
      </HeaderTitleElem>
      <HeaderTitleElem>Общ. потр.</HeaderTitleElem>
      <HeaderTitleElem>Расход на нежил. пом.</HeaderTitleElem>
    </Header>
  );

  return (
    <PendingLoader loading={pendingNodes}>
      {electicNodes?.length === 0
        ? 'Нет приборов'
        : electicNodes?.length
        ? header
        : null}
      {electicNodes?.map((node) => (
        <MeteringDeviceReadingsLine sliderIndex={sliderIndex} node={node} />
      ))}
    </PendingLoader>
  );
};

const ArrowContainer = styled.div`
  cursor: pointer;
`;

const MonthSlider = styled(Flex)`
  justify-content: space-between;
  font-weight: bold;
`;

export const gridTemp = '0.9fr 0.38fr 0.6fr 0.6fr 0.35fr 0.6fr 50px';

const HeaderTitleElem = styled.div`
  font-size: 12px;
  color: rgba(39, 47, 90, 0, 9);
`;

const Header = styled(Grid)`
  color: #616161;
  align-items: center;
  background: rgba(39, 47, 90, 0.04);
  padding: 15px;
  border-bottom: 2px solid #dcdee4;
`;
