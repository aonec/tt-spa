import { useStore } from 'effector-react';
import React from 'react';
import styled from 'styled-components';
import { GoBack } from '../../../../../ui-kit/shared_components/GoBack';
import { Flex } from '../../../../shared/ui/Layout/Flex';
import { Space } from '../../../../shared/ui/Layout/Space/Space';
import { HeaderWrap, Title } from '../../../../_components/Headers';
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
