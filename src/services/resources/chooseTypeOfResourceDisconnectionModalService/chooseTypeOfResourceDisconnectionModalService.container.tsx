import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { ActionButton } from 'ui-kit/sharedComponents/ActionButton';
import { chooseTypeOfResourceDisconnectionModalService } from './chooseTypeOfResourceDisconnectionModalService.model';
import {
  ButtonsWrapper,
  HeatIconSC,
  TimerIconSC,
} from './chooseTypeOfResourceDisconnectionModalService.styled';
import { FormModal } from 'ui-kit/Modals/FormModal';

const { inputs, outputs } = chooseTypeOfResourceDisconnectionModalService;

export const ChooseTypeOfResourceDisconnectionModalContainer = () => {
  const isModalOpen = useStore(outputs.$isModalOpen);
  const isInterHeatingSeason = useStore(outputs.$isInterHeatingSeason);

  const setInterHeatingSeason = useEvent(inputs.setInterHeatingSeason);
  const clearInterHeatingSeason = useEvent(inputs.clearInterHeatingSeason);
  const closeModal = useEvent(inputs.closeModal);
  const submitModal = useEvent(inputs.submitModal);

  return (
    <FormModal
      formId="choose-type-of-resource-disconnection-modal"
      visible={isModalOpen}
      onCancel={() => closeModal()}
      onSubmit={() => submitModal()}
      title="Выберите тип отключения"
      submitBtnText="Далее"
      form={
        <ButtonsWrapper>
          <ActionButton
            onClick={() => clearInterHeatingSeason()}
            active={!isInterHeatingSeason}
            icon={<TimerIconSC />}
            text="Временное отключение"
          />
          <ActionButton
            onClick={() => setInterHeatingSeason()}
            active={isInterHeatingSeason}
            icon={<HeatIconSC />}
            text="Межотопительный сезон"
          />
        </ButtonsWrapper>
      }
    />
  );
};
