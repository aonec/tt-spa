import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import {
  Icon, Loader, HeaderWrap, Title, Subtitle,
} from '01/_components';
import DeviceIcons from '01/_components/DeviceIcons';

import { DeviceContext } from '../IndividualDevice';

export const Template = styled.div``;

export const Header = (loading = true) => {
  const { device, building, mistake } = useContext(DeviceContext);
  loading = !(device && building);

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

  const buttonHandler = () => {
    console.log(device, building);
  };

  const { city, street, number } = building || { city: null, street: null, number: null };
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
        {/* <button onClick={buttonHandler}>button</button> */}
        <Subtitle>{`${city}, ${street}, ${number}`}</Subtitle>
      </Loader>
    </HeaderWrap>
  );
};

export default Header;
