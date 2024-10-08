import React, { FC } from 'react';
import { Contacts, Name, Wrapper } from './ContractorItem.styled';
import { ContractorItemProps } from './ContractorItem.types';
import { usePhoneMask } from 'hooks/usePhoneMask';
import { ContextMenuButton } from 'ui-kit/ContextMenuButton/ContextMenuButton';
import { ContextMenuButtonColor } from 'ui-kit/ContextMenuButton/ContextMenuButton.types';

export const ContractorItem: FC<ContractorItemProps> = ({
  contractor,
  catchContractorId,
  handleOpenEditContractorModal,
  catchContractorData,
}) => {
  const phone = usePhoneMask();

  return (
    <Wrapper key={contractor.id}>
      <Name>{contractor.name || 'Не указано'}</Name>
      <Contacts>{contractor.email || 'Не указано'}</Contacts>
      <Contacts>
        {(contractor.cellphone && phone.maskValue(contractor.cellphone)) ||
          'Не указано'}
      </Contacts>
      <ContextMenuButton
        size="small"
        menuButtons={[
          {
            title: 'Редактировать информацию о подрядчике',
            onClick: () => {
              catchContractorData({
                id: contractor.id,
                name: contractor.name,
                email: contractor.email,
                cellphone: contractor.cellphone,
              });
              handleOpenEditContractorModal();
            },
          },
          {
            title: 'Удалить подрячика',
            onClick: () => {
              catchContractorId({ id: contractor.id, name: contractor.name });
            },
            color: ContextMenuButtonColor.danger,
          },
        ]}
      />
    </Wrapper>
  );
};
