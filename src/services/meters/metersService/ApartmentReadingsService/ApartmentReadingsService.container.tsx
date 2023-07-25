import React, { useEffect } from 'react';
import { ApartmentsReadings } from './view/ApartmentsReadings';
import { apartmentReadingsService } from './ApartmentReadingsService.model';
import { useEvent, useStore, useUnit } from 'effector-react';
import { useHistory, useParams } from 'react-router-dom';
import { ESecuredIdentityRoleName } from 'api/types';
import { usePermission } from 'hooks/usePermission';
import { SelectPersonalNumberActionContainer } from 'services/homeowner/personalNumber/selectPersonalNumberActionService';
import { PauseApartmentContainer } from 'services/apartments/pauseApartmentService';

const { inputs, outputs } = apartmentReadingsService;

export const ApartmentReadingsContainer = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const setSearchMode = useEvent(inputs.setSearchMode);
  const handleSearchApartment = useEvent(inputs.handleSearchApartment);
  const handleUpdateApartment = useEvent(inputs.handleUpdateApartment);
  const handlePauseApartment = useEvent(inputs.handlePauseApartment);
  const handleCancelPauseApartment = useEvent(
    inputs.handleCancelPauseApartment,
  );
  const openEditPersonalNumberModal = useEvent(
    inputs.openEditPersonalNumberModal,
  );
  const setSelectedHomeownerName = useEvent(inputs.setSelectedHomeownerName);

  const searchMode = useStore(outputs.$searchMode);
  const isLoadingApartment = useStore(outputs.$isLoadingApartment);
  const apartment = useStore(outputs.$apartment);
  const selectedHomeownerName = useStore(outputs.$selectedHomeownerName);
  const allIndividualDeviceMountPlaces = useStore(
    outputs.$allIndividualDeviceMountPlaces,
  );
  const printIssueCertificate = useUnit(inputs.printIssueCertificate);

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
      />
    </>
  );
};
