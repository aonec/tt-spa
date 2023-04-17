import { useSliderIndex } from '01/features/individualDevices/switchIndividualDevice/components/ReadingsInput';
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
import { MeteringDeviceReadingsSumPanel } from '../MeteringDeviceReadingsSumPanel';
import { meteringDeviceReadingsService } from './meteringDevicesListService.model';
import { ChevronBoldIcon } from 'ui-kit/icons';
import { getPreviousReadingsMonth } from '01/features/individualDevices/switchIndividualDevice/components/ReadingsInput.utils';

const { outputs, gates } = meteringDeviceReadingsService;

export const MeteringDevicesList = () => {
  const pendingNodes = useStore(fetchNodes.pending);
  const electricNodes = useStore($electricNodes);
  const sum = useStore(outputs.$sumOfReadings);
  const { MeteringDevicesListIsOpen } = gates;

  const { sliderIndex, up, down, canDown, canUp } = useSliderIndex();

  const header = (
    <Header temp={gridTemp} gap="15px" style={{ userSelect: 'none' }}>
      <HeaderTitleElem>Прибор</HeaderTitleElem>
      <HeaderTitleElem>Коэф. трансф.</HeaderTitleElem>
      <HeaderTitleElem>
        <MonthSlider>
          <ArrowContainer onClick={up}>
            {canUp && <ChevronBoldIcon />}
          </ArrowContainer>
          <div>{getPreviousReadingsMonth(sliderIndex)}</div>
          <ArrowContainer
            onClick={down}
            style={{ transform: 'rotate(180deg)' }}
          >
            {canDown && <ChevronBoldIcon />}
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

  const renderPage = () => {
    return (
      <>
        {header}
        {electricNodes?.map((node, index) => (
          <MeteringDeviceReadingsLine
            sliderIndex={sliderIndex}
            node={node}
            inputIndex={index + 1}
            key={index}
          />
        ))}
        <MeteringDeviceReadingsSumPanel sum={sum} />
        <MeteringDevicesListIsOpen />
      </>
    );
  };

  const isNullElectricNodes = electricNodes === undefined;
  const isEmptyElectricNodes = electricNodes?.length === 0;
  const isShowPage = !isNullElectricNodes && !isEmptyElectricNodes;

  return (
    <PendingLoader loading={pendingNodes}>
      {isNullElectricNodes && null}
      {isEmptyElectricNodes && 'Нет приборов'}
      {isShowPage && renderPage()}
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

export const gridTemp = '0.9fr 0.38fr 0.6fr 0.6fr 0.35fr 0.6fr 70px';

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
