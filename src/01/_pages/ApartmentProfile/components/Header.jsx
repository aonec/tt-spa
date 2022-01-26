import React from 'react';
import styled from 'styled-components';
import { Title } from './Title';
import { Text } from './Text';
import { MenuButtonTT } from '../../../tt-components';
import { openCheckApartmentModal } from '01/features/apartments/checkApartment/models';
import { useStore } from 'effector-react';
import {
  $apartmentEditMode,
  switchApartmentEditMode,
} from '01/features/apartments/displayApartment/models';

export const Header = ({ apartmentNumber, city, street, number }) => {
  const isEditMode = useStore($apartmentEditMode);

  return (
    <HeaderWrap>
      <div className="apartment-header__wrap">
        <Title size="32">Кв. №{apartmentNumber}</Title>
        <Text>
          {city}, {street}, {number}
        </Text>
      </div>
      <MenuButtonTT
        menuButtonArr={[
          // {
          //   title: isEditMode ? 'Отменить редактирование' : 'Редактировать',
          //   show: true,
          //   cb: switchApartmentEditMode,
          // },
          {
            title: 'Создать проверку',
            show: true,
            cb: openCheckApartmentModal,
          },
        ]}
      />
    </HeaderWrap>
  );
};

export default Header;
const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  align-items: baseline;
`;
