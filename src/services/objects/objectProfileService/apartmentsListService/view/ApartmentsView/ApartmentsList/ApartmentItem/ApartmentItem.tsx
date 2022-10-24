import { EApartmentStatus, ETasksState } from 'myApi';
import React, { FC } from 'react';
import { PauseIcon, WarningIcon } from 'ui-kit/icons';
import {
  AdditionalHomeownersCountTextWrapper,
  AdditionalHomeownersCountWrapper,
  ApartmentNumberWrapper,
  HomeownerNameWrapper,
  PauseIconWrapper,
  WarningIconWrapper,
  Wrapper,
} from './ApartmentItem.styled';
import { ApartmentItemProps } from './ApartmentItem.types';

export const ApartmentItem: FC<ApartmentItemProps> = ({
  apartment,
  hosuingStockId,
  setCurrentApartmentId,
}) => {
  const additionalHomeownersCount = (apartment?.homeownersCount || 1) - 1;

  const isApartmentOnPause = apartment.status === EApartmentStatus.Pause;
  const isTasksOnApartmentExist = Boolean(
    apartment.tasksState !== ETasksState.NoTasks
  );

  return (
    <Wrapper
      id={`apartment-list-item-${apartment.id}`}
      to={`/objects/${hosuingStockId}/apartments/${apartment.id}`}
      onClick={() => setCurrentApartmentId(apartment.id)}
    >
      <ApartmentNumberWrapper>
        №{apartment.apartmentNumber}
        {isTasksOnApartmentExist && (
          <WarningIconWrapper>
            <WarningIcon />
          </WarningIconWrapper>
        )}
        {isApartmentOnPause && (
          <PauseIconWrapper>
            <PauseIcon />
          </PauseIconWrapper>
        )}
      </ApartmentNumberWrapper>
      <HomeownerNameWrapper>
        {apartment.homeownerName}
        {Boolean(additionalHomeownersCount) && (
          <AdditionalHomeownersCountWrapper>
            <AdditionalHomeownersCountTextWrapper>
              +{additionalHomeownersCount}
            </AdditionalHomeownersCountTextWrapper>
          </AdditionalHomeownersCountWrapper>
        )}
      </HomeownerNameWrapper>
      <div>{apartment.personalAccountNumber}</div>
      <div>{apartment.square && `${apartment.square} м²`}</div>
    </Wrapper>
  );
};
