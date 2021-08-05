import { Breadcrumb } from '01/tt-components';
import { HeaderWrap, Title } from '01/_components/Headers';
import React from 'react';
import styled from 'styled-components';
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
          <Title>Добавление нового прибора</Title>
          <HousingStockAddress />
        </div>
      </div>
    </HeaderWrap>
  </>
);

export const FormHeader = styled.div`
  margin-bottom: 20px;
  font-size: 24px;
  line-height: 32px;
  color: #272f5a;
`;
