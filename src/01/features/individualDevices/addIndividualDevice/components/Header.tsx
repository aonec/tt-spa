import React from 'react';
import styled from 'styled-components';
import { GoBack } from '../../../../../ui-kit/shared_components/GoBack';
import { HeaderWrap, Title } from '../../../../_components/Headers';
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
        <GoBack />
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
