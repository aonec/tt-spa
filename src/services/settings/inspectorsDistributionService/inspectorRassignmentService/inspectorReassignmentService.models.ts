import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { createForm } from 'effector-forms';
import { message } from 'antd';
import { displayInspectorsService } from 'services/inspectors/displayInspectorsService/displayInspectorsService.models';
import { reassingHousingStockInspector } from './inspectorReassignmentService.api';
import {
  PatchInspectorFormPayload,
  PatchInspectorPayload,
} from './inspectorReassignmentService.types';
import { searchInspectorsHousingStockService } from '../searchInspectorsHousingStocksService/searchInspectorsHousingStockService.models';

const openModal = createEvent();
const closeModal = createEvent();

const saveInspectorReassing = createEvent();

const reassingInspectorsFx = createEffect<PatchInspectorPayload, void>(
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

const $isModalOpen = createStore(false)
  .on(openModal, () => true)
  .reset(closeModal);

sample({
  clock: saveInspectorReassing,
  target: reassingmentInspectorsForm.validate,
});

sample({
  clock: reassingmentInspectorsForm.formValidated,
  filter: (values): values is PatchInspectorFormPayload =>
    Boolean(values.currentInspector && values.newInspector),
  fn: (values: PatchInspectorFormPayload) => ({
    inspectorId: values.currentInspector,
    newInspectorId: values.newInspector,
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
