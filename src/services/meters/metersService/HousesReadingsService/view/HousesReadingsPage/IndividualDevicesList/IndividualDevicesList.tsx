import React, { FC } from 'react';
import { LoadButtonWrapper } from './IndividualDevicesList.styled';
import { IndividualDevicesListProps } from './IndividualDevicesList.types';
import { IndividualDeviceListItemResponse } from 'myApi';
import { IndividualDeviceMetersInputContainer } from 'services/meters/individualDeviceMetersInputService';
import { Skeleton } from 'antd';
import { Button } from 'ui-kit/Button';

export const IndividualDevicesList: FC<IndividualDevicesListProps> = ({
  individualDevicesList,
  loadNextPageOfIndividualDevicesList,
  isLoadingIndividualDevices,
  managementFirmConsumptionRates,
  openReadingsHistoryModal,
  isAllDevicesLoaded,
}) => {
  return (
    <div>
      {individualDevicesList.map(
        (device: IndividualDeviceListItemResponse, index: number) => (
          <IndividualDeviceMetersInputContainer
            devices={individualDevicesList}
            device={device}
            sliderIndex={0}
            openReadingsHistoryModal={openReadingsHistoryModal}
            managementFirmConsumptionRates={managementFirmConsumptionRates}
            deviceIndex={index}
            isHousingStocksReadingInputs
          />
        )
      )}
      {isLoadingIndividualDevices && <Skeleton active />}
      {!isLoadingIndividualDevices && !isAllDevicesLoaded && (
        <LoadButtonWrapper>
          <Button onClick={loadNextPageOfIndividualDevicesList}>
            Загрузить приборы
          </Button>
        </LoadButtonWrapper>
      )}
    </div>
  );
};
