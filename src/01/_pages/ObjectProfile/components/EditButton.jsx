import React, { useContext } from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import { Icon } from '../../../_components/Icon';
import { List, ListItem, EditButtonWrap } from './Styled-Components';
import { ObjectContext } from '../index';

export const Template = styled.div``;

export const EditButton = () => {
  const menuShowHide = () => {
    $('#edit-button__list').toggle();
  };

  return (
    <EditButtonWrap onClick={menuShowHide} id="edit-button">
      <Icon icon="menu" />
    </EditButtonWrap>
  );
};

export const Menu = (showPopupHandler) => {
  const { addCalculator, setAddCalculator } = useContext(ObjectContext);

  $(document).mouseup((e) => {
    const editButton = $('#edit-button');
    const editButtonList = $('#edit-button__list');
    if ((editButtonList.has(e.target).length === 0) && (editButton.has(e.target).length === 0)) {
      editButtonList.hide();
    }
  });

  const showAddCalculator = () => {
    setAddCalculator(true);
    $('#edit-button__list').toggle();
  };

  const showAddDevice = () => {
    $('#add-device').toggle();
    $('#edit-button__list').toggle();
  };

  return (
    <>
      <EditButton />
      <List id="edit-button__list">
        <ListItem>Редактировать дом</ListItem>
        <ListItem>Добавить квартиру</ListItem>
        <ListItem onClick={showAddCalculator}>Добавить вычислитель</ListItem>
        <ListItem onClick={showAddDevice}>Добавить прибор учета</ListItem>

        <ListItem style={{ color: '#FC525B' }}>
          Удалить дом
        </ListItem>
      </List>
    </>
  );
};
