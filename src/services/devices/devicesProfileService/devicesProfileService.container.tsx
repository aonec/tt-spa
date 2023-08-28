import { useUnit } from 'effector-react';
import React, { FC, useEffect, useRef } from 'react';
import { displayDevicesService } from '../displayDevicesService';
import { DevicesProfile } from './view/DevicesProfile';
import { currentUserService } from 'services/currentUserService';
import { DevicesSearchType } from '../devicesPageService/devicesPageService.types';
import { HeaderInject } from 'services/objects/objectsProfileService/view/ObjectsProfile/ObjectsProfile.types';
import { devicesReportService } from '../devicesReportService';
import { getNodesListQuery } from '../displayDevicesService/displayDevicesService.api';

const { outputs, inputs, gates } = displayDevicesService;
const CalculatorsGate = gates.CalculatorsGate;

export const DevicesProfileContainer: FC<HeaderInject> = ({ Header }) => {
  const prevSearchType = useRef<DevicesSearchType>(
    DevicesSearchType.SearialNumber,
  );
  const {
    clearSearchPayload,
    close,
    devicesSearchType,
    diametersConfig,
    isOpen,
    open,
    openDownloadDevicesReportModal,
    searchState,
    serialNumber,
    setDevicesProfileFilter,
    setDevicesSearchType,
    setSerialNumber,
    devices,
    isDevicesFetched,
  } = useUnit({
    isOpen: outputs.$isExtendedSearchOpen,
    searchState: outputs.$searchPayload,
    diametersConfig: currentUserService.outputs.$diametersConfig,
    devicesSearchType: outputs.$devicesSearchType,
    serialNumber: outputs.$serialNumber,
    setSerialNumber: inputs.setSerialNumber,
    setDevicesSearchType: inputs.setDevicesSearchType,
    clearSearchPayload: inputs.clearSearchPayload,
    setDevicesProfileFilter: inputs.setDevicesProfileFilter,
    close: inputs.extendedSearchClosed,
    open: inputs.extendedSearchOpened,
    openDownloadDevicesReportModal: devicesReportService.inputs.openModal,
    devices: outputs.$devices,
    isDevicesFetched: getNodesListQuery.$succeeded,
  });

  const isEmpty = Boolean(!devices.length);

  useEffect(() => {
    if (prevSearchType.current === devicesSearchType) {
      return;
    }
    if (prevSearchType.current === DevicesSearchType.SearialNumber) {
      setSerialNumber('');
    }
    if (prevSearchType.current === DevicesSearchType.Address) {
      setDevicesProfileFilter({
        'Address.Corpus': undefined,
        'Address.HousingStockNumber': undefined,
        'Address.Street': undefined,
      });
    }
    prevSearchType.current = devicesSearchType;
  }, [devicesSearchType, setSerialNumber, setDevicesProfileFilter]);

  return (
    <>
      <CalculatorsGate />
      <DevicesProfile
        Header={Header}
        openDownloadDevicesReportModal={openDownloadDevicesReportModal}
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
        isSearchError={isEmpty && isDevicesFetched}
      />
    </>
  );
};
