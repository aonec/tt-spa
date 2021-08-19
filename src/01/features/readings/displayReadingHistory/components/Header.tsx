import { HousingStockAddress } from '01/features/individualDevices/addIndividualDevice/components/HousingStockAddress';
import { DeviceDataString } from '01/features/individualDevices/switchIndividualDevice/components/DeviceDataString';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Breadcrumb } from '01/tt-components';
import { HeaderWrap, Title } from '01/_components/Headers';
import React from 'react';

export const ReadingHistoryHeader = () => {
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
            <Title>История показаний</Title>
            <Flex>
              <DeviceDataString />
              <Space />
              <HousingStockAddress />
            </Flex>
          </div>
        </div>
      </HeaderWrap>
    </>
  );
};
