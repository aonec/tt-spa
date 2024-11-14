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
import dayjs from 'api/dayjs';
import { getNodeReadingValue } from './view/AccountingNodeReadingsLine/AccountingNodeReadingsLine.utils';
import { getLastReading } from './accountingNodesReadingsInputService.utils';

const { gates, inputs, outputs } = accountingNodesReadingsInputService;
const { AccountingNodesReadingsInputGate } = gates;

export const AccountingNodesReadingsInputContainer: FC<
  AccountingNodesReadingsInputContainerProps
> = ({ sliderIndex, device, deviceIndex }) => {
  const {
    allReadings,
    inputStatuses,
    deviceNonResConsumptionInputStatuses,
    sendReading,
    sendNonResConsumption,
    removeReading,
    updateReadingsSum,
    openConfirmReadingModal,
    closeConfirmReadingModal,
  } = useUnit({
    allReadings: outputs.$readings,
    inputStatuses: outputs.$deviceInputStatuses,
    deviceNonResConsumptionInputStatuses:
      outputs.$nonResConsumptionInputStatuses,
    sendReading: inputs.sendReading,
    sendNonResConsumption: inputs.sendNonResConsumptionReading,
    removeReading: inputs.removeReading,
    updateReadingsSum: AccountingNodesReadingsService.inputs.updateNodeReadings,
    openConfirmReadingModal: inputs.openConfirmReadingModal,
    closeConfirmReadingModal: inputs.closeConfirmReadingModal,
  });

  const deviceInputStatuses = inputStatuses[device.id] || {};

  const readings = useMemo(
    () => allReadings[device.id] || [],
    [allReadings, device],
  );

  const handleValidateReading = useCallback(
    (payload: PreValidatedNodeReadings) => {
      const { value, reading, readingDate } = payload;
      const isEdited = value !== getNodeReadingValue(reading);

      const readingMonth = dayjs(readingDate).format('MMMM');

      const prevReading = !reading?.previousReadingsId
        ? getLastReading(readingDate, readings)
        : readings.find((elem) => elem.id === reading.previousReadingsId);

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
          onCancel: closeConfirmReadingModal,
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

      const prevReadingValue = Number(prevReading?.value);

      if (value < prevReadingValue) {
        return openConfirmReadingModal({
          title: (
            <>
              Введенное показание по прибору <b>{device.serialNumber}</b> (
              {device.model}) меньше предыдущего на:{' '}
              <b>{prevReadingValue - value}</b> кВт/ч
              <div>
                {' '}
                Дата предыдущего показания:{' '}
                <b> {dayjs(prevReading?.readingDate).format('DD.MM.YYYY')}</b>
              </div>
            </>
          ),
          onSubmit: sendReadingCallback,
          onCancel: closeConfirmReadingModal,
        });
      }

      sendReadingCallback();
    },
    [
      sendReading,
      device,
      openConfirmReadingModal,
      removeReading,
      readings,
      closeConfirmReadingModal,
    ],
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
