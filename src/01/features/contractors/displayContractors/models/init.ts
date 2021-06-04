import { requestContractors } from '../../../../_api/contractors';
import { ContractorsGate, getContractorsFx } from './index';
import { forward } from 'effector';

getContractorsFx.use(requestContractors)

forward({
  from: ContractorsGate.open,
  to: getContractorsFx,
});
