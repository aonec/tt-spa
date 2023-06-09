import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { useStore } from 'effector-react';
import React from 'react';
import styled from 'styled-components';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { SwitchIndividualDeviceGate } from '../models';
import { DeviceDataString } from './DeviceDataString';
import { HousingStockAddress } from './HousingStockAddress';

const headerTitles = {
  reopen: 'Переоткрытие прибора',
  switch: 'Замена прибора',
  check: 'Поверка прибора',
};

export const CreateIndividualDeviceFormHeader: React.FC = () => {
  const type = useStore(
    SwitchIndividualDeviceGate.state.map(({ type }) => type),
  );

  return (
    <Header>
      <div>
        <GoBack />
        <div>
          <Title>{headerTitles[type]}</Title>
          <Flex>
            <HousingStockAddress />
            <Space />
            <DeviceDataString />
          </Flex>
        </div>
      </div>
    </Header>
  );
};

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
