import { ContextMenuButton } from '01/shared/ui/ContextMenuButton';
import React, { FC } from 'react';
import {
  AdditionalHomeownersCountTextWrapper,
  AdditionalHomeownersCountWrapper,
  HomeownerNameWrapper,
} from 'services/objects/objectProfileService/apartmentsListService/view/ApartmentsView/ApartmentsList/ApartmentItem/ApartmentItem.styled';
import {
  ApartmentNumber,
  PersonalAccountNumber,
  Wrapper,
} from './IndividualDevicesApartmentItem.styled';
import { IndividualDevicesApartmentItemProps } from './IndividualDevicesApartmentItem.types';

export const IndividualDevicesApartmentItem: FC<IndividualDevicesApartmentItemProps> = ({
  individualDevicesApartment,
}) => {
  const homeowner = individualDevicesApartment?.homeowners?.[0];

  const additionalHomeownersCount =
    (individualDevicesApartment?.homeowners?.length || 1) - 1;

  const personalAccountNumber = homeowner?.personalAccountNumber;

  return (
    <Wrapper>
      <ApartmentNumber>
        №{individualDevicesApartment?.apartmentNumber}
      </ApartmentNumber>
      <HomeownerNameWrapper>
        {homeowner?.fullName}
        {Boolean(additionalHomeownersCount) && (
          <AdditionalHomeownersCountWrapper>
            <AdditionalHomeownersCountTextWrapper>
              +{additionalHomeownersCount}
            </AdditionalHomeownersCountTextWrapper>
          </AdditionalHomeownersCountWrapper>
        )}
      </HomeownerNameWrapper>
      <PersonalAccountNumber>{personalAccountNumber}</PersonalAccountNumber>
      <ContextMenuButton size="small" />
    </Wrapper>
  );
};
