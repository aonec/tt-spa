import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { displayDevicesService } from '../displayDevicesService';
import { DevicesProfile } from './view/DevicesProfile';
import { showDownloadDeviceReportButtonClicked } from '01/features/devicesReport/models';
const { outputs, inputs } = displayDevicesService;

export const DevicesProfileContainer = () => {
  const isOpen = useStore(outputs.$isExtendedSearchOpen);
  const searchState = useStore(outputs.$searchPayload);

  const clearSearchPayload = useEvent(inputs.clearSearchPayload);
  const fetchcalc = useEvent(inputs.fetchCalculators);
  const close = useEvent(inputs.extendedSearchClosed);
  const open = useEvent(inputs.extendedSearchOpened);

  return (
    <DevicesProfile
      showDownloadDeviceReportButtonClicked={
        showDownloadDeviceReportButtonClicked
      }
      fetchcalc={fetchcalc}
      isOpen={isOpen}
      close={close}
      open={open}
      searchState={searchState}
      clearSearchPayload={clearSearchPayload}
    />
  );
};
