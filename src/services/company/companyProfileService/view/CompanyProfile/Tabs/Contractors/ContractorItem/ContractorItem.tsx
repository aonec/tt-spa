import React, { FC } from 'react';
import { Contacts, Wrapper } from './ContractorItem.styled';
import { ContractorItemProps } from './ContractorItem.types';
import { MenuButtonTT, Name } from '01/tt-components';

export const ContractorItem: FC<ContractorItemProps> = ({ contractor }) => {
  return (
    <Wrapper key={contractor.id}>
      <Name>{contractor.name || 'Не указано'}</Name>
      <Contacts>{contractor.email || 'Не указано'}</Contacts>
      <Contacts>{contractor.cellphone || 'Не указано'}</Contacts>
      <MenuButtonTT
        menuButtonArr={[
          {
            title: 'Редактировать информацию о подрядчике',
            cb: () => {},
            show: true,
            color: 'default',
            clickable: true,
          },
          {
            title: 'Удалить подрячика',
            cb: () => {},
            show: true,
            color: 'red',
            clickable: true,
          },
        ]}
      />
    </Wrapper>
  );
};
