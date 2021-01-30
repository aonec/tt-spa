import React, { useContext } from 'react';
import { HeaderWrap, Title, Subtitle } from '01/_components';
import {Icon} from '01/tt-components;
import Breadcrumb from '../../../tt-components/Breadcrumb/Breadcrumb';
import { NodeContext } from '../index';


export const Header = () => {
  const { node, calculator } = useContext(NodeContext);
  // const {
  //   model, serialNumber, resource, address,
  // } = node;

  // const {
  //   model, serialNumber, resource, address,
  // } = calculator;

  // const {
  //   id, city, street, housingStockNumber, corpus,
  // } = address;
  // console.log("calculator", calculator)

  const { id, nodeResourceType } = node;
  const {
    model, serialNumber, resource, address,
  } = calculator;

  return (
    <HeaderWrap style={{
      display: 'flex',
      justifyContent: 'space-between',
    }}
    >
      <div>
        <Breadcrumb path="/nodes"/>
        <Title><Icon icon={nodeResourceType} />{`Узел ${id}`}</Title>
        {/*<Subtitle to={` / objects /${id}`}>{`${city}, ${street}, ${housingStockNumber}${corpus ? `, к.${corpus}` : ''}`}</Subtitle>*/}
      </div>
      <div style={{ position: 'relative' }}/>
    </HeaderWrap>
  );
};

export default Header;
