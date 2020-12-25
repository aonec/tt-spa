import React, { useContext } from 'react';
import $ from 'jquery';
import { useParams, NavLink } from 'react-router-dom';
import { Icon } from '../../../_components/Icon';
import styles from './styles.module.scss';
import { DeviceContext } from '../CalculatorProfile';
import { List, ListItem, EditButtonWrap} from '../../../tt-components/EditButton';


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
  const { deregister, setDeregister,report, setReport, setCheck } = useContext(DeviceContext);
  const { deviceId } = useParams();
  $(document).mouseup((e) => {
    const editButton = $('#edit-button');
    const editButtonList = $('#edit-button__list');
    if (
      editButtonList.has(e.target).length === 0
      && editButton.has(e.target).length === 0
    ) {
      editButtonList.hide();
    }
  });

  const reportDevice = () => {
    $('#edit-button__list').toggle();
    setReport(true)
  };

  const showCheckDevice = () => {
    $('#edit-button__list').toggle();
    setCheck(true)
  };

  const showDeregisterDeviceModal = () => {
    $('#edit-button__list').toggle();
    setDeregister(true)
  };

  return (
    <>
      <EditButton />
      <List id="edit-button__list">
        <NavLink className={styles.menu} to={`/calculators/${deviceId}/edit`}>
          <ListItem>Редактировать вычислитель</ListItem>
        </NavLink>
        <ListItem onClick={showCheckDevice}>Поверить вычислитель</ListItem>
        <ListItem onClick={reportDevice}>
          Выгрузить отчет о общедомовом потреблении
        </ListItem>
        <ListItem onClick={showDeregisterDeviceModal} style={{ color: '#FC525B' }}>
          Закрыть вычислитель
        </ListItem>
      </List>
    </>
  );
};
