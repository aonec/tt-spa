import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Breadcrumb } from '01/tt-components';
import { HeaderWrap, Title } from '01/_components/Headers';
import { useStore } from 'effector-react';
import React from 'react';
import styled from 'styled-components';
import { SwitchIndividualDeviceGate } from '../models';
import { DeviceDataString } from './DeviceDataString';
import { HousingStockAddress } from './HousingStockAddress';

export const CreateIndividualDeviceFormHeader: React.FC = () => {
  const { check } = useStore(SwitchIndividualDeviceGate.state);

  return (
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
            <Title>{check ? 'Поверка прибора' : 'Замена прибора'}</Title>
            <Flex>
              <HousingStockAddress />
              <Space />
              <DeviceDataString />
            </Flex>
          </div>
        </div>
      </HeaderWrap>
    </>
  );
};

export const FormHeader = styled.div`
  margin-bottom: 20px;
  font-size: 24px;
  line-height: 32px;
  color: #272f5a;
`;
