import React, { FC } from 'react';
import {
  AddressWrapper,
  ConfirmationTextWrapper,
  LinkSC,
  SkeletonLineSC,
  TitleWrapper,
} from './ConfirmationAddingExistingPersonalNumberForm.styled';
import { ConfirmationAddingExistingPersonalNumberFormProps } from './ConfirmationAddingExistingPersonalNumberForm.types';
import { getHousingStockItemAddress } from '../../../../../../utils/getHousingStockItemAddress';

export const ConfirmationAddingExistingPersonalNumberForm: FC<
  ConfirmationAddingExistingPersonalNumberFormProps
> = ({ samePersonalAccountNumderApartmentData }) => {
  const samePersonalAccountNumderId =
    samePersonalAccountNumderApartmentData?.id;

  const apartmentAddress =
    samePersonalAccountNumderApartmentData?.housingStock?.address?.mainAddress;

  return (
    <ConfirmationTextWrapper>
      <TitleWrapper>Квартира с таким же лицевым счётом:</TitleWrapper>
      <LinkSC
        to={`/meters/apartments/${samePersonalAccountNumderId}`}
        target="_blank"
      >
        {!apartmentAddress && <SkeletonLineSC active />}

        {apartmentAddress && (
          <>
            <AddressWrapper>
              {getHousingStockItemAddress(apartmentAddress)}
            </AddressWrapper>
            <AddressWrapper>
              кв. {samePersonalAccountNumderApartmentData?.apartmentNumber}
            </AddressWrapper>
          </>
        )}
      </LinkSC>
    </ConfirmationTextWrapper>
  );
};
