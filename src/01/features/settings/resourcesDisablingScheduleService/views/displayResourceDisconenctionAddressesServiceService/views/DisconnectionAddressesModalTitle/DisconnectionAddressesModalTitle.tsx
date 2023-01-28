import moment from 'moment';
import React, { FC } from 'react';
import { ResourceInfo } from 'ui-kit/shared_components/ResourceInfo';
import {
  DateWrapper,
  GroupWrapper,
  ResourceWrapper,
  TimeWrapper,
  Title,
  TypeWrapper,
  Wrapper,
} from './DisconnectionAddressesModalTitle.styled';
import { DisconnectionAddressesModalTitleProps } from './DisconnectionAddressesModalTitle.types';

export const DisconnectionAddressesModalTitle: FC<DisconnectionAddressesModalTitleProps> = ({
  disconnection,
}) => {
  const { startDate, endDate, resource, disconnectingType } = disconnection;

  const startDateString = moment(startDate).format('DD.MM.YYYY');
  const startTimeString = moment(startDate).format('HH:mm');

  const endDateString = moment(endDate).format('DD.MM.YYYY');
  const endTimeString = moment(endDate).format('HH:mm');

  return (
    <Wrapper>
      <Title>Список адресов</Title>
      <GroupWrapper>
        <GroupWrapper>
          <DateWrapper>{startDateString}</DateWrapper>
          <TimeWrapper>{startTimeString} </TimeWrapper>
        </GroupWrapper>
        {endDate && (
          <>
            -
            <GroupWrapper>
              <DateWrapper>{endDateString}</DateWrapper>
              <TimeWrapper>{endTimeString}</TimeWrapper>
            </GroupWrapper>
          </>
        )}
        <ResourceWrapper>
          <ResourceInfo resource={resource} />
        </ResourceWrapper>
        <TypeWrapper>{disconnectingType?.description || ''}</TypeWrapper>
      </GroupWrapper>
    </Wrapper>
  );
};
