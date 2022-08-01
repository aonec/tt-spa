import { accountingNodesFilterForm, getAccountingNodesDevices } from './index';
import { forward, sample } from 'effector';
import _ from 'lodash';
import { fetchExistingCities } from '../../../housingStocks/displayHousingStockCities/models';
import { fetchNodes } from '../../../nodes/displayNodes/models';

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
