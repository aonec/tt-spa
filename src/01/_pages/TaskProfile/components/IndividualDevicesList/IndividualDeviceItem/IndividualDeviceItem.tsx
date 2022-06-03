import React, { FC, useState } from 'react';
import { ChevronDown, ChevronUp } from 'react-bootstrap-icons';
import { IndividualDeviceInfo } from 'ui-kit/shared_components/IndividualDeviceInfo';
import { ReadingsHistoryButton } from 'ui-kit/shared_components/reading_history_button';
import {
  ChevronWrapper,
  Header,
  LinkOnProfile,
  ReadingsHistoryButtonWrapper,
  RightHeaderPanel,
  Wrapper,
} from './IndividualDeviceItem.styled';
import { IndividualDeviceItemProps } from './IndividualDeviceItem.types';

export const IndividualDeviceItem: FC<IndividualDeviceItemProps> = ({
  device,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const chevron = isOpen ? <ChevronUp /> : <ChevronDown />;

  const apartmentId = device.address?.apartmentId;

  return (
    <Wrapper>
      <Header>
        <IndividualDeviceInfo device={device} />
        <RightHeaderPanel>
          <LinkOnProfile to={`/meters/apartments/${apartmentId}`}>
            Перейти в профиль
          </LinkOnProfile>
          <ReadingsHistoryButtonWrapper>
            <ReadingsHistoryButton deviceId={device.id} />
          </ReadingsHistoryButtonWrapper>
          <ChevronWrapper onClick={toggle}>{chevron}</ChevronWrapper>
        </RightHeaderPanel>
      </Header>
    </Wrapper>
  );
};
