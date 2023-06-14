import React from 'react';
import styled from 'styled-components';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { HousingStockAddress } from './HousingStockAddress';

export const CreateIndividualDeviceFormHeader: React.FC = () => (
  <>
    <Header>
      <div>
        <GoBack />
        <div>
          <Title>Добавление нового прибора</Title>
          <HousingStockAddress />
        </div>
      </div>
    </Header>
  </>
);

export const FormHeader = styled.div`
  margin-bottom: 20px;
  font-size: 24px;
  line-height: 32px;
  color: #272f5a;
`;

const Header = styled.div`
  margin-bottom: 10px;
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  padding: 0;
  margin-top: 16px;
  font-weight: 300;
  font-size: 32px;
  line-height: 48px;
`;
