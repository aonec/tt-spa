import React from 'react';
import {
  $housingStock,
  HousingStockGate,
} from '01/features/housingStocks/displayHousingStock/models';
import { useParams } from 'react-router-dom';
import { getAddress } from '../utils';
import { useStore } from 'effector-react';

export const HousingStockAddress = () => {
  const { id } = useParams<{ id: string }>();
  const housingStock = useStore($housingStock);
  const address = getAddress(housingStock);

  return (
    <>
      <HousingStockGate id={Number(id)} />
      {address}
    </>
  );
};
