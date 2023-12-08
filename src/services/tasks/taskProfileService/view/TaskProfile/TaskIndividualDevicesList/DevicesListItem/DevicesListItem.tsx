import React, { FC, useState } from 'react';
import { IndividualDeviceInfo } from 'ui-kit/shared/IndividualDeviceInfo';
import { ReadingsHistoryButton } from 'ui-kit/shared/reading_history_button';
import { DeviceInfo } from '../DeviceInfo';
import {
  ArrowSC,
  ChevronWrapper,
  DeviceTitleWrapper,
  GroupWrapper,
  LinkToProfile,
  ReadingsHistoryButtonWrapper,
  Wrapper,
} from './DevicesListItem.styled';
import { DevicesListItemProps } from './DevicesListItem.types';
import {  useNavigate } from 'react-router-dom';

export const DevicesListItem: FC<DevicesListItemProps> = ({
  device,
  apartmentId,
}) => {
  const { id } = device;

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const navigate =  useNavigate();

  return (
    <Wrapper>
      <DeviceTitleWrapper>
        <GroupWrapper>
          <IndividualDeviceInfo device={device} />
        </GroupWrapper>
        <GroupWrapper>
          <LinkToProfile
            onClick={() =>  navigate(`/apartments/${apartmentId}/testimony`)}
          >
            Перейти в профиль
          </LinkToProfile>
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
