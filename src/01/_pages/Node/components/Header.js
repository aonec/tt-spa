import React, { useContext } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import {
  Icon, Loader, HeaderWrap, Title, Subtitle,
} from '01/_components';
import DeviceIcons from '01/_components/DeviceIcons';
import { DEFAULT_BUILDING, DEFAULT_DEVICE, DEFAULT_ICON } from '../../../tt-components/localBases';
import Breadcrumb from '../../../tt-components/Breadcrumb/Breadcrumb';

export const Header = () => {


  const {
    city, street, housingStockNumber, corpus, id
  } = DEFAULT_BUILDING;
  const { model, serialNumber, resource } = DEFAULT_DEVICE;
  const { icon, color } =  DEFAULT_ICON;

  const buttonHandler = () => {
    console.log('building', DEFAULT_BUILDING);
    console.log('device', DEFAULT_DEVICE);
  };


  // if (errorOfComponent) {
  //   return (
  //     <HeaderWrap>
  //       <Title>{error.text}</Title>
  //       <Subtitle>Обратитесь в тех.поддержку</Subtitle>
  //     </HeaderWrap>
  //   );
  // }

  return (
    <HeaderWrap
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Loader show={false} size="32">
        <div>
          <Breadcrumb path={`/node`} />
          <Title>{`${model || 'Узел 4'}`}</Title>
          <Subtitle to={`/objects/${id}`}>{`${city}, ${street}, ${housingStockNumber}${corpus ? `, к.${corpus}` : ''}`}</Subtitle>
        </div>
        <div style={{ position: 'relative' }}>
        </div>
      </Loader>
    </HeaderWrap>
  );
};

export default Header;
