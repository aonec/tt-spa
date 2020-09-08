import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import {
  Icon, Loader, HeaderWrap, Title, Subtitle,
} from '01/_components';
import DeviceIcons from '01/_components/DeviceIcons';

import { DeviceContext } from '../IndividualDevice';

export const Template = styled.div``;

export const Header = () => {
  // const DeviceProfileContext = useContext(DeviceContext);
  const { device, building } = useContext(DeviceContext);

  const loading = !(device && building);

  const buttonHandler = () => {
    console.log(device, building);
  };

  // сначала получаем объекты с данными
  if (device && building) {
    const { city, street, number } = building || {};
    const { model, serialNumber, resource } = device || {};
    const { icon, color } = DeviceIcons[resource];

    return (
      <HeaderWrap>
        <Title>
          <Icon
            icon={icon}
            color={color}
            size="24"
            style={{ marginRight: '8px' }}
          />
          {`${model} (${serialNumber})`}
        </Title>
        {/* <button onClick={buttonHandler}>button</button> */}
        <Subtitle>{`${city}, ${street}, ${number}`}</Subtitle>
      </HeaderWrap>
    );
  }
  // пока не получили данные - показываем Loader

  return <Loader show={loading} size="32" />;
};

export default Header;
