import dayjs from 'api/dayjs';
import React, { FC } from 'react';
import { ResourceInfo } from 'ui-kit/shared/ResourceInfo';
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

export const DisconnectionAddressesModalTitle: FC<
  DisconnectionAddressesModalTitleProps
> = ({ disconnection }) => {
  const { startDate, endDate, resource, disconnectingType } = disconnection;

  const startDateString = dayjs(startDate).format('DD.MM.YYYY');
  const startTimeString = dayjs(startDate).format('HH:mm');

  const endDateString = dayjs(endDate).format('DD.MM.YYYY');
  const endTimeString = dayjs(endDate).format('HH:mm');

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
