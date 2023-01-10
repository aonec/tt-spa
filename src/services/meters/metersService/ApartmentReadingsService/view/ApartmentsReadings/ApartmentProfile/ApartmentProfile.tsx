import React, { FC, useCallback } from 'react';
import { ContentWrapper } from './ApartmentProfile.styled';
import { ApartmentProfileProps } from './ApartmentProfile.types';
import { AddressSearchContainer } from 'services/addressSearchService';
import {
  AddressSearchValues,
  SearchFieldType,
} from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { TypeAddressToStart } from '01/shared/ui/TypeToStart';
import { ApartmentIndividualDevicesMetersContainer } from 'services/meters/apartmentIndividualDevicesMetersService';
import { ApartmentInfo } from './ApartmentInfo';

export const ApartmentProfile: FC<ApartmentProfileProps> = ({
  isLoadingApartment,
  apartment,
  handleSearchApartment,
}) => {
  const handleSubmit = useCallback(
    (values: AddressSearchValues) => {
      const {
        city,
        street,
        house,
        apartment: apartmentNumber,
        question,
      } = values;

      const valuesArray = [city, street, house, apartmentNumber];

      if (!values.question && valuesArray.some((e) => !e)) return;

      handleSearchApartment({
        City: city,
        Street: street,
        HousingStockNumber: house,
        ApartmentNumber: apartmentNumber,
        Question: question,
      });
    },
    [handleSearchApartment]
  );

  const address = apartment?.housingStock?.address?.mainAddress;

  const homeowner = apartment?.homeownerAccounts?.[0];

  return (
    <div>
      <AddressSearchContainer
        fields={[
          SearchFieldType.City,
          SearchFieldType.Street,
          SearchFieldType.House,
          SearchFieldType.Apartment,
          SearchFieldType.Question,
        ]}
        customTemplate={[
          { fieldType: SearchFieldType.Street, templateValue: '0.7fr' },
        ]}
        handleSubmit={handleSubmit}
        initialValues={
          address && {
            city: address.city || undefined,
            street: address.street || undefined,
            house: address.number || undefined,
            apartment: apartment?.apartmentNumber || undefined,
            question: homeowner?.name || undefined,
          }
        }
      />
      <WithLoader isLoading={isLoadingApartment}>
        {!apartment && <TypeAddressToStart />}
        {apartment && (
          <ContentWrapper>
            <ApartmentInfo apartment={apartment} />
            <ApartmentIndividualDevicesMetersContainer
              apartmentId={apartment.id}
            />
          </ContentWrapper>
        )}
      </WithLoader>
    </div>
  );
};
