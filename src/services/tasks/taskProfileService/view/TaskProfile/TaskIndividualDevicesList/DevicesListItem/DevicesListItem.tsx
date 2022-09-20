import React, { FC, useState } from 'react';
import { IndividualDeviceInfo } from 'ui-kit/shared_components/IndividualDeviceInfo';
import { ReadingsHistoryButton } from 'ui-kit/shared_components/reading_history_button';
import { DeviceInfo } from '../DeviceInfo';
import {
  ArrowSC,
  ChevronWrapper,
  DeviceTitleWrapper,
  GroupWrapper,
  LinkSC,
  ReadingsHistoryButtonWrapper,
  Wrapper,
} from './DevicesListItem.styled';
import { DevicesListItemProps } from './DevicesListItem.types';

export const DevicesListItem: FC<DevicesListItemProps> = ({
  device,
  apartmentId,
  housingStockId,
}) => {
  const { id } = device;

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
      <Wrapper>
        <DeviceTitleWrapper>
        <GroupWrapper>
          <IndividualDeviceInfo device={device} />
        </GroupWrapper>
        <GroupWrapper>
          <LinkSC
            to={`/objects/${housingStockId}/apartments/${apartmentId}/testimony`}
          >
            Перейти в профиль
          </LinkSC>
          <ReadingsHistoryButtonWrapper>
            <ReadingsHistoryButton deviceId={id} />
          </ReadingsHistoryButtonWrapper>

          <ChevronWrapper onClick={toggle} open={isOpen}>
            <ArrowSC />
          </ChevronWrapper>
        </GroupWrapper>
        </DeviceTitleWrapper>
        {isOpen && <DeviceInfo device={device} />}
      </Wrapper>
  );
};
