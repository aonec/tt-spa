import React, { FC, useCallback } from 'react';
import { ContentWrapper, ReadingsWrapper } from './ApartmentProfile.styled';
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
import { ApartmentAlerts } from './ApartmentAlerts';
import { apartmentReadingsService } from '../../../ApartmentReadingsService.model';
import { useParams } from 'react-router-dom';
import confirm from 'antd/lib/modal/confirm';

const { gates } = apartmentReadingsService;
const { ApartmentGate } = gates;

export const ApartmentProfile: FC<ApartmentProfileProps> = ({
  isLoadingApartment,
  apartment,
  handleSearchApartment,
  handleUpdateApartment,
  handlePauseApartment,
  handleCancelPauseApartment,
  openEditPersonalNumberModal,
  setSelectedHomeownerName,
  selectedHomeownerName,
}) => {
  const { id } = useParams<{ id: string }>();

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
    [handleSearchApartment],
  );

  const address = apartment?.housingStock?.address?.mainAddress;

  const cancelPauseApartment = () =>
    confirm({
      title: 'Вы действительно хотите снять эту квартиру с паузы?',
      okText: 'Снять с паузы',
      cancelText: 'Отмена',
      onOk: async () => {
        handleCancelPauseApartment();

        await new Promise((res) => setTimeout(res, 200));
      },
    });

  return (
    <>
      <ApartmentGate id={Number(id)} />
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
                handleUpdateApartment={handleUpdateApartment}
                handlePauseApartment={handlePauseApartment}
                handleCancelPauseApartment={cancelPauseApartment}
                openEditPersonalNumberModal={openEditPersonalNumberModal}
                setSelectedHomeownerName={setSelectedHomeownerName}
              />
              <ApartmentAlerts
                apartment={apartment}
                handleCancelPauseApartment={cancelPauseApartment}
              />
              <ReadingsWrapper>
                <ApartmentIndividualDevicesMetersContainer
                  apartment={apartment}
                />
              </ReadingsWrapper>
            </ContentWrapper>
          )}
        </WithLoader>
      </div>
    </>
  );
};
