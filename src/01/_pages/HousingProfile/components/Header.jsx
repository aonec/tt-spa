import React, { useContext } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import {
  Icon, Loader, HeaderWrap, Title, Subtitle,
} from '01/_components';
import DeviceIcons from '01/_components/DeviceIcons';
import { Menu } from './EditButton';
import { HousingContext } from '../HousingProfile';
import { DEFAULT_BUILDING, DEFAULT_DEVICE, DEFAULT_ICON } from './Templates';

export const Header = () => {
  const { device,  loadings, errors, error } = useContext( HousingContext );
  const loadingDevice = _.get(loadings, 'device', true);
  const loading = loadingDevice;
  const { address, model, serialNumber, resource } = device || DEFAULT_DEVICE;
  const {
    city, street, housingStockNumber, corpus, id,
  } = address || DEFAULT_BUILDING;
  const { icon, color } = DeviceIcons[resource] || DEFAULT_ICON;
  const errorOfComponent = _.get(error, 'resource', null);

  if (errorOfComponent) {
    return (
      <HeaderWrap>
        <Title>{error.text}</Title>
        <Subtitle>Обратитесь в тех.поддержку</Subtitle>
      </HeaderWrap>
    );
  }

  return (
    <HeaderWrap
      style={{
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

          <Subtitle to={`/objects/${id}`}>{`${city}, ${street}, ${housingStockNumber}${corpus ? `, к.${corpus}` : ''}`}</Subtitle>
        </div>
        <div style={{ position: 'relative' }}>
          <Menu />
        </div>
      </Loader>
    </HeaderWrap>
  );
};

export default Header;
