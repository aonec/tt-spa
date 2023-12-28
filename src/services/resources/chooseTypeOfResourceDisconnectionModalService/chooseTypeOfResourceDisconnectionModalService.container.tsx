import { useUnit } from 'effector-react';
import React from 'react';
import { ActionButton } from 'ui-kit/shared/ActionButton';
import { chooseTypeOfResourceDisconnectionModalService } from './chooseTypeOfResourceDisconnectionModalService.model';
import {
  ButtonsWrapper,
  HeatIconSC,
  TimerIconSC,
} from './chooseTypeOfResourceDisconnectionModalService.styled';
import { FormModal } from 'ui-kit/Modals/FormModal';

const { inputs, outputs } = chooseTypeOfResourceDisconnectionModalService;

export const ChooseTypeOfResourceDisconnectionModalContainer = () => {
  const {
    clearInterHeatingSeason,
    closeModal,
    isInterHeatingSeason,
    isModalOpen,
    setInterHeatingSeason,
    submitModal,
  } = useUnit({
    isModalOpen: outputs.$isModalOpen,
    isInterHeatingSeason: outputs.$isInterHeatingSeason,
    setInterHeatingSeason: inputs.setInterHeatingSeason,
    clearInterHeatingSeason: inputs.clearInterHeatingSeason,
    closeModal: inputs.closeModal,
    submitModal: inputs.submitModal,
  });

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
