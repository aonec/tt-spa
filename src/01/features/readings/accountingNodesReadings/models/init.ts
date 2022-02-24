import { fetchExistingCities } from './../../../housingStocks/displayHousingStockCities/models/index';
import { accountingNodesFilterForm, getAccountingNodesDevices } from './index';
import { sample, forward } from 'effector';
import { fetchNodes } from '01/features/nodes/displayNodes/models';

sample({
  source: accountingNodesFilterForm.$values.map((elem) => ({
    'Address.City': elem.city,
    'Address.Street': elem.street,
    'Address.HousingStockNumber': elem.house,
  })),
  clock: [getAccountingNodesDevices, accountingNodesFilterForm.formValidated],
  target: fetchNodes,
});

forward({
  from: fetchExistingCities.doneData.map((cities) =>
    cities ? cities[cities.length - 1] : ''
  ),
  to: accountingNodesFilterForm.fields.city.set,
});
