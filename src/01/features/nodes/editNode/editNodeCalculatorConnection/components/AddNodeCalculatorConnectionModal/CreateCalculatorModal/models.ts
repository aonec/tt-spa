import { combine, createDomain, forward, sample } from 'effector';
import { Stage } from './types';
import { createForm } from 'effector-forms';
import {
  CreateCalculatorRequest,
  MeteringDeviceResponse,
} from '../../../../../../../../myApi';
import axios from 'axios';
import { nodeService } from '../../../../../displayNode/models';
import { addNodeCalculatorService } from '../models';
import { message } from 'antd';
import { EffectFailDataAxiosError } from 'types';
import { createGate } from 'effector-react';

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
    serialNumber: { init: null as number | null },
    futureCheckingDate: { init: null as string | null },
    lastCheckingDate: { init: null as string | null },
    infoId: { init: null as number | null },
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
    nodeService.outputs.$node,
    baseInfoAddNodeCalculatorConnectionForm.$values,
    addNodeCalculatorService.inputs.connectionSettingsForm.$values,
    CreateCalculatorGate.state,
  ),
  clock: saveButtonClicked,
  fn: ([
    node,
    { serialNumber, lastCheckingDate, futureCheckingDate, infoId },
    { isConnected, ipV4, port, deviceAddress },
    gateState,
  ]) => ({
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
  }),
  target: createCalculatorFx as any,
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
  },
  events: {
    newCalculatorCreated: createCalculatorFx.doneData,
  },
  gates: {
    CreateCalculatorGate,
  },
};
