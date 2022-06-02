import { calculatorsService } from '01/features/carlculators/calculators/models';
import { DevicesReportModal } from '01/features/devicesReport';
import { showDownloadDeviceReportButtonClicked } from '01/features/devicesReport/models';
import { PageHeader } from '01/shared/ui/PageHeader';
import { MenuButtonTT } from '01/tt-components';
import { useStore } from 'effector-react';
import React, { FC } from 'react';
import { DevicesListContainer } from 'services/devices/displayDevicesService/displayDevicesService.container';
import styled from 'styled-components';
import { SearchDevices } from '../SearchDevices';
import { Wrapper } from './DevicesProfile.styled';
import { DevicesProfileProps } from './DevicesProfile.types';

export const DevicesProfile: FC<DevicesProfileProps> = ({}) => {
  const menuButtonArr = [
    {
      title: 'Выгрузить список приборов',
      cb: showDownloadDeviceReportButtonClicked,
      show: true,
      color: 'default',
      clickable: true,
    },
  ];

  const calculators = useStore(calculatorsService.outputs.$calculators);

  const { CalculatorsGate } = calculatorsService.inputs;

  return (
    <Wrapper>
      <HeaderWrapper>
        <h1 style={{ fontWeight: 300, marginBottom: 16 }}>Приборы</h1>
        <MenuButtonTT menuButtonArr={menuButtonArr} />
      </HeaderWrapper>
      <SearchDevices />
      <DevicesListContainer calculators={calculators}/>
      <DevicesReportModal />
    </Wrapper>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;