import React, { FC, useCallback, useMemo } from 'react';
import { AccountingNodesReadingsInputContainerProps } from './accountingNodesReadingsInputService.types';
import { accountingNodesReadingsInputService } from './accountingNodesReadingsInputService.model';
import { AccountingNodeReadingsLine } from './view/AccountingNodeReadingsLine';
import { useUnit } from 'effector-react';
import { AccountingNodesReadingsService } from '../metersService/AccountingNodesReadingsService';
import { UpdateAccountingNodesSumPayload } from '../metersService/AccountingNodesReadingsService/AccountingNodesReadingsService.types';
import { PreValidatedNodeReadings } from './view/AccountingNodeReadingsLine/AccountingNodeReadingsLine.types';
import moment from 'moment';

const { gates, inputs, outputs } = accountingNodesReadingsInputService;
const { AccountingNodesReadingsInputGate } = gates;

export const AccountingNodesReadingsInputContainer: FC<
  AccountingNodesReadingsInputContainerProps
> = ({ sliderIndex, device, deviceIndex }) => {
  const allReadings = useUnit(outputs.$readings);
  const readings = useMemo(
    () => allReadings[device.id] || [],
    [allReadings, device],
  );

  const deviceInputStatuses =
    useUnit(outputs.$deviceInputStatuses)[device.id] || {};
  const deviceNonResConsumptionInputStatuses = useUnit(
    outputs.$nonResConsumptionInputStatuses,
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
      const isEdited = value !== (reading?.value || null);

      const readingMonth = moment(readingDate).format('MMMM');
      // const prevReading = readings.find(
      //   (elem) => elem.id === reading?.previousReadingsId,
      // );

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

      sendReading({
        value,
        readingDate,
        nonResidentialRoomConsumption: reading?.nonResidentialRoomConsumption,
        deviceId: device.id,
        oldReadingId: reading?.id,
      });
    },
    [sendReading, device, openConfirmReadingModal, removeReading],
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
        handleSendNonResConsumption={sendNonResConsumption}
        handleValidateReading={handleValidateReading}
        handleUpdateReadingsSum={handleUpdateReadingsSum}
      />
    </>
  );
};
