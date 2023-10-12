import { createEvent, createStore } from 'effector';

import { CalculatorConnectionType } from './ConnectionSettings.types';
import { createCalculatorModalService } from 'services/calculators/createCalculatorModalService';

const setConnectionType = createEvent<CalculatorConnectionType | null>();

const $connectionType = createStore<CalculatorConnectionType | null>(null)
  .on(setConnectionType, (_, type) => type)
  .reset(createCalculatorModalService.inputs.closeModal);

export const connectionSettingsService = {
  inputs: {
    setConnectionType,
    newCalculatorCreated: createCalculatorModalService.inputs.calculatorCreated,
  },
  outputs: { $connectionType },
};
