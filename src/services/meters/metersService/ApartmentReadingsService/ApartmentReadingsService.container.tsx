import React, { useEffect } from 'react';
import { ApartmentsReadings } from './view/ApartmentsReadings';
import { apartmentReadingsService } from './ApartmentReadingsService.model';
import { useUnit } from 'effector-react';
import { useNavigate, useParams } from 'react-router-dom';
import { ESecuredIdentityRoleName } from 'api/types';
import { usePermission } from 'hooks/usePermission';
import { SelectPersonalNumberActionContainer } from 'services/homeowner/personalNumber/selectPersonalNumberActionService';
import { PauseApartmentContainer } from 'services/apartments/pauseApartmentService';
import { getApartmentQuery } from './ApartmentReadingsService.api';

const { inputs, outputs } = apartmentReadingsService;

export const ApartmentReadingsContainer = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    printIssueCertificate,
    isUpdateHomeownerLoading,
    setSearchMode,
    handleSearchApartment,
    handleUpdateApartment,
    handlePauseApartment,
    handleCancelPauseApartment,
    openEditPersonalNumberModal,
    setSelectedHomeownerName,
    handleUpdateHomeowner,
    searchMode,
    isLoadingApartment,
    apartment,
    selectedHomeownerName,
    allIndividualDeviceMountPlaces,
    isApartmentFetched,
    nearestAppointment,
    removePhoneNumber,
    addPhoneNumber,
    replacePhoneNumber,
  } = useUnit({
    printIssueCertificate: inputs.printIssueCertificate,
    isUpdateHomeownerLoading: outputs.$isUpdateHomeownerLoading,
    setSearchMode: inputs.setSearchMode,
    handleSearchApartment: inputs.handleSearchApartment,
    handleUpdateApartment: inputs.handleUpdateApartment,
    handlePauseApartment: inputs.handlePauseApartment,
    handleCancelPauseApartment: inputs.handleCancelPauseApartment,
    openEditPersonalNumberModal: inputs.openEditPersonalNumberModal,
    setSelectedHomeownerName: inputs.setSelectedHomeownerName,
    handleUpdateHomeowner: inputs.handleUpdateHomeowner,
    searchMode: outputs.$searchMode,
    isLoadingApartment: outputs.$isLoadingApartment,
    apartment: outputs.$apartment,
    selectedHomeownerName: outputs.$selectedHomeownerName,
    allIndividualDeviceMountPlaces: outputs.$allIndividualDeviceMountPlaces,
    isApartmentFetched: getApartmentQuery.$succeeded,
    nearestAppointment: outputs.$apartmentAppointment,
    removePhoneNumber: inputs.removePhoneNumber,
    addPhoneNumber: inputs.addPhoneNumber,
    replacePhoneNumber: inputs.replacePhoneNumber,
  });

  const isPermitionToApartmentStatusPatch = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.SeniorOperator,
    ESecuredIdentityRoleName.Operator,
    ESecuredIdentityRoleName.ManagingFirmSpectatingAdministrator,
  ]);

  useEffect(() => {
    return inputs.handleApartmentLoaded.watch(({ result: apartment }) => {
      if (!apartment || apartment.id === Number(id)) return;

      navigate(`/meters/apartments/${apartment.id}`);
    }).unsubscribe;
  }, [navigate, id]);

  const handlePrintIssueCertificate = () => {
    printIssueCertificate(Number(id));
  };

  return (
    <>
      {apartment?.id && <PauseApartmentContainer apartmentId={apartment.id} />}
      {apartment && (
        <SelectPersonalNumberActionContainer apartment={apartment} />
      )}
      <ApartmentsReadings
        setSearchMode={setSearchMode}
        searchMode={searchMode}
        handleSearchApartment={handleSearchApartment}
        isLoadingApartment={isLoadingApartment}
        apartment={apartment}
        handleUpdateApartment={handleUpdateApartment}
        handlePauseApartment={() => handlePauseApartment()}
        handleCancelPauseApartment={() => handleCancelPauseApartment()}
        openEditPersonalNumberModal={openEditPersonalNumberModal}
        setSelectedHomeownerName={setSelectedHomeownerName}
        selectedHomeownerName={selectedHomeownerName}
        isPermitionToApartmentStatusPatch={isPermitionToApartmentStatusPatch}
        allIndividualDeviceMountPlaces={allIndividualDeviceMountPlaces}
        printIssueCertificate={handlePrintIssueCertificate}
        handleUpdateHomeowner={handleUpdateHomeowner}
        isUpdateHomeownerLoading={isUpdateHomeownerLoading}
        isApartmentFetched={isApartmentFetched}
        nearestAppointment={nearestAppointment}
        deletePhoneNumber={removePhoneNumber}
        addPhoneNumber={addPhoneNumber}
        replacePhoneNumber={replacePhoneNumber}
      />
    </>
  );
};
