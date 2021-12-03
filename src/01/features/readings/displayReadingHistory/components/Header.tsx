import { $apartment } from '01/features/apartments/displayApartment/models';
import { HousingStockAddress } from '01/features/individualDevices/addIndividualDevice/components/HousingStockAddress';
import { $individualDevice } from '01/features/individualDevices/displayIndividualDevice/models';
import { DeviceDataString } from '01/features/individualDevices/switchIndividualDevice/components/DeviceDataString';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Breadcrumb } from '01/tt-components';
import { IsActiveBool } from '01/tt-components/IsActive';
import { HeaderWrap, Title } from '01/_components/Headers';
import { useStore } from 'effector-react';
import React from 'react';

interface Props {
  isModal?: boolean;
}

export const ReadingHistoryHeader: React.FC<Props> = ({ isModal }) => {
  const device = useStore($individualDevice);
  const address = useApartmentAddressString();
  return (
    <>
      <HeaderWrap
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          {!isModal && <Breadcrumb />}
          <div style={{ marginTop: 5 }}>
            {!isModal && <Title>История показаний</Title>}
            <Flex>
              <DeviceDataString />
              <Space />
              <IsActiveBool active={device?.closingDate === null} />
              <Space />
              {address}
            </Flex>
          </div>
        </div>
      </HeaderWrap>
    </>
  );
};

export function useApartmentAddressString() {
  const apartment = useStore($apartment);

  return (
    apartment &&
    `ул. ${apartment.housingStock?.street}, д. ${apartment.housingStock?.number}${
      apartment.housingStock?.corpus || ''
    }, кв. ${apartment.apartmentNumber}`
  );
}
