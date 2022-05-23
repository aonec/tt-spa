import { message } from 'antd';
import { combine, createDomain, forward } from 'effector';
import { nodeService } from '../../displayNode/models';
import {
  registerPipeNode,
  unsetPipeNode,
} from './nodeCommercialRegistrationService.api';
import {
  Error,
  NodeCommercialRegistrationRequestPayload,
  unsetNodeCommercialRegistrationRequestPayload,
} from './nodeCommercialRegistrationService.types';

const nodeCommercialRegistrationServiceDomain = createDomain(
  'nodeCommercialRegistrationService'
);

const $isModalOpen = nodeCommercialRegistrationServiceDomain.createStore(false);
const $doneData = nodeCommercialRegistrationServiceDomain.createStore(false)

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

const registrationNodeDone = registerNodeOnCommercialAccountingFx.doneData;
const unsetNodeDone = unsetNodeOnCommercialAccountingFx.doneData;

const registerNodeOnCommercialAccounting = nodeCommercialRegistrationServiceDomain.createEvent<NodeCommercialRegistrationRequestPayload>();
const unsetNodeOnCommercialAccounting = nodeCommercialRegistrationServiceDomain.createEvent<unsetNodeCommercialRegistrationRequestPayload>();

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
  from: [registrationNodeDone, unsetNodeDone],
  to: [nodeService.inputs.refetchNode, closeModal]
});

forward({
  from: registerNodeOnCommercialAccounting,
  to: registerNodeOnCommercialAccountingFx,
});

forward({
  from: unsetNodeOnCommercialAccounting,
  to: unsetNodeOnCommercialAccountingFx,
});

export const nodeCommercialRegistrationService = {
  inputs: {
    registerNodeOnCommercialAccounting,
    openModal,
    closeModal,
    unsetNodeOnCommercialAccounting,
  },
  outputs: {
    $isModalOpen,
    $loading,
    $doneData
  },
};
