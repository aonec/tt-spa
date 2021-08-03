import { Breadcrumb } from '01/tt-components';
import { HeaderWrap, Title } from '01/_components/Headers';
import React from 'react';
import { HousingStockAddress } from './HousingStockAddress';

export const CreateIndividualDeviceFormHeader: React.FC = () => (
  <>
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
  </>
);
