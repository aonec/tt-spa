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

const headerTitles = {
  reopen: 'Переоткрытие прибора',
  switch: 'Замена прибора',
  check: 'Поверка прибора',
};

export const CreateIndividualDeviceFormHeader: React.FC = () => {
  const type = useStore(
    SwitchIndividualDeviceGate.state.map(({ type }) => type)
  );

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
            <Title>{headerTitles[type]}</Title>
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
