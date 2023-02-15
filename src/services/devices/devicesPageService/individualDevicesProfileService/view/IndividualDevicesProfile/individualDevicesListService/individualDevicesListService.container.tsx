import React, { FC } from 'react';
import { useEvent, useStore } from 'effector-react';
import { individualDevicesListService } from './individualDevicesListService.model';
import { IndividualDevicesListContainerProps } from './individualDevicesListService.types';
import { IndividualDevicesList } from './view/IndividualDevicesList';

const {
  outputs,
  gates: { IndividualDevicesIds },
  inputs,
} = individualDevicesListService;

export const IndividualDevicesListContainer: FC<
  IndividualDevicesListContainerProps
> = ({ devicesIds, housingStockId, apartmentId }) => {
  const isLoading = useStore(outputs.$isLoading);
  const individualDevicesList = useStore(outputs.$individualDevicesList);
  const deviceConsumptionGraphType = useStore(outputs.$graphType);

  const selectDeviceConsumptionGraphType = useEvent(inputs.selectGraphType);

  return (
    <>
      <IndividualDevicesIds devicesIds={devicesIds} />
      <IndividualDevicesList
        isLoading={isLoading}
        individualDevicesList={individualDevicesList}
        apartmentId={apartmentId}
        selectGraphType={selectDeviceConsumptionGraphType}
        selectedGraphType={deviceConsumptionGraphType}
      />
    </>
  );
};
