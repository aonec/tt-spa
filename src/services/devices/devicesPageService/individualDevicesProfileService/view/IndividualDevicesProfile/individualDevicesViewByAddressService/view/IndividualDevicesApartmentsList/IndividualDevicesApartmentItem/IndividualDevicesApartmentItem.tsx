import { ContextMenuButton } from '01/shared/ui/ContextMenuButton';
import { useEvent, useStore } from 'effector-react';
import React, { FC } from 'react';
import {
  AdditionalHomeownersCountTextWrapper,
  AdditionalHomeownersCountWrapper,
  HomeownerNameWrapper,
} from 'services/objects/objectProfileService/apartmentsListService/view/ApartmentsView/ApartmentsList/ApartmentItem/ApartmentItem.styled';
import {
  IndividualDevicesListContainer,
  individualDevicesListService,
} from '../../../../individualDevicesListService';
import {
  ApartmentNumber,
  Chevron,
  PersonalAccountNumber,
  Wrapper,
} from './IndividualDevicesApartmentItem.styled';
import { IndividualDevicesApartmentItemProps } from './IndividualDevicesApartmentItem.types';

const { inputs, outputs } = individualDevicesListService;

export const IndividualDevicesApartmentItem: FC<IndividualDevicesApartmentItemProps> = ({
  individualDevicesApartment,
}) => {
  const openedApartmentId = useStore(outputs.$openedBlockId);

  const toggleApartment = useEvent(inputs.toggleBlock);

  const homeowner = individualDevicesApartment?.homeowners?.[0];

  const additionalHomeownersCount =
    (individualDevicesApartment.homeowners?.length || 1) - 1;

  const personalAccountNumber = homeowner?.personalAccountNumber;

  const apartmentId = individualDevicesApartment.apartmentId;

  const isApartmentOpen = openedApartmentId === apartmentId;

  return (
    <>
      <Wrapper onClick={() => apartmentId && toggleApartment(apartmentId)}>
        <Chevron open={isApartmentOpen} />
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
        <ContextMenuButton
          menuButtons={[{ title: 'Открыть квартиру', onClick: () => {} }]}
          size="small"
        />
      </Wrapper>
      {isApartmentOpen && (
        <IndividualDevicesListContainer
          devicesIds={individualDevicesApartment.deviceIds || []}
        />
      )}
    </>
  );
};
