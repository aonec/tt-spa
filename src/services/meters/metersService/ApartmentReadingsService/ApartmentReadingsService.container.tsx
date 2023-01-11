import React, { useEffect } from 'react';
import { ApartmentsReadings } from './view/ApartmentsReadings';
import { apartmentReadingsService } from './ApartmentReadingsService.model';
import { useEvent, useStore } from 'effector-react';
import { useHistory, useParams } from 'react-router-dom';
import { PauseApartmentModal } from '01/features/apartments/pauseApartment';

const { inputs, outputs, gates } = apartmentReadingsService;
const { ApartmentGate } = gates;

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

  const searchMode = useStore(outputs.$searchMode);
  const isLoadingApartment = useStore(outputs.$isLoadingApartment);
  const apartment = useStore(outputs.$apartment);

  useEffect(() => {
    if (id && Number(id) === apartment?.id) return;

    history.push(`/meters/apartments/${apartment?.id || ''}`);
  }, [apartment, id]);

  const apartmentId = Number(id) || undefined;

  return (
    <>
      <ApartmentGate id={apartmentId} />
      {apartment?.id && <PauseApartmentModal apartmentId={apartment.id} />}
      <ApartmentsReadings
        setSearchMode={setSearchMode}
        searchMode={searchMode}
        handleSearchApartment={handleSearchApartment}
        isLoadingApartment={isLoadingApartment}
        apartment={apartment}
        handleUpdateApartment={handleUpdateApartment}
        handlePauseApartment={() => handlePauseApartment()}
        handleCancelPauseApartment={() => handleCancelPauseApartment()}
      />
    </>
  );
};
