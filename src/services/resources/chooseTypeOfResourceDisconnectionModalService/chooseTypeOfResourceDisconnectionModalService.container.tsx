import { ModalTT } from '01/shared/ui/ModalTT';
import { ActionButton } from '01/_pages/MetersPage/components/MeterDevices/components/action_button/action_button';
import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { chooseTypeOfResourceDisconnectionModalService } from './chooseTypeOfResourceDisconnectionModalService.model';
import { ButtonsWrapper } from './chooseTypeOfResourceDisconnectionModalService.styled';

const { inputs, outputs } = chooseTypeOfResourceDisconnectionModalService;

export const ChooseTypeOfResourceDisconnectionModalContainer = () => {
  const isModalOpen = useStore(outputs.$isModalOpen);
  const isInterHeatingSeason = useStore(outputs.$isInterHeatingSeason);

  const setInterHeatingSeason = useEvent(inputs.setInterHeatingSeason);
  const clearInterHeatingSeason = useEvent(inputs.clearInterHeatingSeason);
  const closeModal = useEvent(inputs.closeModal);
  const submitModal = useEvent(inputs.submitModal);

  return (
    <ModalTT
      visible={isModalOpen}
      onCancel={() => closeModal()}
      onSubmit={() => submitModal()}
      title="Выберите тип отключения"
      saveBtnText="Далее"
    >
      <ButtonsWrapper>
        <ActionButton
          type="temporaryDisconnection"
          onClick={() => clearInterHeatingSeason()}
          active={!isInterHeatingSeason}
        />
        <ActionButton
          type="interHeatingSeason"
          onClick={() => setInterHeatingSeason()}
          active={isInterHeatingSeason}
        />
      </ButtonsWrapper>
    </ModalTT>
  );
};
