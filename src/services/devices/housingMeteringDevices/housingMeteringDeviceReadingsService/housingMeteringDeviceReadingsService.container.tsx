import { useEvent, useStore } from 'effector-react';
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
  const readings = useStore(outputs.$readings);
  const isColdWater = useStore(outputs.$isColdWater);
  const isLoading = useStore(outputs.$isLoading);

  const isShowLoader = readings.length === 0 && isLoading;

  const createReading = useEvent(inputs.createReading);
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
