import { switchStageSelectService } from '../switchStageSelectService';

export const switchOrCompleteService = {
  outputs: {
    $nextStages: switchStageSelectService.outputs.$nextStages,
  },
  gates: {
    NextStagesGate: switchStageSelectService.gates.NextStagesGate,
  },
};
