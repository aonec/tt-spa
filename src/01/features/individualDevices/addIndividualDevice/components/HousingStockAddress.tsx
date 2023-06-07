import React from 'react';
import { useParams } from 'react-router-dom';
import { getAddress } from '../utils';
import { useStore } from 'effector-react';
import { apartmentService } from 'services/apartments/apartmentService/apartmentService.models';

const { outputs, gates } = apartmentService;
const { ApartmentGate } = gates;

export const HousingStockAddress = () => {
  const { id } = useParams<{ id: string }>();
  const apartment = useStore(outputs.$apartment);
  const address = getAddress(apartment);

  return (
    <>
      <ApartmentGate id={Number(id)} />
      {address}
    </>
  );
};
