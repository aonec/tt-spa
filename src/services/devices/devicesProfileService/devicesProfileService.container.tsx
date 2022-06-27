import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { displayDevicesService } from '../displayDevicesService';
import { DevicesProfile } from './view/DevicesProfile';
import { showDownloadDeviceReportButtonClicked } from '01/features/devicesReport/models';
const { outputs, inputs } = displayDevicesService;

export const DevicesProfileContainer = () => {
  const fetchcalc = useEvent(inputs.fetchCalculators);
  const isOpen = useStore(outputs.$isExtendedSearchOpen);
  const close = useEvent(inputs.extendedSearchClosed);
  const open = useEvent(inputs.extendedSearchOpened);

  return (
    <>
      <DevicesProfile
        showDownloadDeviceReportButtonClicked={
          showDownloadDeviceReportButtonClicked
        }
        fetchcalc={fetchcalc}
        isOpen={isOpen}
        close={close}
        open={open}
      />
    </>
  );
};
