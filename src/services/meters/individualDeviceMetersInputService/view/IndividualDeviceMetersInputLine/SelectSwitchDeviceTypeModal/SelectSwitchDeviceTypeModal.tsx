import React, { FC, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { CheckIcon, SwitchIcon } from 'ui-kit/icons';
import { ActionButton } from 'ui-kit/shared/ActionButton';
import { ButtonsWrapper } from './SelectSwitchDeviceTypeModal.styled';
import {
  SelectSwitchDeviceType,
  SelectSwitchDeviceTypeModalProps,
} from './SelectSwitchDeviceTypeModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';

export const SelectSwitchDeviceTypeModal: FC<
  SelectSwitchDeviceTypeModalProps
> = ({ apartmentId, close, deviceId, show }) => {
  const navigate =  useNavigate();

  const [selectedSwitchType, setSelectedSwitchType] =
    useState<SelectSwitchDeviceType | null>(null);

  const next = (to: SelectSwitchDeviceType) =>
     navigate(
      `/apartment/${apartmentId}/individualDevice/${deviceId}/${to}`,
    );

  const setSwitchType = (to: SelectSwitchDeviceType) => () =>
    to === selectedSwitchType
      ? setSelectedSwitchType(null)
      : setSelectedSwitchType(to);

  const isSwitchActive = (to: SelectSwitchDeviceType) =>
    to === selectedSwitchType;

  return (
    <FormModal
      formId="select-switch-device-type-modal"
      visible={show}
      onCancel={() => close()}
      onSubmit={() => selectedSwitchType && next(selectedSwitchType)}
      title="Выберите действие"
      submitBtnText="Далее"
      form={
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
      }
    />
  );
};
