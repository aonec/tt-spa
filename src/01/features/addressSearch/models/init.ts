import {
  fetchExistingHousingStockNumbers,
  loadExistingHousingStockNumbers,
  addressSearchForm,
} from './index';
import { $existingHousingStockNumbers } from '.';
import { getExistingHousingStockNumbers } from '01/_api/housingStocks';
import { combine, sample } from 'effector';
import { searchForm } from '../../actsJournal/displayActsJournal/models/index';

fetchExistingHousingStockNumbers.use(getExistingHousingStockNumbers);

$existingHousingStockNumbers.on(
  fetchExistingHousingStockNumbers.doneData,
  (_, payload) => payload
);

sample({
  source: combine(
    addressSearchForm.fields.street.$value,
    searchForm.fields.city.$value,
    (street, city) => ({ street, city })
  ),
  clock: loadExistingHousingStockNumbers,
  target: fetchExistingHousingStockNumbers,
});
