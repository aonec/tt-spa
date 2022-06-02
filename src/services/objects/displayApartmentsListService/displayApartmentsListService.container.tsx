import React from 'react';
import { ApartmentsList } from './view/ApartmentsList';
import { ApartmentsSearch } from './view/ApartmentsSearch';

export const ApartmentsListContainer = () => {
  return (
    <>
      <ApartmentsSearch />
      <ApartmentsList />
    </>
  );
};
