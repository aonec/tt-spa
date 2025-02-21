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
  MagnifierIcon,
  StopOrangeIcon,
  WarningIcon,
} from 'ui-kit/icons';
import { PanelTitleDictionary } from '../Statistics.constants';
import { ConnectionStatuses } from '../../connectionAnalysisService.types';
import { ContextMenuButton } from 'ui-kit/ContextMenuButton';

export const DevicesPanel: FC<Props> = ({ panelTitle, calculators }) => {
  const [isOpen, setIsOpen] = useState(false);

  const devicesCount = calculators.length;

  const devicesCountText = getDevicesCountText(devicesCount);

  const panelIcon = useMemo(() => {
    if (panelTitle === ConnectionStatuses.Success) {
      return <CheckGreenIcon />;
    }
    if (panelTitle === ConnectionStatuses.NotPolled) {
      return <StopOrangeIcon />;
    }
    if (panelTitle === ConnectionStatuses.WithError) {
      return <WarningIcon />;
    }
    if (panelTitle === ConnectionStatuses.NoArchive) {
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
          <ContextMenuButton
            size="small"
            menuButtons={[
              {
                title: 'Выгрузить список',
                onClick: () => {},
              },
            ]}
          />

          <ListOpeningChevron isOpen={isOpen} />
        </RighContentWrapper>
      </InfoWrapper>
      {isOpen &&
        calculators.map((device) => (
          <CalculatorInfo device={device} key={device.id} />
        ))}
    </Wrapper>
  );
};
