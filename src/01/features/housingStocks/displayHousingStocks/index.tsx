import { useStore } from 'effector-react';
import { $housingStocks, fetchHousingStocksFx } from './models';

export const HousingStocks = () => {
  const housingStocks = useStore($housingStocks);
  const pending = useStore(fetchHousingStocksFx.pending);
};
