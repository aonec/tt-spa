import React from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from 'effector-react';
import {
  $apartment,
  ApartmentGate,
} from '01/features/apartments/displayApartment/models';
import { getApartmentAddressString } from 'utils/getApartmentAddress';

export const HousingStockAddress = () => {
  const { id } = useParams<{ id: string }>();
  const housingStock = useStore($apartment);
  const address = getApartmentAddressString(housingStock, true);

  return (
    <>
      <ApartmentGate id={Number(id)} />
      {address}
    </>
  );
};
