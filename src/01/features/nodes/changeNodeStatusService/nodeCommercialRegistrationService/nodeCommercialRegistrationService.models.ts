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

const domain = createDomain(
  'nodeCommercialRegistrationService'
);

const $isModalOpen = domain.createStore<boolean>(false);
const $doneData = domain.createStore<boolean>(false)

const openModal = domain.createEvent();
const closeModal = domain.createEvent();

const registrationFx = domain.createEffect<
  NodeCommercialRegistrationRequestPayload,
  void,
  Error
>(registerPipeNode);

const unregistrationFx = domain.createEffect<
  unsetNodeCommercialRegistrationRequestPayload,
  void,
  Error
>(unsetPipeNode);


const registerNodeOnCommercialAccounting = domain.createEvent<NodeCommercialRegistrationRequestPayload>();
const unsetNodeOnCommercialAccounting = domain.createEvent<unsetNodeCommercialRegistrationRequestPayload>();

const $isLoading = combine(
  registrationFx.pending,
  unregistrationFx.pending,
  (...loadings) => loadings.some(Boolean)
);

registrationFx.failData.watch(({ response }) => {
  message.error(response?.data.error.Text);
});

registrationFx.done.watch(() => {
  message.success('Статус изменен успешно');
});

unregistrationFx.failData.watch(({ response }) => {
  message.error(response?.data.error.Text);
});

unregistrationFx.done.watch(() => {
  message.success('Статус изменен успешно');
});

$isModalOpen.on(openModal, () => true).on(closeModal, () => false);

forward({
  from: [registrationFx.doneData, unregistrationFx.doneData],
  to: [nodeService.inputs.refetchNode, closeModal]
});

forward({
  from: registerNodeOnCommercialAccounting,
  to: registrationFx,
});

forward({
  from: unsetNodeOnCommercialAccounting,
  to: unregistrationFx,
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
    $isLoading,
    $doneData
  },
};
