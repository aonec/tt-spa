import { message } from 'antd';
import { combine, createDomain, forward } from 'effector';
import {
  registerElectricNode,
  registerPipeNode,
  unsetElectricNode,
  unsetPipeNode,
} from './nodeCommercialRegistrationService.api';
import {
  ElectricNodeCommercialRegistrationRequestPayload,
  NodeCommercialRegistrationRequestPayload,
  unsetElectricNodeCommercialRegistrationRequestPayload,
  unsetNodeCommercialRegistrationRequestPayload,
} from './nodeCommercialRegistrationService.types';

type Error = {
  response: {
    data: {
      error: {
        Text: string;
      };
    };
  };
};

const nodeCommercialRegistrationServiceDomain = createDomain(
  'nodeCommercialRegistrationService'
);

const $isModalOpen = nodeCommercialRegistrationServiceDomain.createStore(false);

const openModal = nodeCommercialRegistrationServiceDomain.createEvent();
const closeModal = nodeCommercialRegistrationServiceDomain.createEvent();

const registerNodeOnCommercialAccountingFx = nodeCommercialRegistrationServiceDomain.createEffect<
  NodeCommercialRegistrationRequestPayload,
  void,
  Error
>(registerPipeNode);

const unsetNodeOnCommercialAccountingFx = nodeCommercialRegistrationServiceDomain.createEffect<
  unsetNodeCommercialRegistrationRequestPayload,
  void,
  Error
>(unsetPipeNode);

const registerElectricNodeOnCommercialAccountingFx = nodeCommercialRegistrationServiceDomain.createEffect<
  ElectricNodeCommercialRegistrationRequestPayload,
  void,
  Error
>(registerElectricNode);

const unsetElectricNodeOnCommercialAccountingFx = nodeCommercialRegistrationServiceDomain.createEffect<
  unsetElectricNodeCommercialRegistrationRequestPayload,
  void,
  Error
>(unsetElectricNode);

const registrationPipeNodeDone = registerNodeOnCommercialAccountingFx.doneData;
const unsetPipeNodeDone = unsetNodeOnCommercialAccountingFx.doneData;
const registrationElectricNodeDone =
  registerElectricNodeOnCommercialAccountingFx.doneData;
const unsetElectricNodeDone =
  unsetElectricNodeOnCommercialAccountingFx.doneData;

const registerPipeNodeOnCommercialAccounting = nodeCommercialRegistrationServiceDomain.createEvent<NodeCommercialRegistrationRequestPayload>();
const unsetPipeNodeOnCommercialAccounting = nodeCommercialRegistrationServiceDomain.createEvent<unsetNodeCommercialRegistrationRequestPayload>();
const registerElectricNodeOnCommercialAccounting = nodeCommercialRegistrationServiceDomain.createEvent<ElectricNodeCommercialRegistrationRequestPayload>();
const unsetElectricNodeOnCommercialAccounting = nodeCommercialRegistrationServiceDomain.createEvent<unsetElectricNodeCommercialRegistrationRequestPayload>();

const $loading = combine(
  registerNodeOnCommercialAccountingFx.pending,
  unsetNodeOnCommercialAccountingFx.pending,
  
  (...loading) => loading.some(Boolean)
);

registerNodeOnCommercialAccountingFx.failData.watch(({ response }) => {
  message.error(response?.data.error.Text);
});

registerNodeOnCommercialAccountingFx.done.watch(() => {
  message.success('Статус изменен успешно');
});

unsetNodeOnCommercialAccountingFx.failData.watch(({ response }) => {
  message.error(response?.data.error.Text);
});

unsetNodeOnCommercialAccountingFx.done.watch(() => {
  message.success('Статус изменен успешно');
});

$isModalOpen.on(openModal, () => true).on(closeModal, () => false);

forward({
  from: [
    registrationPipeNodeDone,
    unsetPipeNodeDone,
    registrationElectricNodeDone,
    unsetElectricNodeDone,
  ],
  to: closeModal,
});

forward({
  from: registerPipeNodeOnCommercialAccounting,
  to: registerNodeOnCommercialAccountingFx,
});

forward({
  from: unsetPipeNodeOnCommercialAccounting,
  to: unsetNodeOnCommercialAccountingFx,
});

forward({
  from: unsetElectricNodeOnCommercialAccounting,
  to: unsetElectricNodeOnCommercialAccountingFx,
});

forward({
  from: registerElectricNodeOnCommercialAccounting,
  to: registerElectricNodeOnCommercialAccountingFx,
});

export const nodeCommercialRegistrationService = {
  inputs: {
    registerPipeNodeOnCommercialAccounting,
    openModal,
    closeModal,
    unsetPipeNodeOnCommercialAccounting,
    registerElectricNodeOnCommercialAccounting,
    unsetElectricNodeOnCommercialAccounting
  },
  outputs: {
    $isModalOpen,
    $loading,
  },
};
