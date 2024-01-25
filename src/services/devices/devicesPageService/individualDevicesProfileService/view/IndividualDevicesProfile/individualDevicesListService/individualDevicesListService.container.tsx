import React, { FC } from 'react';
import { useUnit } from 'effector-react';
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
> = ({ devicesIds, apartmentId }) => {
  const {
    deviceConsumptionGraphType,
    graphData,
    individualDevicesList,
    isConsumptionsLoading,
    isLoading,
    selectDeviceConsumptionGraphType,
  } = useUnit({
    isLoading: outputs.$isLoading,
    individualDevicesList: outputs.$individualDevicesList,
    deviceConsumptionGraphType: outputs.$graphType,
    graphData: outputs.$preparedData,
    isConsumptionsLoading: outputs.$isConsumptionsLoading,
    selectDeviceConsumptionGraphType: inputs.selectGraphType,
  });

  return (
    <>
      <IndividualDevicesIds devicesIds={devicesIds} />
      <IndividualDevicesList
        isLoading={isLoading}
        individualDevicesList={individualDevicesList}
        apartmentId={apartmentId}
        selectGraphType={selectDeviceConsumptionGraphType}
        selectedGraphType={deviceConsumptionGraphType}
        graphData={graphData}
        isConsumptionsLoading={isConsumptionsLoading}
      />
    </>
  );
};
