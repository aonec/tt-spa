import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import $ from 'jquery';
import {
  Icon, Loader, HeaderWrap, Title, Subtitle,
} from '01/_components';
import DeviceIcons from '01/_components/DeviceIcons';

import { DeviceContext } from '../DeviceProfile';
import {EditButton, Menu} from './EditButton'
export const Template = styled.div``;

export const List = styled.ul`
border:1px solid #DCDEE4;
    position: absolute;
    right: 0;
    width: max-content;
    z-index: 50;
    background: white;
    display: none;
`;

export const ListItem = styled.li`
font-size: 16px;
line-height: 32px;
padding:8px 24px;
cursor: pointer;
border-bottom: 1px solid #DCDEE4;
&:hover {
background: #189EE9;
color: #FFFFFF !important;
}
`;

export const Header = (loading = true) => {
  // const showPopupHandler = () => {
  //   console.log('showPopupHandler');
  //   const el = document.querySelector('ul');
  //   console.log($('ul'));
  //   $('ul').toggle();
  // };

  // const Menu = () => {
  //   console.log('showPopupHandler', showPopupHandler);
  //   return (
  //     <List>
  //       <ListItem onClick={() => { console.log('ListItem'); }}>Редактировать вычислитель 123</ListItem>
  //       <ListItem>Поверить вычислитель</ListItem>
  //       <ListItem onClick={showPopupHandler}>Выгрузить отчет о общедомовом потреблении</ListItem>
  //       <ListItem style={{ color: '#FC525B' }}>Снять вычислитель с учета</ListItem>
  //     </List>
  //   );
  // };

  const {
    device, building, loadings, errors, error,
  } = useContext(DeviceContext);

  const loadingDevice = _.get(loadings, 'device', true);
  const loadingBuilding = _.get(loadings, 'building', true);

  console.log('loadingDevice', loadingDevice);
  console.log('loadingBuilding', loadingBuilding);

  loading = loadingDevice || loadingBuilding;

  const { city, street, number } = building || {
    city: null,
    street: null,
    number: null,
  };
  const { model, serialNumber, resource } = device || {
    model: null,
    serialNumber: null,
    resource: null,
  };
  const { icon, color } = DeviceIcons[resource] || {
    icon: 'device',
    color: 'initial',
  };

  const buttonHandler = () => {
    console.log('loadings', loadings);
    console.log('error', error);
    console.log('errors', errors);
  };

  const errorOfComponent = _.get(error, 'resource', null);
  console.log('error', error);

  if (errorOfComponent) {
    return (
      <HeaderWrap>
        <Title>{error.text}</Title>
        <Subtitle>Обратитесь в тех.поддержку</Subtitle>
        <button onClick={buttonHandler}>button</button>
      </HeaderWrap>
    );
  }

  return (
    <HeaderWrap style={{
      display: 'flex',
      justifyContent: 'space-between',
    }}
    >
      <Loader show={loading} size="32">
        <div>
          <Title>
            <Icon
              icon={icon}
              color={color}
              size="24"
              style={{ marginRight: '8px' }}
            />
            {`${model} (${serialNumber})`}
          </Title>

          <Subtitle>{`${city}, ${street}, ${number}`}</Subtitle>
        </div>
        <div style={{ position: 'relative' }}>
          <Menu />
        </div>
      </Loader>

    </HeaderWrap>
  );
};

export default Header;
