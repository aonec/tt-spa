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
import { getApartmentAddressString } from 'utils/getApartmentAddress';
import { getApartmentFromFullAddress } from 'utils/getApartmentFromFullAddress';

interface Props {
  isModal?: boolean;
}

export const ReadingHistoryHeader: React.FC<Props> = ({ isModal }) => {
  const device = useStore($individualDevice);

  const address = device && getApartmentFromFullAddress(device?.address);

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

export function useDeviceCheckingDates() {
  const device = useStore($individualDevice);

  return (
    device &&
    `${moment(device.lastCheckingDate).format('DD.MM.YYYY')} — ${moment(
      device.futureCheckingDate
    ).format('DD.MM.YYYY')}`
  );
}
