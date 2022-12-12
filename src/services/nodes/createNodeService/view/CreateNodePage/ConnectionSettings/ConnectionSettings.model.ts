import { createCalcuatorService } from '01/features/nodes/editNode/editNodeCalculatorConnection/components/AddNodeCalculatorConnectionModal/CreateCalculatorModal/models';
import { createDomain } from 'effector';
import { createNodeService } from 'services/nodes/createNodeService/createNodeService.model';
import { CalculatorConnectionType } from './ConnectionSettings.types';

const domain = createDomain('connectionSettings');

const setConnectionType = domain.createEvent<CalculatorConnectionType | null>();

const $connectionType = domain
  .createStore<CalculatorConnectionType | null>(null)
  .on(setConnectionType, (_, type) => type)
  .reset(createNodeService.gates.CreateCalculatorGate.close);

export const connectionSettingsService = {
  inputs: {
    setConnectionType,
    newCalculatorCreated: createCalcuatorService.events.newCalculatorCreated,
  },
  outputs: { $connectionType },
};
