import { accountingNodesFilterForm, getAccountingNodesDevices } from './index';
import { sample } from 'effector';
import { fetchIndividualDevicesFx } from '01/features/individualDevices/displayIndividualDevices/models';

sample({
  source: accountingNodesFilterForm.$values.map((elem) => ({
    City: elem.city,
    // Street:
  })),
  clock: getAccountingNodesDevices,
  target: fetchIndividualDevicesFx as any,
});
