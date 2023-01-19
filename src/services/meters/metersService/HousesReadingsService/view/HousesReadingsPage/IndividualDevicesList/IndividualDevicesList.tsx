import React, { FC } from 'react';
import { LoadButtonWrapper } from './IndividualDevicesList.styled';
import { IndividualDevicesListProps } from './IndividualDevicesList.types';
import { Button } from 'ui-kit/Button';
import { HousesIndividualDevicesMetersContainer } from 'services/meters/housesIndividualDevicesMetersService';

export const IndividualDevicesList: FC<IndividualDevicesListProps> = ({
  individualDevicesList,
  loadNextPageOfIndividualDevicesList,
  isLoadingIndividualDevices,
  managementFirmConsumptionRates,
  openReadingsHistoryModal,
  isAllDevicesLoaded,
  allDevicesLength,
}) => {
  return (
    <div>
      <HousesIndividualDevicesMetersContainer
        individualDevicesList={individualDevicesList}
        managementFirmConsumptionRates={managementFirmConsumptionRates}
        openReadingsHistoryModal={openReadingsHistoryModal}
        loadNextPageOfIndividualDevicesList={loadNextPageOfIndividualDevicesList}
        allDevicesLength={allDevicesLength}
      />
      {!isAllDevicesLoaded && (
        <LoadButtonWrapper>
          <Button
            onClick={loadNextPageOfIndividualDevicesList}
            isLoading={isLoadingIndividualDevices}
          >
            Загрузить приборы
          </Button>
        </LoadButtonWrapper>
      )}
    </div>
  );
};
