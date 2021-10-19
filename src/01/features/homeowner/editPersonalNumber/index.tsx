import { ModalTT } from '01/shared/ui/ModalTT';
import React from 'react';
import { useStore } from 'effector-react';
import { $isSelectEditPersonalNumberTypeModalOpen } from './models';
import { ReactNode } from 'react-router/node_modules/@types/react';
import styled from 'styled-components';

export const SelectEditPersonalNumberTypeModal: React.FC = () => {
  const isOpen = useStore($isSelectEditPersonalNumberTypeModalOpen);

  const selects: SelectItem[] = [];

  const renderSelectItem = ({ title, icon, action }: SelectItem) => (
    <StyledSelectItem onClick={action}>
      {icon}
      <StyledSelectItemTitle>{title}</StyledSelectItemTitle>
    </StyledSelectItem>
  );

  return (
    <ModalTT visible={isOpen} title="Выберите действие" >
      {selects.map(renderSelectItem)}
    </ModalTT>
  );
};

interface SelectItem {
  title: string;
  icon: ReactNode;
  action(): void;
}

const StyledSelectItem = styled.div`
  border: 1px solid rgba(220, 222, 228, 1);
  border-radius: 15px;

  display: flex;
  align-items: center;
  padding: 15px;

  transition: 0.2s;

  &:hover {
    border: 1px solid rgba(24, 158, 233, 1);
    box-shadow: 0 4px 8px rgba(24, 158, 233, 0, 32);
  }
`;

const StyledSelectItemTitle = styled.div``;
