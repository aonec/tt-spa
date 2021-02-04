import React, { useContext } from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import { Icon } from '../../../_components/Icon';
import { List, ListItem, EditButtonWrap } from './Styled-Components';
import { ObjectContext } from '../index';
import { NavLink, Link } from 'react-router-dom'

export const Template = styled.div``;

export const EditButton = () => {
  const menuShowHide = () => {
    $('#edit-button__list').toggle();
  };

  return (
    <EditButtonWrap onClick={menuShowHide} id="edit-button">
      <Icon icon="menu"/>
    </EditButtonWrap>
  );
};

export const Menu = (showPopupHandler) => {
  const { addCalculator, setAddCalculator, addOdpu, setAddOdpu, addNode, setAddNode } = useContext(ObjectContext);

  $(document).mouseup((e) => {
    const editButton = $('#edit-button');
    const editButtonList = $('#edit-button__list');
    if ((editButtonList.has(e.target).length === 0) && (editButton.has(e.target).length === 0)) {
      editButtonList.hide();
    }
  });

  const routeAddNode = () => {

    $('#edit-button__list').toggle();
  };

  const showAddCalculator = () => {
    setAddCalculator(true);
    $('#edit-button__list').toggle();
  };

  const showAddDevice = () => {
    setAddOdpu(true);
    $('#edit-button__list').toggle();
  };

  return (
    <>
      <EditButton/>
      <List id="edit-button__list">
        <ListItem>Редактировать дом</ListItem>
        <ListItem>Добавить квартиру</ListItem>
        <NavLink to="/objects/755/add_node"><ListItem>Добавить Узел</ListItem></NavLink>
        {/*<ListItem onClick={showAddCalculator}>Добавить вычислитель</ListItem>*/}
        <ListItem onClick={showAddDevice}>Добавить прибор учета</ListItem>

        <ListItem style={{ color: '#FC525B' }}>
          Удалить дом
        </ListItem>
      </List>
    </>
  );
};
