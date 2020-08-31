import React from 'react';
import styled from 'styled-components';
import { Icon } from '../../../../_components/Icon';

const Wrap = styled.a`
  display: grid;
`;

const Top = styled.div`
  display: flex;
  align-items: baseline;
  height: fit-content;
`;
const Bottom = styled.div`
  display: flex;
  align-items: center;
`;
const Name = styled.div`
  padding: 0;
  margin: 0;
  padding-left: 8px;
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
`;
const Number = styled.div`
  padding: 0;
  margin: 0;
  padding-left: 8px;
  font-size: 14px;
  line-height: 16px;
  color: rgba(39, 47, 90, 0.6);
`;

const State = styled.div`
  padding: 0;
  margin: 0;
  padding-left: 8px;
  font-size: 14px;
  line-height: 16px;
  color: rgba(39, 47, 90, 0.8);
`;
const Dates = styled.div`
  padding: 0;
  margin: 0;
  padding-left: 8px;
  font-size: 14px;
  line-height: 16px;
  color: rgba(39, 47, 90, 0.6);
`;

const Place = styled.div`
  padding: 0;
  margin: 0;
  padding-left: 8px;
  font-size: 14px;
  line-height: 16px;
  color: rgba(39, 47, 90, 0.6);
`;

function ApartmentDevice(props) {
  const {
    model, serialNumber, resource, futureCheckingDate, creationDate,
  } = {
    ...props,
  };

  const DevicesIcons = {
    HotWaterSupply: { icon: 'water', color: '#FF8C68' },
    ColdWaterSupply: { icon: 'water', color: '#79AFFF' },
    Electricity: { icon: 'electro', color: '#E2B104' },
  };

  let currentIcon = {};

  for (const key in DevicesIcons) {
    if (key == resource) {
      currentIcon = JSON.parse(JSON.stringify(DevicesIcons[key]));
    }
  }

  const { icon, color } = { ...currentIcon };

  const buttonHandler = () => {
    // console.log('buttonHandler');
  };

  return (
    <Wrap onClick={buttonHandler}>
      <Top>
        <Icon icon={icon} color={color} />
        <Name>{model}</Name>
        <Number>{serialNumber}</Number>
      </Top>
      <Bottom>
        <Icon icon="circle" color="#17B45A" />
        <State>Активен</State>
        <Dates>
          {creationDate}
          {' — '}
          {futureCheckingDate}
        </Dates>
        <Place>Туалет</Place>
      </Bottom>
    </Wrap>
  );
}

export default ApartmentDevice;
