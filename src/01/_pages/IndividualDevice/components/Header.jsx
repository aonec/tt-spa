import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import DeviceIcons from '01/_components/DeviceIcons';
import { Icon } from '01/_components/Icon';
import { Loader } from '01/components';
import { DeviceContext } from '../IndividualDevice';

export const Template = styled.div``;

export const HeaderWrap = styled.div`
  display: grid;
  grid-template-rows: 48px 16px;
  grid-gap: 8px;
  align-items: center;
`;

export const Title = styled.h2`
  padding: 0;
  margin: 0;
  font-weight: 300;
  font-size: 32px;
  line-height: 48px;
`;

export const Subtitle = styled.p`
  padding: 0;
  margin: 0;
  opacity: 0.8;
`;

export const Header = ({ list = [], loading = true, ...props }) => {
  // const DeviceProfileContext = useContext(DeviceContext);
  const { device, building } = useContext(DeviceContext);

  const buttonHandler = () => {
    console.log(device, building);
  };

  // сначала получаем объекты с данными
  if (device && building) {
    const { city, street, number } = building;
    const { model, serialNumber, resource } = device;
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

  return <Loader show size="32" />;
};

export default Header;
