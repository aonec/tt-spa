import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import DeviceIcons from '01/_components/DeviceIcons';
import { Icon } from '01/_components/Icon';
import { DeviceContext } from '../DeviceProfile';

export const Template = styled.div``;

export const h = styled.div`
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
  const DeviceProfileContext = useContext(DeviceContext);

  const { city, street, number } = { ...DeviceProfileContext.building };
  const {
    model, serialNumber, type, resource,
  } = {
    ...DeviceProfileContext.device,
  };
  const { icon, color } = { ...DeviceIcons[resource] };
  const buttonHandler = () => {
    console.log(DeviceProfileContext);
  };

  return (
    <h>
      <Title>
        <Icon
          icon={icon}
          color={color}
          style={{ width: '24px', height: '24px', marginRight: '8px' }}
        />
        {model}
        &nbsp;(
        {serialNumber}
        )
      </Title>
      {/* <button onClick={buttonHandler}>button</button> */}
      <Subtitle>
        {city}
        ,
        {' '}
        {street}
        ,
        {' '}
        {number}
      </Subtitle>
    </h>
  );
};

export default Header;
