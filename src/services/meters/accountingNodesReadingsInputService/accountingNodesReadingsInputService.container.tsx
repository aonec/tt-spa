import React, { FC, useCallback, useMemo } from 'react';
import {
  AccountingNodesReadingsInputContainerProps,
  UpdateHousingMeteringDeviceReadingsPayload,
} from './accountingNodesReadingsInputService.types';
import { accountingNodesReadingsInputService } from './accountingNodesReadingsInputService.model';
import { AccountingNodeReadingsLine } from './view/AccountingNodeReadingsLine';
import { useUnit } from 'effector-react';
import { AccountingNodesReadingsService } from '../metersService/AccountingNodesReadingsService';
import { UpdateAccountingNodesSumPayload } from '../metersService/AccountingNodesReadingsService/AccountingNodesReadingsService.types';
import { PreValidatedNodeReadings } from './view/AccountingNodeReadingsLine/AccountingNodeReadingsLine.types';
import moment from 'moment';
import { getNodeReadingValue } from './view/AccountingNodeReadingsLine/AccountingNodeReadingsLine.utils';

const { gates, inputs, outputs } = accountingNodesReadingsInputService;
const { AccountingNodesReadingsInputGate } = gates;

export const AccountingNodesReadingsInputContainer: FC<
  AccountingNodesReadingsInputContainerProps
> = ({ sliderIndex, device, deviceIndex }) => {
  const {
    allReadings,
    deviceInputStatuses,
    deviceNonResConsumptionInputStatuses,
  } = {
    allReadings: useUnit(outputs.$readings),
    deviceInputStatuses: useUnit(outputs.$deviceInputStatuses)[device.id] || {},
    deviceNonResConsumptionInputStatuses: useUnit(
      outputs.$nonResConsumptionInputStatuses,
    ),
  };

  const readings = useMemo(
    () => allReadings[device.id] || [],
    [allReadings, device],
  );

  const sendReading = useUnit(inputs.sendReading);
  const sendNonResConsumption = useUnit(inputs.sendNonResConsumptionReading);
  const removeReading = useUnit(inputs.removeReading);
  const updateReadingsSum = useUnit(
    AccountingNodesReadingsService.inputs.updateNodeReadings,
  );
  const openConfirmReadingModal = useUnit(inputs.openConfirmReadingModal);

  const handleValidateReading = useCallback(
    (payload: PreValidatedNodeReadings) => {
      const { value, reading, readingDate } = payload;
      const isEdited = value !== getNodeReadingValue(reading);

      const readingMonth = moment(readingDate).format('MMMM');
      const prevReading = readings.find(
        (elem) => elem.id === reading?.previousReadingsId,
      );

      if (!isEdited) {
        return null;
      }

      if (value === null) {
        return openConfirmReadingModal({
          title: (
            <>
              Вы точно хотите удалить показание за <b>{readingMonth}</b> на
              приборе <b>{device.serialNumber}</b> ({device.model})?
            </>
          ),
          onSubmit: () => {
            reading?.id &&
              removeReading({ id: reading.id, deviceId: device.id });
          },
        });
      }

      const sendReadingCallback = () =>
        sendReading({
          value,
          readingDate,
          nonResidentialRoomConsumption: reading?.nonResidentialRoomConsumption,
          deviceId: device.id,
          oldReadingId: reading?.id,
        });

      if (prevReading && value < prevReading.value) {
        return openConfirmReadingModal({
          title: (
            <>
              Введенное показание по прибору <b>{device.serialNumber}</b> (
              {device.model}) меньше предыдущего на:
              {prevReading.value - value}
              кВт/ч
            </>
          ),
          onSubmit: sendReadingCallback,
        });
      }

      sendReadingCallback();
    },
    [sendReading, device, openConfirmReadingModal, removeReading, readings],
  );

  const handleSendNonResConsumption = useCallback(
    (payload: Omit<UpdateHousingMeteringDeviceReadingsPayload, 'deviceId'>) => {
      sendNonResConsumption({ ...payload, deviceId: device.id });
    },
    [sendNonResConsumption, device],
  );

  const handleUpdateReadingsSum = useCallback(
    (payload: Omit<UpdateAccountingNodesSumPayload, 'id'>) =>
      updateReadingsSum({ ...payload, id: device.id }),
    [updateReadingsSum, device],
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
        readings={readings}
        sliderIndex={sliderIndex}
        deviceIndex={deviceIndex}
        deviceInputStatuses={deviceInputStatuses}
        deviceNonResConsumptionInputStatuses={
          deviceNonResConsumptionInputStatuses
        }
        handleSendNonResConsumption={handleSendNonResConsumption}
        handleValidateReading={handleValidateReading}
        handleUpdateReadingsSum={handleUpdateReadingsSum}
      />
    </>
  );
};
