import { message } from 'antd';
import { useEvent, useStore } from 'effector-react';
import {
  IndividualDeviceReadingsCreateRequest,
  IndividualDeviceReadingsResponse,
} from 'myApi';
import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { individualDeviceMetersInputService } from './individualDeviceMetersInputService.model';
import {
  CompareReadingsStatus,
  IndividualDeviceMetersInputContainerProps,
  MeterInputUploadReadingPayload,
  UploadReading,
} from './individualDeviceMetersInputService.types';
import {
  getInputIndex,
  getMeasurementUnit,
  getPreparedReadingsDictionary,
  validateReadings,
} from './individualDeviceMetersInputService.utils';
import { IndividualDeviceMetersInputLine } from './view/IndividualDeviceMetersInputLine';
import { getRateNum } from './view/MetersInputsBlock/MetersInputsBlock.utils';

const { outputs, inputs } = individualDeviceMetersInputService;

export const IndividualDeviceMetersInputContainer: FC<IndividualDeviceMetersInputContainerProps> = ({
  deviceIndex,
  device,
  sliderIndex,
  openReadingsHistoryModal: openReadingsHistoryModalById,
  managementFirmConsumptionRates,
}) => {
  const devices = useStore(outputs.$devices);
  const uploadingMetersDevicesStatuses = useStore(
    outputs.$uploadingMetersStatuses
  );

  const uploadingMetersStatuses = useMemo(
    () => uploadingMetersDevicesStatuses[device.id] || {},
    [device.id, uploadingMetersDevicesStatuses]
  );

  const openConfirmReadingModal = useEvent(inputs.openConfirmReadingModal);

  const uploadMeter = useEvent(inputs.uploadMeter);

  const {
    previousReading,
    currentReading,
    preparedReadingsData,
  } = useMemo(() => {
    const preparedReadingsData = getPreparedReadingsDictionary(
      device.readings || []
    );

    const previousReading: IndividualDeviceReadingsResponse | undefined =
      preparedReadingsData[sliderIndex];
    const currentReading: IndividualDeviceReadingsResponse | undefined =
      preparedReadingsData[-1];

    return { previousReading, currentReading, preparedReadingsData };
  }, [device.readings, sliderIndex]);

  const openReadingsHistoryModal = useCallback(
    () => openReadingsHistoryModalById(device.id),
    [openReadingsHistoryModalById]
  );

  const inputIndex = useMemo(() => getInputIndex(deviceIndex, devices), [
    deviceIndex,
    devices,
  ]);

  const deviceRateNum = useMemo(() => getRateNum(device.rateType), [
    device.rateType,
  ]);

  const unit = getMeasurementUnit(device.resource);

  const consumptionRate = useMemo(() => {
    if (!managementFirmConsumptionRates) return null;

    return managementFirmConsumptionRates[device.resource];
  }, [managementFirmConsumptionRates, device]);

  const handleUploadReading: UploadReading = useCallback(
    async (
      readingPayload: MeterInputUploadReadingPayload,
      next: () => void,
      isPrevious?: boolean
    ) => {
      const result = validateReadings(
        isPrevious ? sliderIndex : -1,
        deviceRateNum,
        readingPayload,
        consumptionRate,
        preparedReadingsData
      );

      const sendMeter = () =>
        uploadMeter({
          meter: { ...readingPayload, deviceId: device.id },
          sliderIndex: readingPayload.sliderIndex,
          meterId: readingPayload.meterId,
        });

      if (!result) {
        return void sendMeter();
      }

      if (result.compareStatus === CompareReadingsStatus.LeftGreater) {
        openConfirmReadingModal({
          title: (
            <>
              Введенное показание по прибору <b>{device.serialNumber}</b> (
              {device.model}) меньше предыдущего на T{result.valueIndex + 1}:{' '}
              <b>
                {result.compareDiff} {unit}
              </b>
            </>
          ),
          onSubmit: sendMeter,
        });
      }

      if (result.limitsConsumptionDiff) {
        openConfirmReadingModal({
          title: (
            <>
              Расход {result.limitsConsumptionDiff}
              {unit} по T{result.valueIndex}, больше чем лимит {result.limit}
              {unit}
            </>
          ),
          onSubmit: sendMeter,
        });
      }

      if (result.compareStatus === CompareReadingsStatus.RightLess) {
        const text = `Введенное показание по прибору ${device.serialNumber} (${
          device.model
        }) больше следующего на T${result.valueIndex + 1}: ${
          result.compareDiff
        } ${unit}`;

        message.error(text);
      }

      throw result;
    },
    [consumptionRate, preparedReadingsData, deviceRateNum, sliderIndex]
  );

  return (
    <IndividualDeviceMetersInputLine
      inputIndex={inputIndex}
      openReadingsHistoryModal={openReadingsHistoryModal}
      sliderIndex={sliderIndex}
      device={device}
      previousReading={previousReading}
      currentReading={currentReading}
      handleUploadReading={handleUploadReading}
      uploadingMetersStatuses={uploadingMetersStatuses}
    />
  );
};
