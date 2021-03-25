import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import {
  useHistory,
  useRouteMatch,
  useParams,
  NavLink,
  useLocation,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../../_components/Icon';
import styles from './styles.module.scss';
import {
  setModalCalcReportVisible,
  setModalDeregisterVisible,
  setModalTemplateVisible,
  setModalCalculatorReportVisible,
} from '../../../Redux/actions/actions';

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
    $('#edit-button__list').toggle();
  };

  return (
    <EditButtonWrap onClick={menuShowHide} id="edit-button">
      <Icon icon="menu" />
    </EditButtonWrap>
  );
};

export const Menu = (showPopupHandler) => {
  const { pathname } = useLocation();
  const { deviceId } = useParams();
  const dispatch = useDispatch();
  $(document).mouseup((e) => {
    const editButton = $('#edit-button');
    const editButtonList = $('#edit-button__list');
    if (
      editButtonList.has(e.target).length === 0 &&
      editButton.has(e.target).length === 0
    ) {
      editButtonList.hide();
    }
  });

  const showDeregisterDeviceModal = () => {
    $('#edit-button__list').toggle();
    dispatch(setModalDeregisterVisible(true));
  };

  const showModalCalculatorReport = () => {
    $('#edit-button__list').toggle();
    dispatch(setModalCalculatorReportVisible(true));
  };

  return (
    <>
      <EditButton />
      <List id="edit-button__list">
        {/* <NavLink className={styles.menu} to={`/objects/${objid}/devices/${deviceId}/edit`}> */}
        <NavLink className={styles.menu} to={`/calculators/${deviceId}/edit`}>
          <ListItem>Редактировать вычислитель</ListItem>
        </NavLink>
        <ListItem>Поверить вычислитель</ListItem>
        <ListItem onClick={showModalCalculatorReport}>
          Выгрузить отчет о общедомовом потреблении
        </ListItem>
        <ListItem
          onClick={showDeregisterDeviceModal}
          style={{ color: '#FC525B' }}
        >
          Снять вычислитель с учета
        </ListItem>
      </List>
    </>
  );
};
