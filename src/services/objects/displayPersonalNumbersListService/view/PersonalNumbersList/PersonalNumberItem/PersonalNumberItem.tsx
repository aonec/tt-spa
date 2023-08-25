import { ContextMenuButton } from 'ui-kit/ContextMenuButton/ContextMenuButton';
import React, { FC, useMemo } from 'react';
import { WarningIcon } from 'ui-kit/icons';
import { getBuildingAddress } from 'utils/getBuildingAddress';
import {
  AccountNumber,
  Address,
  HomeownerWrapper,
  NumberOfTasks,
  Wrapper,
} from './PersonalNumberItem.styled';
import { PersonalNumberItemProps } from './PersonalNumberItem.types';

export const PersonalNumberItem: FC<PersonalNumberItemProps> = ({
  apartment,
}) => {
  const address = getBuildingAddress(apartment.housingStock);
  const apartmentAddress = apartment.apartmentNumber;
  const addressText = `${address}, кв ${apartmentAddress}`;

  const homeOwner = apartment.homeownerName;
  const personalAccountNumber = apartment.personalAccountNumber;

  const numberOfTasks = useMemo(() => {
    return (
      Boolean(apartment.numberOfTasks) && (
        <NumberOfTasks>
          <WarningIcon /> Задач: {apartment.numberOfTasks}
        </NumberOfTasks>
      )
    );
  }, [apartment.numberOfTasks]);

  return (
    <Wrapper to={`/apartments/${apartment.id}`}>
      <div>
        <AccountNumber>{personalAccountNumber}</AccountNumber>
        {numberOfTasks}
      </div>
      <HomeownerWrapper>{homeOwner}</HomeownerWrapper>
      <Address>{addressText}</Address>
      <ContextMenuButton size="small" />
    </Wrapper>
  );
};
