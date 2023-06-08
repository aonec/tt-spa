import {
  accountingNodesFilterForm,
  fetchNodes,
  getAccountingNodesDevices,
} from './index';
import { sample } from 'effector';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

sample({
  source: accountingNodesFilterForm.$values.map((elem) => ({
    'Address.City': elem.city,
    'Address.Street': elem.street,
    'Address.HousingStockNumber': elem.house,
  })),
  clock: [getAccountingNodesDevices, accountingNodesFilterForm.formValidated],
  target: fetchNodes,
});

sample({
  clock: addressSearchService.outputs.$existingCities,
  fn: (values): string => (values ? values[values.length - 1] : ''),
  target: accountingNodesFilterForm.fields.city.set,
});
