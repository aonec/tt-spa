import React from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from 'effector-react';
import { getApartmentAddressString } from 'utils/getApartmentAddress';
import { apartmentService } from 'services/apartments/apartmentService/apartmentService.models';

const { outputs, gates } = apartmentService;
const { ApartmentGate } = gates;

export const HousingStockAddress = () => {
  const { id } = useParams<{ id: string }>();
  const housingStock = useStore(outputs.$apartment);
  const address = getApartmentAddressString(housingStock, true);

  return (
    <>
      <ApartmentGate id={Number(id)} />
      {address}
    </>
  );
};
