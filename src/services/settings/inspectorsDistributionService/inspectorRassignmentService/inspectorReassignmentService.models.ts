import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { message } from 'antd';
import { displayInspectorsService } from 'services/inspectors/displayInspectorsService/displayInspectorsService.models';
import { reassingHousingStockInspector } from './inspectorReassignmentService.api';
import {
  PatchInspectorFormPayload,
  PatchInspectorPayload,
} from './inspectorReassignmentService.types';
import { searchInspectorsHousingStockService } from '../searchInspectorsHousingStocksService/searchInspectorsHousingStockService.models';
import { ReassingInspectorForm } from './views/ReassingInspectorModal/ReassingInspectorModal.types';

const openModal = createEvent();
const closeModal = createEvent();

const saveInspectorReassing = createEvent<ReassingInspectorForm>();

const reassingInspectorsFx = createEffect<PatchInspectorPayload, void>(
  reassingHousingStockInspector,
);

const $isLoading = reassingInspectorsFx.pending;

const $isModalOpen = createStore(false)
  .on(openModal, () => true)
  .reset(closeModal);

sample({
  clock: saveInspectorReassing,
  filter: (values): values is PatchInspectorFormPayload =>
    Boolean(values.currentInspector && values.newInspector),
  fn: (values: PatchInspectorFormPayload) => ({
    inspectorId: values.currentInspector,
    newInspectorId: values.newInspector,
  }),
  target: reassingInspectorsFx,
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
};
