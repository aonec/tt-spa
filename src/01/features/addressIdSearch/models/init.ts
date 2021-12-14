import { searchForm } from '01/features/actsJournal/displayActsJournal/models';
import { findApartmentId } from '01/_api/apartments';
import { combine, sample } from 'effector';
import {
  $apartmentSearchId,
  addressSearchForm,
  fetchApartmentSearchIdFx,
  onExitAddressSearchForm,
} from '.';

fetchApartmentSearchIdFx.use(findApartmentId);

$apartmentSearchId
  .on(fetchApartmentSearchIdFx.doneData, (_, result) => result)
  .reset(addressSearchForm.$values);

sample({
  source: combine(
    addressSearchForm.$values.map(({ street, apartment, house }) => ({
      Street: street,
      HousingNumber: house,
      ApartmentNumber: apartment,
    })),
    searchForm.fields.city.$value,
    (values, city) => ({ ...values, City: city })
  ),
  clock: onExitAddressSearchForm,
  target: fetchApartmentSearchIdFx as any,
});
