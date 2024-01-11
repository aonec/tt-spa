import { ContextMenuButton } from 'ui-kit/ContextMenuButton/ContextMenuButton';
import { useUnit } from 'effector-react';
import React, { FC } from 'react';
import {
  AdditionalHomeownersCountTextWrapper,
  AdditionalHomeownersCountWrapper,
  HomeownerNameWrapper,
} from 'services/objects/housingStockProfileService/apartmentsListService/view/ApartmentsView/ApartmentsList/ApartmentItem/ApartmentItem.styled';
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

export const IndividualDevicesApartmentItem: FC<
  IndividualDevicesApartmentItemProps
> = ({ individualDevicesApartment, housingStockId }) => {
  const { openedApartmentId, toggleApartment } = useUnit({
    openedApartmentId: outputs.$openedBlockId,
    toggleApartment: inputs.toggleBlock,
  });

  const homeowner = individualDevicesApartment?.homeowners?.[0];

  const additionalHomeownersCount =
    (individualDevicesApartment.homeowners?.length || 1) - 1;

  const personalAccountNumber = homeowner?.personalAccountNumber;

  const apartmentId = individualDevicesApartment.apartmentId;

  const isApartmentOpen = openedApartmentId === apartmentId;

  return (
    <>
      <Wrapper
        isApartmentOpen={isApartmentOpen}
        onClick={() => apartmentId && toggleApartment(apartmentId)}
      >
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
        <ContextMenuButton size="small" />
      </Wrapper>
      {isApartmentOpen && (
        <IndividualDevicesListContainer
          apartmentId={individualDevicesApartment.apartmentId}
          housingStockId={housingStockId}
          devicesIds={individualDevicesApartment.deviceIds || []}
        />
      )}
    </>
  );
};
