import React, { FC, useCallback, useMemo } from 'react';
import { AccountingNodesReadingsInputContainerProps } from './accountingNodesReadingsInputService.types';
import { accountingNodesReadingsInputService } from './accountingNodesReadingsInputService.model';
import { AccountingNodeReadingsLine } from './view/AccountingNodeReadingsLine';
import { useUnit } from 'effector-react';
import {
  CreateHousingMeteringDeviceReadingsRequest,
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
} from 'myApi';
import { getPreviousExistingReading } from './accountingNodesReadingsInputService.utils';

const { gates, inputs, outputs } = accountingNodesReadingsInputService;
const { AccountingNodesReadingsInputGate } = gates;

export const AccountingNodesReadingsInputContainer: FC<
  AccountingNodesReadingsInputContainerProps
> = ({ sliderIndex, device, deviceIndex }) => {
  const readings = useUnit(outputs.$readings);
  const deviceInputStatuses =
    useUnit(outputs.$deviceInputStatuses)[device.id] || {};
  const deviceNonResConsumptionInputStatuses = useUnit(
    outputs.$nonResConsumptionInputStatuses,
  );

  const sendReading = useUnit(inputs.sendReading);
  const sendNonResConsumption = useUnit(inputs.sendNonResConsumptionReading);

  const {
    previousReading,
    previousExistingReadingBySliderIndex,
    currentReading,
  } = useMemo(() => {
    const readingsByDevice = readings[device.id];

    if (!readingsByDevice) {
      return {};
    }

    const previousReading:
      | HousingMeteringDeviceReadingsIncludingPlacementResponse
      | undefined = readingsByDevice[sliderIndex];
    const currentReading:
      | HousingMeteringDeviceReadingsIncludingPlacementResponse
      | undefined = readingsByDevice[-1];
    const previousExistingReadingBySliderIndex = getPreviousExistingReading(
      readingsByDevice,
      sliderIndex,
    );

    return {
      previousReading,
      previousExistingReadingBySliderIndex,
      currentReading,
    };
  }, [readings, sliderIndex, device]);

  const handleSendReading = useCallback(
    (payload: Omit<CreateHousingMeteringDeviceReadingsRequest, 'deviceId'>) =>
      sendReading({ ...payload, deviceId: device.id }),
    [sendReading, device],
  );

  return (
    <>
      {device.nodeId && (
        <AccountingNodesReadingsInputGate
          nodeId={device.nodeId}
          deviceId={device.id}
        />
      )}
      <AccountingNodeReadingsLine
        device={device}
        sliderIndex={sliderIndex}
        deviceIndex={deviceIndex}
        previousReading={previousReading}
        previousExistingReadingBySliderIndex={
          previousExistingReadingBySliderIndex
        }
        currentReading={currentReading}
        deviceInputStatuses={deviceInputStatuses}
        deviceNonResConsumptionInputStatuses={
          deviceNonResConsumptionInputStatuses
        }
        sendNonResConsumption={sendNonResConsumption}
        handleSendReading={handleSendReading}
      />
    </>
  );
};
