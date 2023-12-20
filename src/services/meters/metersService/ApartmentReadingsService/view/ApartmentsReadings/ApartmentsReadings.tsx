import React, { FC, ReactNode } from 'react';
import { ContentWrapper, Wrapper } from './ApartmentsReadings.styled';
import {
  ApartmentsReadingsProps,
  SearchMode,
} from './ApartmentsReadings.types';
import { Radio } from 'antd';
import { ApartmentProfile } from './ApartmentProfile';
import { DevicesSearch } from './DevicesSearch';

export const ApartmentsReadings: FC<ApartmentsReadingsProps> = ({
  searchMode,
  setSearchMode,
  handleSearchApartment,
  isLoadingApartment,
  apartment,
  handleUpdateApartment,
  handlePauseApartment,
  handleCancelPauseApartment,
  openEditPersonalNumberModal,
  setSelectedHomeownerName,
  selectedHomeownerName,
  isPermitionToApartmentStatusPatch,
  allIndividualDeviceMountPlaces,
  printIssueCertificate,
  handleUpdateHomeowner,
  isUpdateHomeownerLoading,
  isApartmentFetched,
  nearestAppointment,
  addPhoneNumber,
  deletePhoneNumber,
}) => {
  const componentsDictionary: { [key in SearchMode]: ReactNode } = {
    [SearchMode.Apartment]: (
      <ApartmentProfile
        isApartmentFetched={isApartmentFetched}
        handleSearchApartment={handleSearchApartment}
        isLoadingApartment={isLoadingApartment}
        apartment={apartment}
        handleUpdateApartment={handleUpdateApartment}
        handlePauseApartment={handlePauseApartment}
        handleCancelPauseApartment={handleCancelPauseApartment}
        openEditPersonalNumberModal={openEditPersonalNumberModal}
        setSelectedHomeownerName={setSelectedHomeownerName}
        selectedHomeownerName={selectedHomeownerName}
        isPermitionToApartmentStatusPatch={isPermitionToApartmentStatusPatch}
        printIssueCertificate={printIssueCertificate}
        handleUpdateHomeowner={handleUpdateHomeowner}
        isUpdateHomeownerLoading={isUpdateHomeownerLoading}
        nearestAppointment={nearestAppointment}
        addPhoneNumber={addPhoneNumber}
        deletePhoneNumber={deletePhoneNumber}
      />
    ),
    [SearchMode.SerialNumber]: (
      <DevicesSearch
        handleClickDevice={() => setSearchMode(SearchMode.Apartment)}
        apartmentId={apartment?.id}
        allIndividualDeviceMountPlaces={allIndividualDeviceMountPlaces}
      />
    ),
  };

  const component = componentsDictionary[searchMode];

  return (
    <Wrapper>
      <Radio.Group
        value={searchMode}
        onChange={(value) => setSearchMode(value.target.value as SearchMode)}
      >
        <Radio value={SearchMode.Apartment}>Поиск по адресу</Radio>
        <Radio value={SearchMode.SerialNumber}>Поиск по серийному номеру</Radio>
      </Radio.Group>
      <ContentWrapper>{component}</ContentWrapper>
    </Wrapper>
  );
};
