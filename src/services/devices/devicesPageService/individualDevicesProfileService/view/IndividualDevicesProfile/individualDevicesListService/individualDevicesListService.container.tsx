import React, { FC, useEffect } from 'react';
import { useStore } from 'effector-react';
import { individualDevicesListService } from './individualDevicesListService.model';
import { IndividualDevicesListContainerProps } from './individualDevicesListService.types';
import { IndividualDevicesList } from './view/IndividualDevicesList';

const {
  outputs,
  gates: { IndividualDevicesIds },
} = individualDevicesListService;

export const IndividualDevicesListContainer: FC<IndividualDevicesListContainerProps> = ({
  devicesIds,
  housingStockId,
  apartmentId,
}) => {
  const isLoading = useStore(outputs.$isLoading);
  const individualDevicesList = useStore(outputs.$individualDevicesList);

  return (
    <>
      <IndividualDevicesIds devicesIds={devicesIds} />
      <IndividualDevicesList
        isLoading={isLoading}
        individualDevicesList={individualDevicesList}
        housingStockId={housingStockId}
        apartmentId={apartmentId}
      />
    </>
  );
};
