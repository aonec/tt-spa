import React, { FC, useCallback } from 'react';
import { ApartmentSealProfileProps } from './ApartmentSealProfile.types';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { ContentWrapper } from './ApartmentSealProfile.styled';
import { TypeAddressToStart } from 'ui-kit/shared_components/TypeToStart';
import { ApartmentInfo } from 'services/meters/metersService/ApartmentReadingsService/view/ApartmentsReadings/ApartmentProfile/ApartmentInfo';
import {
  AddressSearchValues,
  SearchFieldType,
} from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { AddressSearchContainer } from 'services/addressSearchService';
import { IndividualDevicesList } from './IndividualDevicesList';

export const ApartmentSealProfile: FC<ApartmentSealProfileProps> = ({
  apartment,
  isLoadingApartment,
  searchApartment,
  setSelectedHomeownerName,
  selectedHomeownerName,
  updateApartment,
  individualDevices,
}) => {
  const address = apartment?.housingStock?.address?.mainAddress;

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

      searchApartment({
        City: city,
        Street: street,
        HousingStockNumber: house,
        ApartmentNumber: apartmentNumber,
        Question: question,
      });
    },
    [searchApartment],
  );

  return (
    <>
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
            question: selectedHomeownerName || undefined,
          }
        }
      />
      <WithLoader isLoading={isLoadingApartment}>
        {!apartment && <TypeAddressToStart />}
        {apartment && (
          <ContentWrapper>
            <ApartmentInfo
              apartment={apartment}
              handleUpdateApartment={updateApartment}
              setSelectedHomeownerName={setSelectedHomeownerName}
            />
            <IndividualDevicesList individualDevices={individualDevices} />
          </ContentWrapper>
        )}
      </WithLoader>
    </>
  );
};
