import React from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from 'effector-react';
import { getApartmentAddressString } from '../../../../../utils/getApartmentAddress';
import { $apartment, ApartmentGate } from '../../../apartments/displayApartment/models';


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
