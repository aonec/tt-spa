import React, { FC, useCallback, useMemo } from 'react';
import {
  AppointmentTextWrapper,
  ContentWrapper,
  ReadingsWrapper,
} from './ApartmentProfile.styled';
import { ApartmentProfileProps } from './ApartmentProfile.types';
import { AddressSearchContainer } from 'services/addressSearchService';
import {
  AddressSearchValues,
  SearchFieldType,
} from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { ApartmentIndividualDevicesMetersContainer } from 'services/meters/apartmentIndividualDevicesMetersService';
import { ApartmentInfo } from './ApartmentInfo';
import { ApartmentAlerts } from './ApartmentAlerts';
import { apartmentReadingsService } from '../../../ApartmentReadingsService.model';
import {  useNavigate, useParams } from 'react-router-dom';
import confirm from 'antd/lib/modal/confirm';
import { TypeAddressToStart } from 'ui-kit/shared/TypeToStart';
import { EApartmentStatus } from 'api/types';
import { NothingFound } from 'ui-kit/shared/NothingFound';
import dayjs from 'dayjs';

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
  isPermitionToApartmentStatusPatch,
  printIssueCertificate,
  handleUpdateHomeowner,
  isUpdateHomeownerLoading,
  isApartmentFetched,
  nearestAppointment,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate =  useNavigate();

  const isPaused = apartment
    ? apartment.status === EApartmentStatus.Pause
    : false;

  const handleSubmit = useCallback(
    (values: AddressSearchValues) => {
      const {
        city,
        street,
        house,
        apartment: apartmentNumber,
        corpus,
        question,
      } = values;

      const valuesArray = [city, street, house, apartmentNumber];

      if (!values.question && valuesArray.some((e) => !e)) return;

      handleSearchApartment({
        City: city,
        Street: street,
        HousingStockNumber: house,
        Corpus: corpus,
        ApartmentNumber: apartmentNumber,
        Question: question,
      });
    },
    [handleSearchApartment],
  );

  const address = apartment?.housingStock?.address?.mainAddress;

  const appointmentDate = useMemo(
    () =>
      nearestAppointment && dayjs(nearestAppointment.date).format('DD.MM.YYYY'),
    [nearestAppointment],
  );

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
            SearchFieldType.Corpus,
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
              corpus: address.corpus || undefined,
              apartment: apartment?.apartmentNumber || undefined,
              question: selectedHomeownerName || undefined,
            }
          }
          isError={!isLoadingApartment && !apartment && isApartmentFetched}
          isFocus={true}
        />
        <WithLoader isLoading={isLoadingApartment}>
          {!apartment && !isApartmentFetched && <TypeAddressToStart />}
          {!apartment && isApartmentFetched && <NothingFound />}
          {apartment && (
            <ContentWrapper>
              <ApartmentInfo
                apartment={apartment}
                handleUpdateApartment={handleUpdateApartment}
                setSelectedHomeownerName={setSelectedHomeownerName}
                menuButtons={[
                  {
                    title: 'Поставить на паузу',
                    hidden: isPaused || !isPermitionToApartmentStatusPatch,
                    onClick: handlePauseApartment,
                  },
                  {
                    title: 'Снять с паузы',
                    hidden: !isPaused || !isPermitionToApartmentStatusPatch,
                    onClick: handleCancelPauseApartment,
                  },
                  {
                    title: 'Изменить лицевой счет',
                    onClick: () => openEditPersonalNumberModal(true),
                  },
                  {
                    title: 'Добавить новый прибор',
                    onClick: () =>
                       navigate(
                        `/apartment/${apartment.id}/addIndividualDevice`,
                      ),
                  },
                  {
                    title: 'Выдать справку',
                    onClick: () => printIssueCertificate(),
                  },
                ]}
                handleUpdateHomeowner={handleUpdateHomeowner}
                isUpdateHomeownerLoading={isUpdateHomeownerLoading}
                additionalHeaderInfo={
                  appointmentDate && (
                    <AppointmentTextWrapper>
                      Запись на опломбировку: {appointmentDate}
                    </AppointmentTextWrapper>
                  )
                }
              />
              <ApartmentAlerts
                apartment={apartment}
                handleCancelPauseApartment={cancelPauseApartment}
                isPermitionToApartmentStatusPatch={
                  isPermitionToApartmentStatusPatch
                }
              />
              <ReadingsWrapper>
                <ApartmentIndividualDevicesMetersContainer
                  apartment={apartment}
                  editable
                />
              </ReadingsWrapper>
            </ContentWrapper>
          )}
        </WithLoader>
      </div>
    </>
  );
};
