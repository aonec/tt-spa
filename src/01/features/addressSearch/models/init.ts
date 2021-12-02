import { getExistingApartmentNumbers } from './../../../_api/housingStocks';
import {
  fetchExistingHousingStockNumbers,
  loadExistingHousingStockNumbers,
  addressSearchForm,
  fetchExistingApartmentNumbersFx,
  $existingApartmentNumbers,
  loadExistingApartmentNumbers,
} from './index';
import { $existingHousingStockNumbers } from '.';
import { getExistingHousingStockNumbers } from '01/_api/housingStocks';
import { combine, guard, sample } from 'effector';
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

fetchExistingApartmentNumbersFx.use(getExistingApartmentNumbers);

$existingApartmentNumbers.on(
  fetchExistingApartmentNumbersFx.doneData,
  (_, payload) => payload
);

sample({
  source: combine(
    $existingHousingStockNumbers,
    addressSearchForm.fields.house.$value,
    (existingHouseNumbers, house) => ({ existingHouseNumbers, house })
  ),
  fn: ({ existingHouseNumbers, house }) => {
    const res = existingHouseNumbers?.find((elem) => elem.number === house)
      ?.id!;

    return res;
  },
  clock: loadExistingApartmentNumbers,
  target: fetchExistingApartmentNumbersFx as any,
});
