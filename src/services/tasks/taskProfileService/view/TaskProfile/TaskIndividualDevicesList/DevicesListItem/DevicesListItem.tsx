import React, { FC, useState } from 'react';
import { IndividualDeviceInfo } from 'ui-kit/shared/IndividualDeviceInfo';
import { ReadingsHistoryButton } from 'ui-kit/shared/reading_history_button';
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
          <LinkSC to={`/apartments/${apartmentId}/testimony`} target="_blank">
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
