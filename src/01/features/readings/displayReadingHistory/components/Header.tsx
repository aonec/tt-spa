import { useStore } from 'effector-react';
import moment from 'moment';
import React from 'react';
import { GoBack } from '../../../../../ui-kit/shared_components/GoBack';
import { getApartmentFromFullAddress } from '../../../../../utils/getApartmentFromFullAddress';
import { Spaces } from '../../../../shared/ui/Layout/Space/Space';
import { IsActiveBool } from '../../../../tt-components/IsActive';
import { HeaderWrap, Title } from '../../../../_components/Headers';
import { $individualDevice } from '../../../individualDevices/displayIndividualDevice/models';
import { DeviceDataString } from '../../../individualDevices/switchIndividualDevice/components/DeviceDataString';

interface Props {
  isModal?: boolean;
}

export const ReadingHistoryHeader: React.FC<Props> = ({ isModal }) => {
  const device = useStore($individualDevice);

  const address = getApartmentFromFullAddress(device?.address|| null, false);

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
