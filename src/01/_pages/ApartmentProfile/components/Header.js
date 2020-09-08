import React, { useState } from 'react';
import { MoreOutlined } from '@ant-design/icons';
import styled, { css } from 'styled-components';
import { Title, Text, EditButton } from '.';
// .visible {
//   display: block !important;
//   z-index: 2;
// }
const PopupList = styled.ul`
  position: absolute;
  right: 0;
  filter: drop-shadow(0px 4px 4px rgba(78, 93, 146, 0.16)),
  drop-shadow(0px 8px 16px rgba(78, 93, 146, 0.08));
  border: 1px solid #000000;
  background: #ffffff;
  width: 460px;
  z-index: 2;
  display: none;
  ${(props) => (props.visible == true
    && css`
        display: block;
      `)
  || (props.visible == false
    && css`
        display: none;
      `)};
`;

const PopupElemWrap = styled.li`
  //some styles
`;

const PopupElem = styled.a`
  font-size: 16px;
  line-height: 32px;
  padding: 8px 24px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dcdee4;
  color: rgba(39, 47, 90, 0.8);
  ${(props) => (props.description
    && css`
        font-size: 24px;
        line-height: 48px;
      `)
  || (props.value
    && css`
        font-size: 32px;
        line-height: 48px;
      `)};
`;

const Popup = () => {
  const [state, setState] = useState(false);
  return (
    <PopupList className="editPopup">
      <PopupElemWrap>
        <PopupElem>Редактировать квартиру</PopupElem>
      </PopupElemWrap>
      <PopupElemWrap>
        <PopupElem>Добавить собственника</PopupElem>
      </PopupElemWrap>
      <PopupElemWrap>
        <PopupElem>Добавить прибор учета</PopupElem>
      </PopupElemWrap>
      <PopupElemWrap>
        <PopupElem>Удалить квартиру</PopupElem>
      </PopupElemWrap>
    </PopupList>
  );
};

const editButtonHandler = (event, state) => {
  const a = document.querySelector('.editPopup');
  a.classList.toggle('visible');
};

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  align-items: baseline;
  ${(props) => props.size == 12
  && css`
      font-size: 12px;
      line-height: 16px;
    `};
`;

export const Header = (props, state) => {
  const {
    apartmentNumber, city, street, number,
  } = props;
  return (
    <HeaderWrap>
      <div className="apartment-header__wrap">
        <Title size="32">
          Кв. №
          {apartmentNumber}
        </Title>
        <Text>
          {city}
          ,
          {street}
          ,
          {number}
        </Text>
      </div>

      <div style={{ position: 'relative' }}>
        {/* <EditButton onClick={(event) => { editButtonHandler(event) }}><MoreOutlined /></EditButton> */}
        <EditButton onClick={editButtonHandler}>
          <MoreOutlined />
        </EditButton>
        <Popup visible="false" />
      </div>
    </HeaderWrap>
  );
};
