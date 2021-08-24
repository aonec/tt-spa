import { HousingStockAddress } from '01/features/individualDevices/addIndividualDevice/components/HousingStockAddress';
import { $individualDevice } from '01/features/individualDevices/displayIndividualDevice/models';
import { DeviceDataString } from '01/features/individualDevices/switchIndividualDevice/components/DeviceDataString';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Breadcrumb } from '01/tt-components';
import IsActive from '01/tt-components/IsActive';
import { HeaderWrap, Title } from '01/_components/Headers';
import { useStore } from 'effector-react';
import React from 'react';

export const ReadingHistoryHeader = () => {
  const device = useStore($individualDevice);
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
          <div style={{ marginTop: 5 }}>
            <Title>История показаний</Title>
            <Flex>
              <DeviceDataString />
              <Space />
              <IsActive clousingDate={device?.closingDate} />
              <Space />
              <HousingStockAddress />
            </Flex>
          </div>
        </div>
      </HeaderWrap>
    </>
  );
};
