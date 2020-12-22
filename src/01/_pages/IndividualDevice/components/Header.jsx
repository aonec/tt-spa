import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import {
  Icon, Loader, HeaderWrap, Title, Subtitle,
} from '01/_components';
import DeviceIcons from '01/_components/DeviceIcons';

import { DeviceContext } from '../index';

export const Template = styled.div``;

export const Header = () => {
  const { device, mistake } = useContext(DeviceContext);
  let loading = !device;
  const {address} = device


  if(mistake) {
    return (
      <HeaderWrap >
          <Title style={{color: 'red'}}>
            Данные не получены
          </Title>
          <Subtitle style={{color: 'red'}}>Обратитесь в тех.поддержку</Subtitle>
      </HeaderWrap>
    )
  }


  const { city, street, housingStockNumber } = address || { city: null, street: null, number: null };
  const { model, serialNumber, resource } = device || { model: null, serialNumber: null, resource: null };
  const { icon, color } = DeviceIcons[resource];

  return (
    <HeaderWrap>
      <Loader show={loading} size="32">
        <Title>
          <Icon
            icon={icon}
            color={color}
            size="24"
            style={{ marginRight: '8px' }}
          />
          {`${model} (${serialNumber})`}
        </Title>
        <Subtitle>{`${city}, ${street}, ${housingStockNumber}`}</Subtitle>
      </Loader>
    </HeaderWrap>
  );
};

export default Header;
