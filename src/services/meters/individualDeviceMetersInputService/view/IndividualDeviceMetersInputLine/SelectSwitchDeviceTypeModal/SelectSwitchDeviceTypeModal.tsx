import { ModalTT } from '01/shared/ui/ModalTT';
import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CheckIcon, SwitchIcon } from 'ui-kit/icons';
import { ActionButton } from 'ui-kit/shared_components/ActionButton';
import { ButtonsWrapper } from './SelectSwitchDeviceTypeModal.styled';
import {
  SelectSwitchDeviceType,
  SelectSwitchDeviceTypeModalProps,
} from './SelectSwitchDeviceTypeModal.types';

export const SelectSwitchDeviceTypeModal: FC<
  SelectSwitchDeviceTypeModalProps
> = ({ apartmentId, close, deviceId, show }) => {
  const history = useHistory();

  const [selectedSwitchType, setSelectedSwitchType] =
    useState<SelectSwitchDeviceType | null>(null);

  const next = (to: SelectSwitchDeviceType) =>
    history.push(
      `/apartment/${apartmentId}/individualDevice/${deviceId}/${to}`,
    );

  const setSwitchType = (to: SelectSwitchDeviceType) => () =>
    to === selectedSwitchType
      ? setSelectedSwitchType(null)
      : setSelectedSwitchType(to);

  const isSwitchActive = (to: SelectSwitchDeviceType) =>
    to === selectedSwitchType;

  return (
    <ModalTT
      visible={show}
      onCancel={() => close()}
      onSubmit={() => selectedSwitchType && next(selectedSwitchType)}
      title="Выберите действие"
      saveBtnText="Далее"
    >
      <ButtonsWrapper>
        <ActionButton
          onClick={setSwitchType('switch')}
          active={isSwitchActive('switch')}
          text="Замена прибора"
          icon={<SwitchIcon />}
        />
        <ActionButton
          onClick={setSwitchType('check')}
          active={isSwitchActive('check')}
          text="Поверка прибора"
          icon={<CheckIcon />}
        />
      </ButtonsWrapper>
    </ModalTT>
  );
};
