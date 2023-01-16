import React, { FC } from 'react';
import { Wrapper } from './ContractorItem.styled';
import { ContractorItemProps } from './ContractorItem.types';
import { MenuButtonTT } from '01/tt-components';

export const ContractorItem: FC<ContractorItemProps> = ({}) => {
  return (
    <Wrapper key={''}>
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
