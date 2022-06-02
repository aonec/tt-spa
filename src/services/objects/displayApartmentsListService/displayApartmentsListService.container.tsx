import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { displayApartmentsListService } from './displayApartmentsListService.models';
import { ApartmentsList } from './view/ApartmentsList';
import { ApartmentsSearch } from './view/ApartmentsSearch';

export const ApartmentsListContainer = () => {
  const handleSearch = useEvent(
    displayApartmentsListService.inputs.searchApartments
  );

  const apartmentsList = useStore(
    displayApartmentsListService.outputs.$apartmentsList
  );
  const isLoading = useStore(displayApartmentsListService.outputs.$isLoading);
  const pageNumber = useStore(displayApartmentsListService.outputs.$pageNumber);

  return (
    <>
      <ApartmentsSearch handleSearch={handleSearch} />
      <ApartmentsList apartmentsList={apartmentsList} isLoading={isLoading} />
    </>
  );
};
