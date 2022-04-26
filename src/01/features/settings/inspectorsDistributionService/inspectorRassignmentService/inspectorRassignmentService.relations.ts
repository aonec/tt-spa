import { forward } from 'effector';
import { inspectorReassignmentService } from './inspectorReassignmentService.models';

inspectorReassignmentService.outputs.$isModalOpen
  .on(inspectorReassignmentService.inputs.openModal, () => true)
  .reset(inspectorReassignmentService.inputs.closeModal);

forward({
  from: inspectorReassignmentService.inputs.saveInspectorReassing,
  to: inspectorReassignmentService.form.reassingmentInspectorsForm.validate,
});

forward({
  from:
    inspectorReassignmentService.form.reassingmentInspectorsForm.formValidated,
  to: inspectorReassignmentService.inputs.reassingInspectorsFx,
});
