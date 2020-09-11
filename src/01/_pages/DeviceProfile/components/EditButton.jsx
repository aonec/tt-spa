import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import { Icon } from '../../../_components/Icon';

export const Template = styled.div``;

export const EditButtonTemplate = styled.button`
  border: 1px solid #dcdee4;
  box-sizing: border-box;
  border-radius: 4px;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const List = styled.ul`
  border: 1px solid #dcdee4;
  position: absolute;
  right: 0;
  width: max-content;
  z-index: 1;
  background: white;
  display: none;
`;

export const ListItem = styled.li`
  font-size: 16px;
  line-height: 32px;
  padding: 8px 24px;
  cursor: pointer;
  border-bottom: 1px solid #dcdee4;
  &:hover {
    background: #189ee9;
    color: #ffffff !important;
  }
`;

export const EditButtonWrap = styled.button`
border: 1px solid #DCDEE4;
box-sizing: border-box;
border-radius: 4px;
width: 48px;
height: 48px;
display: flex;
justify-content: center;
align-items: center;
}
`;

export const EditButton = () => {
  const menuShowHide = () => {
    const el = document.querySelector('ul');
    $('ul').toggle();
  };
  return (
    <EditButtonWrap onClick={menuShowHide}>
      <Icon icon="menu" />
    </EditButtonWrap>
  );
};

export const Menu = (showPopupHandler) => {
  const showModal = () => {
    $('.overlay').toggle();
    $('ul').toggle();
  };

  return (
    <>
      <EditButton />
      <List>
        <ListItem>Редактировать вычислитель</ListItem>
        <ListItem>Поверить вычислитель</ListItem>
        <ListItem onClick={showModal}>
          Выгрузить отчет о общедомовом потреблении
        </ListItem>
        <ListItem style={{ color: '#FC525B' }}>
          Снять вычислитель с учета
        </ListItem>
      </List>
    </>
  );
};
