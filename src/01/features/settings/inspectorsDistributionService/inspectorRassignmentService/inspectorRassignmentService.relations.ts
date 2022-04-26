import { inspectorReassignmentService } from './inspectorReassignmentService.models';

inspectorReassignmentService.outputs.$isModalOpen
  .on(inspectorReassignmentService.inputs.openModal, () => true)
  .reset(inspectorReassignmentService.inputs.closeModal);
