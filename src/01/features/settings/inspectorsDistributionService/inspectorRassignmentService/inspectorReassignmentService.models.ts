import { displayInspectorsService } from '01/features/Inspectors/displayInspectors/displayInspectorsService.models';
import { createDomain } from 'effector';
import { createForm } from 'effector-forms/dist';
import { reassingHousingStockInspector } from './inspectorReassignmentService.api';
import { PatchInspectorPayload } from './inspectorReassignmentService.types';

const inspectorReassignmentServiceDomain = createDomain(
  'inspectorrRassignmentService'
);

const $isModalOpen = inspectorReassignmentServiceDomain.createStore(false);

const openModal = inspectorReassignmentServiceDomain.createEvent();
const closeModal = inspectorReassignmentServiceDomain.createEvent();

const saveInspectorReassing = inspectorReassignmentServiceDomain.createEvent();

const reassingInspectorsFx = inspectorReassignmentServiceDomain.createEffect<
  PatchInspectorPayload,
  void
>(reassingHousingStockInspector);

const $isLoading = reassingInspectorsFx.pending;

const reassingmentInspectorsForm = createForm({
  fields: {
    currentInspector: {
      init: null as number | null,
      rules: [
        {
          name: 'required',
          validator: Boolean,
        },
      ],
    },
    newInspector: {
      init: null as number | null,
      rules: [
        {
          name: 'required',
          validator: Boolean,
        },
      ],
    },
  },
});

export const inspectorReassignmentService = {
  outputs: {
    $isModalOpen,
    $inspectorsList: displayInspectorsService.outputs.$inspectorsList,
    $isLoading,
  },
  inputs: {
    openModal,
    closeModal,
    saveInspectorReassing,
    reassingInspectorsFx,
  },
  form: {
    reassingmentInspectorsForm,
  },
};
