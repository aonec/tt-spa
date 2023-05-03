import { combine, createDomain, forward, sample } from 'effector';
import { Stage } from './types';
import { createForm } from 'effector-forms';
import {
  CreateCalculatorRequest,
  MeteringDeviceResponse,
} from '../../../../../../../../myApi';
import axios from 'axios';
import { message } from 'antd';
import { EffectFailDataAxiosError } from 'types';
import { createGate } from 'effector-react';
import { Document } from 'ui-kit/DocumentsService';
import { addNodeCalculatorService } from '../AddNodeCalculatorConnectionModal.models';
import { editNodeService } from 'services/nodes/editNodeService';
import { calculatorsListService } from 'services/calculators/calculatorsListService';

const createCalcuatorDomain = createDomain();

const $isCreateCalculatorModalOpen = createCalcuatorDomain.createStore(false);

const $stage = createCalcuatorDomain.createStore<Stage>('1');

const nextStage = createCalcuatorDomain.createEvent();
const previousStage = createCalcuatorDomain.createEvent();

const setStage = createCalcuatorDomain.createEvent<Stage>();

const resetStage = createCalcuatorDomain.createEvent();

const CreateCalculatorGate = createGate<{ housingStockId?: number }>();

$stage.on(setStage, (_, value) => value);

sample({
  clock: resetStage,
  fn: (): Stage => '1',
  target: setStage,
});

$stage
  .on(nextStage, (value) => String(Number(value) + 1) as Stage)
  .on(previousStage, (value) => String(Number(value) - 1) as Stage);

const openCreateCalculatorModal = createCalcuatorDomain.createEvent();
const closeCreateCalculatorModal = createCalcuatorDomain.createEvent();

$isCreateCalculatorModalOpen
  .on(openCreateCalculatorModal, () => true)
  .reset(closeCreateCalculatorModal);

const baseInfoAddNodeCalculatorConnectionForm = createForm({
  fields: {
    serialNumber: { init: null as string | null },
    futureCheckingDate: { init: null as string | null },
    lastCheckingDate: { init: null as string | null },
    infoId: { init: null as number | null },
  },
});

const documentsForm = createForm({
  fields: {
    deviceAcceptanceAct: { init: null as null | Document },
    devicePassport: { init: null as null | Document },
    deviceTestCertificates: { init: null as null | Document },
  },
});

const createCalculatorFx = createCalcuatorDomain.createEffect<
  CreateCalculatorRequest,
  MeteringDeviceResponse,
  EffectFailDataAxiosError
>((payload) => axios.post('Calculators', payload));

const saveButtonClicked = createCalcuatorDomain.createEvent();

sample({
  source: combine(
    editNodeService.outputs.$node,
    baseInfoAddNodeCalculatorConnectionForm.$values,
    addNodeCalculatorService.inputs.connectionSettingsForm.$values,
    CreateCalculatorGate.state,
    documentsForm.$values,
  ),
  clock: saveButtonClicked,
  fn: ([
    node,
    { serialNumber, lastCheckingDate, futureCheckingDate, infoId },
    { isConnected, ipV4, port, deviceAddress },
    gateState,
    { deviceAcceptanceAct, devicePassport, deviceTestCertificates },
  ]) =>
    ({
      housingStockId: node?.housingStockId || gateState?.housingStockId,
      infoId,
      isConnected,
      serialNumber,
      lastCheckingDate,
      futureCheckingDate,
      connection: {
        ipV4,
        port: Number(port),
        deviceAddress: Number(deviceAddress),
      },
      documentsIds: [
        deviceAcceptanceAct?.id,
        devicePassport?.id,
        deviceTestCertificates?.id,
      ].filter((documentId): documentId is number => Boolean(documentId)),
    } as CreateCalculatorRequest),
  target: createCalculatorFx,
});

forward({
  from: createCalculatorFx.doneData,
  to: [
    resetStage,
    baseInfoAddNodeCalculatorConnectionForm.resetValues,
    addNodeCalculatorService.inputs.connectionSettingsForm.resetValues,
    closeCreateCalculatorModal,
  ],
});

createCalculatorFx.doneData.watch(() =>
  message.success('Вычислитель успешно создан!'),
);

createCalculatorFx.failData.watch((e) => {
  message.error(e.response.data.error.Text);
});

sample({
  clock: createCalculatorFx.doneData,
  fn: (calculatorResponse) => calculatorResponse.id,
  target:
    addNodeCalculatorService.inputs.addNodeCalculatorConnectionForm.fields
      .calculatorId.set,
});

forward({
  from: createCalculatorFx.doneData,
  to: calculatorsListService.inputs.refetchCalculators,
});

export const createCalcuatorService = {
  inputs: {
    openCreateCalculatorModal,
    closeCreateCalculatorModal,
    nextStage,
    previousStage,
    saveButtonClicked,
  },
  outputs: {
    $isCreateCalculatorModalOpen,
    $stage,
    $loading: createCalculatorFx.pending,
  },
  forms: {
    baseInfo: baseInfoAddNodeCalculatorConnectionForm,
    documentsForm,
  },
  events: {
    newCalculatorCreated: createCalculatorFx.doneData,
  },
  gates: {
    CreateCalculatorGate,
  },
};
