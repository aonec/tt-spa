import { message } from 'antd';
import { combine, createDomain, forward } from 'effector';
import { registerNode } from './nodeCommercialRegistrationService.api';
import { NodeCommercialRegistrationRequestPayload } from './nodeCommercialRegistrationService.types';

type Error = {
  error: {
    Text: string;
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
>(registerNode);

const unsetNodeOnCommercialAccountingFx = nodeCommercialRegistrationServiceDomain.createEffect<
  NodeCommercialRegistrationRequestPayload,
  void,
  Error
>(registerNode);

const registrationNodeDone = registerNodeOnCommercialAccountingFx.doneData;

const registerNodeOnCommercialAccounting = nodeCommercialRegistrationServiceDomain.createEvent<NodeCommercialRegistrationRequestPayload>();

const $loading = registerNodeOnCommercialAccountingFx.pending;

registerNodeOnCommercialAccountingFx.failData.watch(({ error }) => {
  message.error(error.Text);
});

registerNodeOnCommercialAccountingFx.done.watch(() => {
  message.success('Статус изменен успешно');
});

$isModalOpen.on(openModal, () => true).on(closeModal, () => false);

forward({
  from: registrationNodeDone,
  to: closeModal,
});

forward({
  from: registerNodeOnCommercialAccounting,
  to: registerNodeOnCommercialAccountingFx,
});

export const nodeCommercialRegistrationService = {
  inputs: {
    registerNodeOnCommercialAccounting,
    openModal,
    closeModal,
  },
  outputs: {
    $isModalOpen,
    $loading,
  },
};
