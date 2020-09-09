import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import {
  Icon, Loader, HeaderWrap, Title, Subtitle,
} from '01/_components';
import DeviceIcons from '01/_components/DeviceIcons';

import { DeviceContext } from '../DeviceProfile';

export const Template = styled.div``;

export const Header = (loading = true) => {
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

        <Subtitle>{`${city}, ${street}, ${number}`}</Subtitle>
      </Loader>
      <button onClick={buttonHandler}>button</button>
    </HeaderWrap>
  );
};

export default Header;
