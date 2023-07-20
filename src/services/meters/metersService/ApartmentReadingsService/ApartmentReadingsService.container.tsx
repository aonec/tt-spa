import React, { useEffect } from 'react';
import { ApartmentsReadings } from './view/ApartmentsReadings';
import { apartmentReadingsService } from './ApartmentReadingsService.model';
import { useUnit } from 'effector-react';
import { useHistory, useParams } from 'react-router-dom';
import { ESecuredIdentityRoleName } from 'myApi';
import { usePermission } from 'hooks/usePermission';
import { SelectPersonalNumberActionContainer } from 'services/homeowner/personalNumber/selectPersonalNumberActionService';
import { PauseApartmentContainer } from 'services/apartments/pauseApartmentService';

const { inputs, outputs } = apartmentReadingsService;

export const ApartmentReadingsContainer = () => {
  const history = useHistory();
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
    handleUpdatePhoneNumber,
    searchMode,
    isLoadingApartment,
    apartment,
    selectedHomeownerName,
    allIndividualDeviceMountPlaces,
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
    handleUpdatePhoneNumber: inputs.handleUpdatePhoneNumber,
    searchMode: outputs.$searchMode,
    isLoadingApartment: outputs.$isLoadingApartment,
    apartment: outputs.$apartment,
    selectedHomeownerName: outputs.$selectedHomeownerName,
    allIndividualDeviceMountPlaces: outputs.$allIndividualDeviceMountPlaces,
  });

  const isPermitionToApartmentStatusPatch = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.SeniorOperator,
    ESecuredIdentityRoleName.Operator,
  ]);

  useEffect(() => {
    return inputs.handleApartmentLoaded.watch((apartment) => {
      if (!apartment || apartment.id === Number(id)) return;

      history.push(`/meters/apartments/${apartment.id}`);
    }).unsubscribe;
  }, [history, id]);

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
        handleUpdatePhoneNumber={handleUpdatePhoneNumber}
        isUpdateHomeownerLoading={isUpdateHomeownerLoading}
        handleHomeownerUpdated={inputs.handleHomeownerUpdated}
      />
    </>
  );
};
