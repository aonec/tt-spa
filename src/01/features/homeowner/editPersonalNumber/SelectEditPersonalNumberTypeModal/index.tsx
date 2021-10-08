import React from 'react';
import { ModalTT } from '01/shared/ui/ModalTT';
import { useStore } from 'effector-react';
import {
  $isSelectEditPersonalNumberTypeModalOpen,
  closeEditPersonalNumberTypeModal,
} from '../models';
import styled from 'styled-components';
import { PlusIcon, EditIcon, SwitchIcon, ApartmentIcon } from '../icons';
import { Space } from '01/shared/ui/Layout/Space/Space';

export const SelectEditPersonalNumberTypeModal: React.FC = () => {
  const isOpen = useStore($isSelectEditPersonalNumberTypeModalOpen);

  const selects: SelectItem[] = [
    {
      title: 'Редактировать лицевой счет',
      icon: EditIcon,
    },
    {
      title: 'Заменить лицевой счет',
      icon: SwitchIcon,
    },
    {
      title: 'Добавить новый лицевой счет к этой квартире',
      icon: PlusIcon,
    },
    {
      title: 'Разделить лицевые счета и создать новую квартиру',
      icon: ApartmentIcon,
    },
  ];

  const renderSelectItem = ({ title, icon: Icon, action }: SelectItem) => (
    <StyledSelectItem onClick={action}>
      <Icon />
      <Space />
      <StyledSelectItemTitle>{title}</StyledSelectItemTitle>
    </StyledSelectItem>
  );

  return (
    <ModalTT
      visible={isOpen}
      title="Выберите действие"
      footer={<></>}
      onCancel={closeEditPersonalNumberTypeModal}
    >
      {selects.map(renderSelectItem)}
    </ModalTT>
  );
};

interface SelectItem {
  title: string;
  icon: React.FC;
  action?(): void;
}

const StyledSelectItem = styled.div`
  border: 1px solid rgba(220, 222, 228, 1);
  border-radius: 10px;
  cursor: pointer;

  display: flex;
  align-items: center;
  padding: 14px 18px;

  transition: 0.2s;

  &:hover {
    border: 1px solid rgba(24, 158, 233, 1);
    box-shadow: 0 4px 8px rgba(24, 158, 233, 0.32);
  }

  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const StyledSelectItemTitle = styled.div`
  font-weight: 500;
  font-size: 20px;
  color: rgba(39, 47, 90, 0.9);
`;
