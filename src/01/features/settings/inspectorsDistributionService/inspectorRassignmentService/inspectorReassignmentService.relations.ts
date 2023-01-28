import { message } from 'antd';
import { forward, sample } from 'effector';
import { searchInspectorsHousingStockService } from '../searchInspectorsHousingStocksService/searchInspectorsHousingStockService.models';
import { inspectorReassignmentService } from './inspectorReassignmentService.models';

inspectorReassignmentService.outputs.$isModalOpen
  .on(inspectorReassignmentService.inputs.openModal, () => true)
  .reset(inspectorReassignmentService.inputs.closeModal);

forward({
  from: inspectorReassignmentService.inputs.saveInspectorReassing,
  to: inspectorReassignmentService.form.reassingmentInspectorsForm.validate,
});

sample({
  source: inspectorReassignmentService.form.reassingmentInspectorsForm.$values,
  clock:
    inspectorReassignmentService.form.reassingmentInspectorsForm.formValidated,
  fn: ({ currentInspector, newInspector }) => ({
    inspectorId: currentInspector!,
    newInspectorId: newInspector!,
  }),
  target: inspectorReassignmentService.inputs.reassingInspectorsFx,
});

forward({
  from: inspectorReassignmentService.inputs.closeModal,
  to: inspectorReassignmentService.form.reassingmentInspectorsForm.reset,
});

forward({
  from: inspectorReassignmentService.inputs.reassingInspectorsFx.doneData,
  to: [
    inspectorReassignmentService.inputs.closeModal,
    searchInspectorsHousingStockService.forms.searchForm.submit,
  ],
});

inspectorReassignmentService.inputs.reassingInspectorsFx.doneData.watch(() =>
  message.success('Адреса успешно переназначены!')
);

inspectorReassignmentService.inputs.reassingInspectorsFx.failData.watch(() =>
  message.error('Ошибка переназначения адресов')
);
