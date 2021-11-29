import {
  fetchExistingHousingStockNumbers,
  loadExistingHousingStockNumbers,
} from './index';
import { $existingHousingStockNumbers } from '.';
import { getExistingHousingStockNumbers } from '01/_api/housingStocks';
import { combine, sample } from 'effector';

fetchExistingHousingStockNumbers.use(getExistingHousingStockNumbers);

$existingHousingStockNumbers.on(
  fetchExistingHousingStockNumbers.doneData,
  (_, payload) => payload
);
