import React, { FC, useMemo, useState } from 'react';
import {
  DevicesAmount,
  InfoWrapper,
  RighContentWrapper,
  Title,
  TitleWrapper,
  Wrapper,
} from './DevicesPanel.styled';
import { Props } from './DevicesPanel.types';
import { ListOpeningChevron } from 'ui-kit/shared/ListOpeningChevron';
import { CalculatorInfo } from './CalculatorDevices';
import { getDevicesCountText } from 'services/nodes/createNodeService/view/CreateNodePage/ConnectedDevices/CommunicationPipeListItem/CommunicationPipeListItem.utils';
import {
  CheckGreenIcon,
  DownloadBlueIcon,
  DownloadIcon,
  MagnifierIcon,
  StopOrangeIcon,
  WarningIcon,
} from 'ui-kit/icons';
import { PanelTitleDictionary } from '../Statistics.constants';
import { ConnectionStatuses } from '../../connectionAnalysisService.types';

export const DevicesPanel: FC<Props> = ({ panelTitle, calculators }) => {
  const [isOpen, setIsOpen] = useState(false);

  const devicesCount = calculators?.items?.length || 0;

  const devicesCountText = getDevicesCountText(devicesCount);

  const panelIcon = useMemo(() => {
    if (panelTitle === ConnectionStatuses.Success) {
      return <CheckGreenIcon />;
    }
    if (panelTitle === ConnectionStatuses.NotPolling) {
      return <StopOrangeIcon />;
    }
    if (panelTitle === ConnectionStatuses.Error) {
      return <WarningIcon />;
    }
    if (panelTitle === ConnectionStatuses.NoArchives) {
      return <MagnifierIcon />;
    }
  }, [panelTitle]);

  return (
    <Wrapper onClick={() => setIsOpen((prev) => !prev)}>
      <InfoWrapper>
        <TitleWrapper>
          {panelIcon} <Title>{PanelTitleDictionary[panelTitle]}</Title>
        </TitleWrapper>
        <RighContentWrapper>
          <DevicesAmount>
            {devicesCount} {devicesCountText}
          </DevicesAmount>

          <DownloadIcon />
          <DownloadBlueIcon />

          <ListOpeningChevron isOpen={isOpen} />
        </RighContentWrapper>
      </InfoWrapper>
      {isOpen &&
        calculators?.items?.map((device) => (
          <CalculatorInfo device={device} key={device.id} />
        ))}
    </Wrapper>
  );
};
