import { inspectorReassignmentService } from './inspectorReassignmentService.models';

export type InspectorsReassignmentForm = typeof inspectorReassignmentService.form.reassingmentInspectorsForm;

export type PatchInspectorPayload = {
  inspectorId: number;
  newInspectorId: number;
};
