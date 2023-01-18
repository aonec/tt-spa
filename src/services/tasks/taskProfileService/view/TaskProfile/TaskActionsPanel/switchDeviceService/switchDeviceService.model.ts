import { taskProfileService } from 'services/tasks/taskProfileService/taskProfileService.model';
import {
  $calculatorTypesSelectItems,
  CalculatorInfosGate,
} from '01/features/carlculators/calculatorsInfo/models';

const { $task } = taskProfileService.outputs;

const $device = $task.map((task) => task?.device || null);

export const switchDeviceService = {
  outputs: {
    $device,
    $calculatorInfos: $calculatorTypesSelectItems,
  },
  gates: {
    CalculatorInfosGate,
  },
};
