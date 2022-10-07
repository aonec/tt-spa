import React, { useState } from 'react';
import { ButtonTT } from '01/tt-components';
import { useHistory, useParams } from 'react-router-dom';
import {
  Footer as ModalFooter,
  Header as ModalHeader,
  StyledModal as StyledAntdModal,
} from '01/shared/ui/Modal/Modal';
import { Flex } from '01/shared/ui/Layout/Flex';
import { ActionButton } from './action_button/action_button';

type SwitchType = 'switch' | 'check';

export const SelectSwitchDeviceTypeModal = ({
  show,
  close,
  deviceId,
}: {
  show: boolean;
  deviceId: number;
  close(): void;
}) => {
  const history = useHistory();

  const { id } = useParams<{ id: string }>();

  const [
    selectedSwitchType,
    setSelectedSwitchType,
  ] = useState<SwitchType | null>(null);

  const next = (to: SwitchType) => () =>
    history.push(`/apartment/${id}/individualDevice/${deviceId}/${to}`);

  const setSwitchType = (to: SwitchType) => () =>
    to === selectedSwitchType
      ? setSelectedSwitchType(null)
      : setSelectedSwitchType(to);

  const isSwitchActive = (to: SwitchType) => to === selectedSwitchType;

  return (
    <StyledAntdModal
      width={800}
      visible={show}
      onCancel={close}
      title={<ModalHeader>Выберите действие</ModalHeader>}
      footer={
        <ModalFooter>
          <ButtonTT color={'white'} key="back" onClick={close}>
            Отмена
          </ButtonTT>
          <ButtonTT
            color="blue"
            key="submit"
            disabled={!selectedSwitchType}
            onClick={next(selectedSwitchType!)}
          >
            Далее
          </ButtonTT>
        </ModalFooter>
      }
    >
      <Flex>
        <ActionButton
          onClick={setSwitchType('switch')}
          active={isSwitchActive('switch')}
          type="switch"
        />
        <ActionButton
          onClick={setSwitchType('check')}
          active={isSwitchActive('check')}
          type="check"
        />
      </Flex>
    </StyledAntdModal>
  );
};
