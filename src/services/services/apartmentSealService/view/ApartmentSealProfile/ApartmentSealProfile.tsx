import React, { FC, useCallback, useMemo } from 'react';
import { ApartmentSealProfileProps } from './ApartmentSealProfile.types';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import {
  AddressSearchContainerSC,
  AlertWrapper,
  AppointmentTextWrapper,
  ContentWrapper,
} from './ApartmentSealProfile.styled';
import { TypeAddressToStart } from 'ui-kit/shared/TypeToStart';
import { ApartmentInfo } from 'services/meters/metersService/ApartmentReadingsService/view/ApartmentsReadings/ApartmentProfile/ApartmentInfo';
import {
  AddressSearchValues,
  SearchFieldType,
} from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { IndividualDevicesList } from './IndividualDevicesList';
import dayjs from 'api/dayjs';
import { SealBottomPanel } from '../SealBottomPanel';
import { GoBack } from 'ui-kit/shared/GoBack';
import { NothingFound } from 'ui-kit/shared/NothingFound';
import { Alert } from 'ui-kit/Alert';
import { AlertType } from 'ui-kit/Alert/Alert.types';
import { getHousingStockItemAddress } from 'utils/getHousingStockItemAddress';

export const ApartmentSealProfile: FC<ApartmentSealProfileProps> = ({
  apartment,
  isLoadingApartment,
  searchApartment,
  setSelectedHomeownerName,
  selectedHomeownerName,
  updateApartment,
  individualDevices,
  openCreateSealAppointmentModal,
  nearestAppointment,
  isAppointmentLoading,
  isApartmentFetched,
  openRemoveAppointmentModal,
  housesWithDistricts,
}) => {
  const address = apartment?.housingStock?.address?.mainAddress;

  const isAddressInDistrict =
    address && housesWithDistricts.includes(address.housingStockId);

  const appointmentDate = useMemo(
    () =>
      nearestAppointment && dayjs(nearestAppointment.date).format('DD.MM.YYYY'),
    [nearestAppointment],
  );

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

  const handleOpenCreateSealAppointmentModal = useCallback(() => {
    if (!apartment) {
      return;
    }
    if (nearestAppointment) {
      return openCreateSealAppointmentModal({
        apartment,
        appointment: nearestAppointment,
      });
    }
    return openCreateSealAppointmentModal({ apartment, appointment: null });
  }, [apartment, openCreateSealAppointmentModal, nearestAppointment]);

  return (
    <>
      <GoBack path="/services/seal/select" />
      <AddressSearchContainerSC
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
        isError={!apartment && isApartmentFetched}
      />
      <WithLoader isLoading={isLoadingApartment}>
        {!apartment && !isApartmentFetched && <TypeAddressToStart />}
        {!apartment && isApartmentFetched && <NothingFound />}
        {apartment && (
          <>
            <ContentWrapper>
              <ApartmentInfo
                apartment={apartment}
                handleUpdateApartment={updateApartment}
                setSelectedHomeownerName={setSelectedHomeownerName}
                additionalHeaderInfo={
                  appointmentDate && (
                    <AppointmentTextWrapper>
                      Запись на опломбировку: {appointmentDate}
                    </AppointmentTextWrapper>
                  )
                }
              />
              {isAddressInDistrict === false && (
                <AlertWrapper>
                  <Alert type={AlertType.danger}>
                    Этот адрес не включен ни в один район, добавьте дом "
                    {getHousingStockItemAddress(address!)}" в один из районов
                    или создайте новый район.
                  </Alert>
                </AlertWrapper>
              )}
              <IndividualDevicesList individualDevices={individualDevices} />
            </ContentWrapper>
            {!isAppointmentLoading && (
              <SealBottomPanel
                apartment={apartment}
                openCreateSealAppointmentModal={
                  handleOpenCreateSealAppointmentModal
                }
                isAppointmentExist={Boolean(nearestAppointment)}
                openRemoveAppointmentModal={openRemoveAppointmentModal}
              />
            )}
          </>
        )}
      </WithLoader>
    </>
  );
};
