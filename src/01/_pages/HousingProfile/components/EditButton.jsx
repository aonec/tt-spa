import React, { useContext } from 'react';
import $ from 'jquery';
import { useParams, NavLink} from 'react-router-dom';
import { Icon } from '../../../_components/Icon';
import styles from './styles.module.scss';
import { List , ListItem , EditButtonWrap} from '../../../tt-components/EditButton'
import { HousingContext } from '../HousingProfile';

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

export const Menu = () => {
  const { deviceId } = useParams();
  const {deregister, setDeregister} = useContext(HousingContext)

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
    $('#modal-report-device').toggle();
    $('#edit-button__list').toggle();
  };

  const showDeregisterDeviceModal = () => {
    $('#edit-button__list').toggle();
    setDeregister(true)
  };

  return (
    <>
      <EditButton />
      <List id="edit-button__list">
        <NavLink className={styles.menu} to={`/housingMeteringDevices/${deviceId}/edit_odpu`}>
          <ListItem>
            Редактировать ОДПУ
          </ListItem>
        </NavLink>
        <ListItem>Поверить вычислитель</ListItem>
        <ListItem onClick={reportDevice}>
          Выгрузить отчет о общедомовом потреблении
        </ListItem>
        <ListItem onClick={showDeregisterDeviceModal} style={{ color: '#FC525B' }}>
          Снять ОДПУ с учета
        </ListItem>
      </List>
    </>
  );
};
