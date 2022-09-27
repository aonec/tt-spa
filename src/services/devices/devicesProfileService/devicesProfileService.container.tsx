import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { displayDevicesService } from '../displayDevicesService';
import { DevicesProfile } from './view/DevicesProfile';
import { showDownloadDeviceReportButtonClicked } from '01/features/devicesReport/models';
const { outputs, inputs, gates } = displayDevicesService;

export const DevicesProfileContainer = () => {
  const CalculatorsGate = gates.CalculatorsGate;

  const isOpen = useStore(outputs.$isExtendedSearchOpen);
  const searchState = useStore(outputs.$searchPayload);

  const clearSearchPayload = useEvent(inputs.clearSearchPayload);
  const setDevicesProfileFilter = useEvent(inputs.setDevicesProfileFilter);
  const close = useEvent(inputs.extendedSearchClosed);
  const open = useEvent(inputs.extendedSearchOpened);

  return (
    <>
      <CalculatorsGate />
      <DevicesProfile
        showDownloadDeviceReportButtonClicked={
          showDownloadDeviceReportButtonClicked
        }
        setFilter={setDevicesProfileFilter}
        isOpen={isOpen}
        close={close}
        open={open}
        searchState={searchState}
        clearSearchPayload={clearSearchPayload}
      />
    </>
  );
};
