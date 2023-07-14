import { displayInspectorsService } from 'services/inspectors/displayInspectorsService/displayInspectorsService.models';
import { createDomain, sample } from 'effector';
import { createForm } from 'effector-forms';
import { reassingHousingStockInspector } from './inspectorReassignmentService.api';
import { PatchInspectorPayload } from './inspectorReassignmentService.types';
import { searchInspectorsHousingStockService } from '../searchInspectorsHousingStocksService/searchInspectorsHousingStockService.models';
import { message } from 'antd';

const domain = createDomain('inspectorrRassignmentService');

const openModal = domain.createEvent();
const closeModal = domain.createEvent();

const saveInspectorReassing = domain.createEvent();

const reassingInspectorsFx = domain.createEffect<PatchInspectorPayload, void>(
  reassingHousingStockInspector,
);

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

const $isModalOpen = domain
  .createStore(false)
  .on(openModal, () => true)
  .reset(closeModal);

sample({
  clock: saveInspectorReassing,
  target: reassingmentInspectorsForm.validate,
});

sample({
  clock: reassingmentInspectorsForm.formValidated,
  fn: ({ currentInspector, newInspector }) => ({
    inspectorId: currentInspector!,
    newInspectorId: newInspector!,
  }),
  target: reassingInspectorsFx,
});

sample({
  clock: closeModal,
  target: reassingmentInspectorsForm.reset,
});

sample({
  clock: reassingInspectorsFx.doneData,
  target: [
    closeModal,
    searchInspectorsHousingStockService.forms.searchForm.submit,
  ],
});

reassingInspectorsFx.doneData.watch(() =>
  message.success('Адреса успешно переназначены!'),
);

reassingInspectorsFx.failData.watch(() =>
  message.error('Ошибка переназначения адресов'),
);

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
