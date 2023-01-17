import React, { FC } from 'react';
import { LoadButtonWrapper } from './IndividualDevicesList.styled';
import { IndividualDevicesListProps } from './IndividualDevicesList.types';
import { Skeleton } from 'antd';
import { Button } from 'ui-kit/Button';
import { HousesIndividualDevicesMetersContainer } from 'services/meters/housesIndividualDevicesMetersService';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';

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
      <HousesIndividualDevicesMetersContainer
        individualDevicesList={individualDevicesList}
        managementFirmConsumptionRates={managementFirmConsumptionRates}
        openReadingsHistoryModal={openReadingsHistoryModal}
      />
      <WithLoader isLoading={isLoadingIndividualDevices} />
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
