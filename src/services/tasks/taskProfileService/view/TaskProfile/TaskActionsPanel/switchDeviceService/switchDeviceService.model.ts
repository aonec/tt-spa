import { calculatorsInfoService } from 'services/calculators/calculatorsInfoService';
import { taskProfileService } from 'services/tasks/taskProfileService/taskProfileService.model';

const { $task } = taskProfileService.outputs;

const $device = $task.map((task) => task?.device || null);

export const switchDeviceService = {
  outputs: {
    $device,
    $calculatorInfos:
      calculatorsInfoService.outputs.$calculatorTypesSelectItems,
  },
  gates: {
    CalculatorInfosGate: calculatorsInfoService.gates.CalculatorInfosGate,
  },
};
