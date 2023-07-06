import { DeviceDataString } from '01/features/individualDevices/switchIndividualDevice/components/DeviceDataString';
import { Spaces } from '01/shared/ui/Layout/Space/Space';
import { useStore } from 'effector-react';
import moment from 'moment';
import React from 'react';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { getApartmentFromFullAddress } from 'utils/getApartmentFromFullAddress';
import { DeviceStatus } from 'ui-kit/shared_components/IndividualDeviceInfo/DeviceStatus';
import styled from 'styled-components';
import { displayIndividualDeviceAndNamesService } from 'services/devices/individualDevices/displayIndividualDeviceAndNamesService/displayIndividualDeviceAndNamesService.model';

const {
  outputs: { $individualDevice },
} = displayIndividualDeviceAndNamesService;

interface Props {
  isModal?: boolean;
}

export const ReadingHistoryHeader: React.FC<Props> = ({ isModal }) => {
  const device = useStore($individualDevice);

  const address = getApartmentFromFullAddress(device?.address || null, false);

  const checkingDates = useDeviceCheckingDates();

  return (
    <>
      <Header>
        <div>
          {!isModal && <GoBack />}
          <div style={{ marginTop: 5 }}>
            {!isModal && <Title>История показаний</Title>}
            <Spaces flex>
              {[
                <DeviceDataString />,
                <DeviceStatus isActive={device?.closingDate === null} />,
                address,
                <b>{checkingDates}</b>,
              ]}
            </Spaces>
          </div>
        </div>
      </Header>
    </>
  );
};

export function useDeviceCheckingDates() {
  const device = useStore($individualDevice);

  return (
    device &&
    `${moment(device.lastCheckingDate).format('DD.MM.YYYY')} — ${moment(
      device.futureCheckingDate,
    ).format('DD.MM.YYYY')}`
  );
}

const Header = styled.div`
  margin-bottom: 10px;
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.div`
  padding: 0;
  margin-top: 16px;
  font-weight: 300;
  font-size: 32px;
  line-height: 48px;
`;
