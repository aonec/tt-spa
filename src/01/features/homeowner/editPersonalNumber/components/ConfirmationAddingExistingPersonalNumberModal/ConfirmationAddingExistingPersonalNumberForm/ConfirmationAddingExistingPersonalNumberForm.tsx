import React, { FC } from 'react';
import {
  AddressWrapper,
  LinkSC,
  TitleWrapper,
} from './ConfirmationAddingExistingPersonalNumberForm.styled';
import { ConfirmationAddingExistingPersonalNumberFormProps } from './ConfirmationAddingExistingPersonalNumberForm.types';
import { getHousingStockItemAddress } from '../../../../../../../utils/getHousingStockItemAddress';

export const ConfirmationAddingExistingPersonalNumberForm: FC<
  ConfirmationAddingExistingPersonalNumberFormProps
> = ({ samePersonalAccountNumderApartmentData }) => {
  const samePersonalAccountNumderId =
    samePersonalAccountNumderApartmentData?.id;

  const apartmentAddress =
    samePersonalAccountNumderApartmentData?.housingStock?.address?.mainAddress;

  return (
    <>
      <TitleWrapper>Квартира с таким же лицевым счётом:</TitleWrapper>
      <LinkSC
        to={`/meters/apartments/${samePersonalAccountNumderId}`}
        target="_blank"
      >
        <AddressWrapper>
          {apartmentAddress && getHousingStockItemAddress(apartmentAddress)}
        </AddressWrapper>
        <AddressWrapper>
          кв. {samePersonalAccountNumderApartmentData?.apartmentNumber}
        </AddressWrapper>
      </LinkSC>
    </>
  );
};
