import React, { useContext } from 'react';
import { HeaderWrap, Title, Subtitle } from '01/_components';
import Breadcrumb from '../../../tt-components/Breadcrumb/Breadcrumb';
import { NodeContext } from '../index';

export const Header = () => {
  const { node, calculator } = useContext(NodeContext);
  // const {
  //   model, serialNumber, resource, address,
  // } = node;

  const {
    model, serialNumber, resource, address,
  } = calculator;

  const {
    id, city, street, housingStockNumber, corpus,
  } = address;

  return (
    <HeaderWrap style={{
      display: 'flex',
      justifyContent: 'space-between',
    }}
    >
      <div>
        <Breadcrumb path="/nodes" />
        <Title>{`${model || 'Узел 4'} ${serialNumber}`}</Title>
        <Subtitle to={`/objects/${id}`}>{`${city}, ${street}, ${housingStockNumber}${corpus ? `, к.${corpus}` : ''}`}</Subtitle>
      </div>
      <div style={{ position: 'relative' }} />
    </HeaderWrap>
  );
};

export default Header;
