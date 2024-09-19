import React, { FC, useMemo, useState } from 'react';
import {
  DevicesAmount,
  InfoWrapper,
  PipeEntryNumber,
  PipeIconWrapper,
  PipeInfo,
  PipeNumber,
  RighContentWrapper,
  Wrapper,
} from './DevicesPanel.styled';
import { Props } from './DevicesPanel.types';
import { ListOpeningChevron } from 'ui-kit/shared/ListOpeningChevron';
import { EResourceType } from 'api/types';
import { CalculatorDevices } from './CalculatorDevices';
import { getDevicesCountText } from 'services/nodes/createNodeService/view/CreateNodePage/ConnectedDevices/CommunicationPipeListItem/CommunicationPipeListItem.utils';
import { mockDevices } from '../Statistics.mock';
import { PanelTitle } from '../Statistics.types';
import { CheckConnection, CheckIcon } from 'ui-kit/icons';
import { PanelTitleDictionary } from '../Statistics.constants';

export const DevicesPanel: FC<Props> = ({ panelTitle }) => {
  const [isOpen, setIsOpen] = useState(true);

  const devicesCount = 2;

  const devicesCountText = getDevicesCountText(devicesCount);

  const panelIcon = useMemo(() => {
    if (panelTitle === PanelTitle.Normal) {
      return <CheckIcon />;
    } else {
      return <CheckConnection />;
    }
  }, [panelTitle]);

  return (
    <Wrapper>
      <InfoWrapper>
        <div>
          {panelIcon} {PanelTitleDictionary[panelTitle]}
        </div>
        <RighContentWrapper>
          <DevicesAmount>
            {devicesCount} {devicesCountText}
          </DevicesAmount>
          <ListOpeningChevron
            isOpen={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </RighContentWrapper>
      </InfoWrapper>
      {isOpen &&
        mockDevices.map((device) => (
          <CalculatorDevices
            device={device}
            resource={EResourceType.HotWaterSupply}
          />
        ))}
    </Wrapper>
  );
};
