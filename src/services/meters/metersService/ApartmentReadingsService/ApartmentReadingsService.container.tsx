import React, { useEffect } from 'react';
import { ApartmentsReadings } from './view/ApartmentsReadings';
import { apartmentReadingsService } from './ApartmentReadingsService.model';
import { useEvent, useStore } from 'effector-react';
import { useHistory, useParams } from 'react-router-dom';
import { PauseApartmentModal } from '01/features/apartments/pauseApartment';
import { SelectEditPersonalNumberTypeModal } from '01/features/homeowner/editPersonalNumber/SelectEditPersonalNumberTypeModal';

const { inputs, outputs } = apartmentReadingsService;

export const ApartmentReadingsContainer = () => {
  const history = useHistory();
  const { id } = useParams<{ id?: string }>();

  const setSearchMode = useEvent(inputs.setSearchMode);
  const handleSearchApartment = useEvent(inputs.handleSearchApartment);
  const handleUpdateApartment = useEvent(inputs.handleUpdateApartment);
  const handlePauseApartment = useEvent(inputs.handlePauseApartment);
  const handleCancelPauseApartment = useEvent(
    inputs.handleCancelPauseApartment
  );
  const openEditPersonalNumberModal = useEvent(
    inputs.openEditPersonalNumberModal
  );

  const searchMode = useStore(outputs.$searchMode);
  const isLoadingApartment = useStore(outputs.$isLoadingApartment);
  const apartment = useStore(outputs.$apartment);

  useEffect(() => {
    return inputs.handleApartmentLoaded.watch((apartment) => {
      console.log(apartment);

      if (!apartment) return;

      history.push(`/meters/apartments/${apartment.id}`);
    }).unsubscribe;
  }, []);

  return (
    <>
      {apartment?.id && <PauseApartmentModal apartmentId={apartment.id} />}
      {apartment && <SelectEditPersonalNumberTypeModal apartment={apartment} />}
      <ApartmentsReadings
        setSearchMode={setSearchMode}
        searchMode={searchMode}
        handleSearchApartment={handleSearchApartment}
        isLoadingApartment={isLoadingApartment}
        apartment={apartment}
        handleUpdateApartment={handleUpdateApartment}
        handlePauseApartment={() => handlePauseApartment()}
        handleCancelPauseApartment={() => handleCancelPauseApartment()}
        openEditPersonalNumberModal={() => openEditPersonalNumberModal()}
      />
    </>
  );
};
