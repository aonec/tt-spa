import React from 'react';
import { useParams } from 'react-router-dom';
import { getAddress } from '../utils';
import { useStore } from 'effector-react';
import {
  $apartment,
  ApartmentGate,
} from '01/features/apartments/displayApartment/models';

export const HousingStockAddress = () => {
  const { id } = useParams<{ id: string }>();
  const housingStock = useStore($apartment);
  const address = getAddress(housingStock);

  console.log(id);

  return (
    <>
      <ApartmentGate id={Number(id)} />
      {address}
    </>
  );
};
