import { accountingNodesFilterForm, getAccountingNodesDevices } from './index';
import { sample } from 'effector';
import { fetchNodes } from '01/features/nodes/displayNodes/models';
import { fetchExistingCities } from '01/features/housingStocks/displayHousingStockCities/models';

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
  clock: fetchExistingCities.doneData,
  fn: (values): string => (values ? values[values.length - 1] : ''),
  target: accountingNodesFilterForm.fields.city.set,
});
