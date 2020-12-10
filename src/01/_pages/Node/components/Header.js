import React, { useContext } from 'react';
import {
  Icon, Loader, HeaderWrap, Title, Subtitle,
} from '01/_components';
import Breadcrumb from '../../../tt-components/Breadcrumb/Breadcrumb';
import { NodeContext } from '../index';

export const Header = () => {
  const { node } = useContext(NodeContext);
  const {
    model, serialNumber, resource, address,
  } = node;
  const {
    id, city, street, housingStockNumber, corpus,
  } = address;

  const buttonHandler = () => {
    console.log('buttonHandler');
  };

  if (!node) {
    return (
      <Loader show size="32" />
    );
  }

  return (
    <HeaderWrap style={{
      display: 'flex',
      justifyContent: 'space-between',
    }}
    >
      <div>
        <Breadcrumb path="/node" />
        <Title>{`${model || 'Узел 4'}`}</Title>
        <Subtitle to={`/objects/${id}`}>{`${city}, ${street}, ${housingStockNumber}${corpus ? `, к.${corpus}` : ''}`}</Subtitle>
      </div>
      <div style={{ position: 'relative' }} />
    </HeaderWrap>
  );
};

export default Header;
