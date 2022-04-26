import { displayInspectorsService } from '01/features/Inspectors/displayInspectors/displayInspectorsService.models';
import { createDomain } from 'effector';
import { createForm } from 'effector-forms/dist';

const inspectorReassignmentServiceDomain = createDomain(
  'inspectorrRassignmentService'
);

const $isModalOpen = inspectorReassignmentServiceDomain.createStore(false);

const openModal = inspectorReassignmentServiceDomain.createEvent();
const closeModal = inspectorReassignmentServiceDomain.createEvent();

const saveInspectorReassing = inspectorReassignmentServiceDomain.createEvent();

const reassingInspectorsFx = inspectorReassignmentServiceDomain.createEffect(
  () => console.log('work')
);

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
