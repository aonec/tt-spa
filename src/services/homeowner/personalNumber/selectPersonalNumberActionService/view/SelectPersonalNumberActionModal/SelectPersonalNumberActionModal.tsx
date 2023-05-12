import React, { FC } from 'react';
import { SelectPersonalNumberActionModalProps } from './SelectPersonalNumberActionModal.types';
import {
  SelectItem,
  StyledSelectItemTitle,
} from './SelectPersonalNumberActionModal.styled';
import {
  ApartmentIcon,
  PencilBigIcon,
  PlusIcon,
  SwitchIcon,
} from 'ui-kit/icons';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { PersonalNumberActions } from '../../selectPersonalNumberActionService.types';
import { useHistory } from 'react-router-dom';

const formId = 'select-personal-number-action-modal';

export const SelectPersonalNumberActionModal: FC<
  SelectPersonalNumberActionModalProps
> = ({ isOpen, setAction, apartmentId }) => {
  const history = useHistory();

  return (
    <FormModal
      title="Выберите действие"
      formId={formId}
      customFooter={<></>}
      visible={isOpen}
      form={
        <>
          <SelectItem onClick={() => setAction(PersonalNumberActions.Edit)}>
            <PencilBigIcon />
            <StyledSelectItemTitle>
              Редактировать лицевой счет
            </StyledSelectItemTitle>
          </SelectItem>

          <SelectItem onClick={() => setAction(PersonalNumberActions.Switch)}>
            <SwitchIcon />
            <StyledSelectItemTitle>Заменить лицевой счет</StyledSelectItemTitle>
          </SelectItem>

          <SelectItem
            onClick={() => {
              setAction(PersonalNumberActions.Add);
              history.push(
                `/apartment/${apartmentId}/homeowners/${PersonalNumberActions.Add}`,
              );
            }}
          >
            <PlusIcon />
            <StyledSelectItemTitle>
              Добавить новый лицевой счет к этой квартире
            </StyledSelectItemTitle>
          </SelectItem>

          <SelectItem onClick={() => setAction(PersonalNumberActions.Split)}>
            <ApartmentIcon />
            <StyledSelectItemTitle>
              Разделить лицевые счета и создать новую квартиру
            </StyledSelectItemTitle>
          </SelectItem>
        </>
      }
    />
  );
};
