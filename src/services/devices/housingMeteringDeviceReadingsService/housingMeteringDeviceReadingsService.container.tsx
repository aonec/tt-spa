import { useEvent, useStore } from 'effector-react';
import React, { FC } from 'react';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { housingMeteringDeviceReadingsService } from './housingMeteringDeviceReadingsService.model';
import { NoFlowMeterTitle } from './housingMeteringDeviceReadingsService.styled';
import { HousingMeteringDeviceReadingsContainerProps } from './housingMeteringDeviceReadingsService.types';
import { MeteringDeviceReadingsTable } from './view/MeteringDeviceReadingsTable';

const { inputs, outputs, gates } = housingMeteringDeviceReadingsService;
const { NodeIdGate, NodeResourceGate } = gates;

export const HousingMeteringDeviceReadingsContainer: FC<HousingMeteringDeviceReadingsContainerProps> = ({
  nodeId,
  resource,
  deviceIds,
}) => {
  const readings = useStore(outputs.$readings);
  const isColdWater = useStore(outputs.$isColdWater);
  const isLoading = useStore(outputs.$isLoading);

  const isShowLoader = readings.length === 0 && isLoading;

  const isDevicesExist = Boolean(deviceIds.FeedFlow);

  const createReading = useEvent(inputs.createReading);

  return (
    <>
      <NodeResourceGate resource={resource} />
      <NodeIdGate nodeId={nodeId} />
      {!isDevicesExist && (
        <NoFlowMeterTitle>На узле нет расходомера</NoFlowMeterTitle>
      )}
      {isDevicesExist && (
        <WithLoader isLoading={isShowLoader}>
          <MeteringDeviceReadingsTable
            isColdWater={isColdWater}
            readings={readings}
            createReading={createReading}
            deviceIds={deviceIds}
          />
        </WithLoader>
      )}
    </>
  );
};
