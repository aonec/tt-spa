import { combine, sample } from 'effector';
import { actsJournalService } from 'services/actsJournalService';
import { FindApartmentParams } from './addressIdSearchService/addressIdSearchService.types';
import { addressIdSearchService } from './addressIdSearchService';

sample({
  source: combine(
    addressIdSearchService.outputs.$searchAddressFilter,
    actsJournalService.outputs.$actsFilter,
    (values, filter) => ({ ...values, City: filter.City }),
  ),
  filter: (payload): payload is FindApartmentParams => {
    return Boolean(
      payload.ApartmentNumber && payload.HousingNumber && payload.Street,
    );
  },
  clock: addressIdSearchService.inputs.getApartmentSearchId,
  target: addressIdSearchService.inputs.getApartmentSearchIdFx,
});
