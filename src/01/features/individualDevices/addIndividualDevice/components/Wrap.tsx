import React from 'react';
import { Breadcrumb, HeaderWrap } from '01/tt-components';
import Title from '01/tt-components/Title';
import { HousingStockAddress } from './HousingStockAddress';

export const WrapCreateIndividualDeviceForm: React.FC = ({ children }) => (
  <HeaderWrap
    style={{
      display: 'flex',
      justifyContent: 'space-between',
    }}
  >
    <div>
      <Breadcrumb />
      <div>
        <Title>Добавление нового узла</Title>
        <HousingStockAddress />
      </div>
    </div>
  </HeaderWrap>
);
