import { createDomain } from 'effector';
import { CalculatorConnectionType } from './ConnectionSettings.types';
import { createCalculatorModalService } from '01/features/nodes/editNode/editNodeCalculatorConnection/components/AddNodeCalculatorConnectionModal/createCalculatorModalService';

const domain = createDomain('connectionSettings');

const setConnectionType = domain.createEvent<CalculatorConnectionType | null>();

const $connectionType = domain
  .createStore<CalculatorConnectionType | null>(null)
  .on(setConnectionType, (_, type) => type)
  .reset(createCalculatorModalService.inputs.closeModal);

export const connectionSettingsService = {
  inputs: {
    setConnectionType,
    newCalculatorCreated: createCalculatorModalService.inputs.calculatorCreated,
  },
  outputs: { $connectionType },
};
