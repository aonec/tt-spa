import { useUnit } from 'effector-react';
import React, { FC } from 'react';
import { housingMeteringDeviceReadingsService } from './housingMeteringDeviceReadingsService.model';
import { HousingMeteringDeviceReadingsContainerProps } from './housingMeteringDeviceReadingsService.types';
import { MeteringDeviceReadingsTable } from './view/MeteringDeviceReadingsTable';
import { WithLoader } from 'ui-kit/shared/WithLoader';

const { inputs, outputs, gates } = housingMeteringDeviceReadingsService;
const { NodeIdGate, NodeResourceGate } = gates;

export const HousingMeteringDeviceReadingsContainer: FC<
  HousingMeteringDeviceReadingsContainerProps
> = ({ nodeId, resource, deviceIds }) => {
  const { createReading, isColdWater, isLoading, readings } = useUnit({
    readings: outputs.$readings,
    isColdWater: outputs.$isColdWater,
    isLoading: outputs.$isLoading,
    createReading: inputs.createReading,
  });

  const isShowLoader = readings.length === 0 && isLoading;

  const createReadingFailed = inputs.createReadingFailed;

  return (
    <>
      <NodeResourceGate resource={resource} />
      <NodeIdGate nodeId={nodeId} />

      <WithLoader isLoading={isShowLoader}>
        <MeteringDeviceReadingsTable
          isColdWater={isColdWater}
          readings={readings}
          createReading={createReading}
          deviceIds={deviceIds}
          createReadingFailed={createReadingFailed}
        />
      </WithLoader>
    </>
  );
};
