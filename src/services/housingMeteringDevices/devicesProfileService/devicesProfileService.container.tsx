import { useEvent, useStore } from 'effector-react';
import React, { FC, useEffect, useRef } from 'react';
import { displayDevicesService } from '../displayDevicesService';
import { DevicesProfile } from './view/DevicesProfile';
import { showDownloadDeviceReportButtonClicked } from '01/features/devicesReport/models';
import { currentUserService } from 'services/currentUserService';
import { DevicesSearchType } from '../devicesPageService/devicesPageService.types';
import { HeaderInject } from 'services/objects/objectsProfileService/view/ObjectsProfile/ObjectsProfile.types';

const { outputs, inputs, gates } = displayDevicesService;

export const DevicesProfileContainer: FC<HeaderInject> = ({ Header }) => {
  const prevSearchType = useRef<DevicesSearchType>(
    DevicesSearchType.SearialNumber,
  );

  const CalculatorsGate = gates.CalculatorsGate;

  const isOpen = useStore(outputs.$isExtendedSearchOpen);
  const searchState = useStore(outputs.$searchPayload);
  const diametersConfig = useStore(currentUserService.outputs.$diametersConfig);
  const devicesSearchType = useStore(outputs.$devicesSearchType);
  const serialNumber = useStore(outputs.$serialNumber);

  const setSerialNumber = useEvent(inputs.setSerialNumber);
  const setDevicesSearchType = useEvent(inputs.setDevicesSearchType);
  const clearSearchPayload = useEvent(inputs.clearSearchPayload);
  const setDevicesProfileFilter = useEvent(inputs.setDevicesProfileFilter);
  const close = useEvent(inputs.extendedSearchClosed);
  const open = useEvent(inputs.extendedSearchOpened);

  useEffect(() => {
    if (prevSearchType.current === devicesSearchType) {
      return;
    }
    if (prevSearchType.current === DevicesSearchType.SearialNumber) {
      setSerialNumber('');
    }
    if (prevSearchType.current === DevicesSearchType.Address) {
      setDevicesProfileFilter({
        'Filter.Address.Corpus': undefined,
        'Filter.Address.HousingStockNumber': undefined,
        'Filter.Address.Street': undefined,
      });
    }
    prevSearchType.current = devicesSearchType;
  }, [devicesSearchType, setSerialNumber, setDevicesProfileFilter]);

  return (
    <>
      <CalculatorsGate />
      <DevicesProfile
        Header={Header}
        showDownloadDeviceReportButtonClicked={
          showDownloadDeviceReportButtonClicked
        }
        setFilter={setDevicesProfileFilter}
        isOpen={isOpen}
        close={close}
        open={open}
        searchState={searchState}
        clearSearchPayload={clearSearchPayload}
        diametersConfig={diametersConfig}
        devicesSearchType={devicesSearchType}
        setDevicesSearchType={setDevicesSearchType}
        serialNumber={serialNumber}
        setSerialNumber={setSerialNumber}
      />
    </>
  );
};
