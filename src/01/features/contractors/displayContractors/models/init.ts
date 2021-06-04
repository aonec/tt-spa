import { requestContractors } from '../../../../_api/contractors';
import { $contractors, ContractorsGate, getContractorsFx } from './index';
import { forward, guard } from 'effector';

getContractorsFx.use(requestContractors);

$contractors.on(getContractorsFx.doneData, (contractors, response) =>
  contractors ? [...contractors, ...response.items] : response.items
);

forward({
  from: guard({
    source: $contractors,
    clock: ContractorsGate.open,
    filter: (contractors) => contractors === null,
  }),
  to: getContractorsFx,
});
