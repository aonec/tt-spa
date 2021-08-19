import { ApartmentGate } from '01/features/apartments/displayApartment/models';
import { HousingStockAddress } from '01/features/individualDevices/addIndividualDevice/components/HousingStockAddress';
import { IndividualDeviceGate } from '01/features/individualDevices/displayIndividualDevice/models';
import { DeviceDataString } from '01/features/individualDevices/switchIndividualDevice/components/DeviceDataString';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Breadcrumb } from '01/tt-components';
import { HeaderWrap, Title } from '01/_components/Headers';
import React from 'react';
import { useParams } from 'react-router-dom';

export const ReadingHistoryHeader = () => {
  const { deviceId, id } = useParams<{ id: string; deviceId: string }>();

  return (
    <>
      <IndividualDeviceGate id={deviceId as any} />
      <ApartmentGate id={id as any} />
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
