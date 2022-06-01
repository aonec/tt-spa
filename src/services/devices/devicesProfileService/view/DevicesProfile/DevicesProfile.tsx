import { showDownloadDeviceReportButtonClicked } from '01/features/devicesReport/models';
import { PageHeader } from '01/shared/ui/PageHeader';
import React, { FC } from 'react';
import { DevicesListContainer } from 'services/devices/displayDevicesService/displayDevicesService.container';
import { SearchDevices } from '../SearchDevices';
import { Wrapper } from './DevicesProfile.styled';
import { DevicesProfileProps } from './DevicesProfile.types';

export const DevicesProfile: FC<DevicesProfileProps> = ({}) => {
  return (
    <Wrapper>
      <PageHeader
        title="Приборы"
        contextMenu={{
          menuButtons: [
            { title: 'Выгрузить список приборов', onClick: () => void 0 },
          ],
        }}
      />
      <SearchDevices />
      <DevicesListContainer />
    </Wrapper>
  );
};
