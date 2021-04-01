import React, { useState } from 'react';
import { MoreOutlined } from '@ant-design/icons';
import styled, { css } from 'styled-components';
import { Title, Text, DropdownTT } from '.';
import MenuTT from './Menu';

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  align-items: baseline;
  ${(props) =>
    props.size == 12 &&
    css`
      font-size: 12px;
      line-height: 16px;
    `};
`;

export const Header = (props, state) => {
  const { apartmentNumber, city, street, number } = props;
  return (
    <HeaderWrap>
      <div className="apartment-header__wrap">
        <Title size="32">Кв. №{apartmentNumber}</Title>
        <Text>
          {city}, {street}, {number}
        </Text>
      </div>

      <div style={{ position: 'relative' }}></div>
    </HeaderWrap>
  );
};
