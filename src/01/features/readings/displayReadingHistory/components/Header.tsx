import { $apartment } from '01/features/apartments/displayApartment/models';
import { HousingStockAddress } from '01/features/individualDevices/addIndividualDevice/components/HousingStockAddress';
import { $individualDevice } from '01/features/individualDevices/displayIndividualDevice/models';
import { DeviceDataString } from '01/features/individualDevices/switchIndividualDevice/components/DeviceDataString';
import { Space, Spaces } from '01/shared/ui/Layout/Space/Space';
import { IsActiveBool } from '01/tt-components/IsActive';
import { HeaderWrap, Title } from '01/_components/Headers';
import { useStore } from 'effector-react';
import moment from 'moment';
import React from 'react';
import { GoBack } from 'ui-kit/shared_components/GoBack';

interface Props {
  isModal?: boolean;
}

export const ReadingHistoryHeader: React.FC<Props> = ({ isModal }) => {
  const device = useStore($individualDevice);
  
  const address = useApartmentAddressString();

  const checkingDates = useDeviceCheckingDates();

  return (
    <>
      <HeaderWrap
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          {!isModal && <GoBack />}
          <div style={{ marginTop: 5 }}>
            {!isModal && <Title>История показаний</Title>}
            <Spaces flex>
              {[
                <DeviceDataString />,
                <IsActiveBool active={device?.closingDate === null} />,
                address,
                <b>{checkingDates}</b>,
              ]}
            </Spaces>
          </div>
        </div>
      </HeaderWrap>
    </>
  );
};

export function useApartmentAddressString() {
  const apartment = useStore($apartment);

  const address = apartment?.housingStock?.address?.mainAddress

  return (
    apartment &&
    `ул. ${address?.street}, д. ${
      address?.number
    }${address?.corpus || ''}, кв. ${apartment.apartmentNumber}`
  );
}

export function useDeviceCheckingDates() {
  const device = useStore($individualDevice);

  return (
    device &&
    `${moment(device.lastCheckingDate).format('DD.MM.YYYY')} — ${moment(
      device.futureCheckingDate
    ).format('DD.MM.YYYY')}`
  );
}
