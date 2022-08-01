import { combine, sample } from 'effector';
import {
  $apartmentSearchId,
  $error,
  addressSearchForm,
  fetchApartmentSearchIdFx,
  onExitAddressSearchForm,
} from '.';
import { findApartmentId } from '../../../_api/apartments';
import { searchForm } from '../../actsJournal/displayActsJournal/models';

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

$error
  .on(fetchApartmentSearchIdFx.fail, () => true)
  .reset(fetchApartmentSearchIdFx.doneData, addressSearchForm.$values);
