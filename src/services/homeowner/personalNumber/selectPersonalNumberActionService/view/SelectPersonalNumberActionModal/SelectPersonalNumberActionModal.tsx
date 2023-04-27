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

const formId = 'select-personal-number-action-modal';

export const SelectPersonalNumberActionModal: FC<
  SelectPersonalNumberActionModalProps
> = ({ isOpen, setOpen }) => {
  return (
    <FormModal
      title="Выберите действие"
      formId={formId}
      customFooter={<></>}
      visible={isOpen}
      form={
        <>
          <SelectItem
          // onClick={() => setSelectedType(selectItem)}
          >
            <PencilBigIcon />
            <StyledSelectItemTitle>
              Редактировать лицевой счет
            </StyledSelectItemTitle>
          </SelectItem>

          <SelectItem
          // onClick={() => setSelectedType(selectItem)}
          >
            <SwitchIcon />
            <StyledSelectItemTitle>Заменить лицевой счет</StyledSelectItemTitle>
          </SelectItem>

          <SelectItem
          // onClick={() => setSelectedType(selectItem)}
          >
            <PlusIcon />
            <StyledSelectItemTitle>
              Добавить новый лицевой счет к этой квартире
            </StyledSelectItemTitle>
          </SelectItem>

          <SelectItem
          // onClick={() => setSelectedType(selectItem)}
          >
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
