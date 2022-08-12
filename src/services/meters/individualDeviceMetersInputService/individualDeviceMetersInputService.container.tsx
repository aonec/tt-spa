import { message } from 'antd';
import { useEvent, useStore } from 'effector-react';
import moment from 'moment';
import { IndividualDeviceReadingsResponse } from 'myApi';
import React, { FC, useCallback, useMemo } from 'react';
import { individualDeviceMetersInputService } from './individualDeviceMetersInputService.model';
import {
  CompareReadingsStatus,
  IndividualDeviceMetersInputContainerProps,
  MeterInputUploadReadingPayload,
  UploadReading,
  ValidationReadingsResultType,
} from './individualDeviceMetersInputService.types';
import {
  getExistingReading,
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

  const deleteMeter = useEvent(inputs.deleteMeter);

  const previousReadingByCurrentSliderIndex = useMemo(
    () =>
      device.readings &&
      getExistingReading(device.readings, sliderIndex - 2, 'prev'),
    [device.readings, sliderIndex]
  );

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
      isPrevious?: boolean,
      setFailed?: () => void
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

      if (result.type === ValidationReadingsResultType.Success) {
        return void sendMeter();
      }

      if (result.type === ValidationReadingsResultType.EmptyValues) {
        const meterId = readingPayload.meterId;

        const readingMonth = moment(readingPayload.readingDate).format('MMMM');

        return void openConfirmReadingModal({
          title: (
            <>
              Вы точно хотите удалить показание за <b>{readingMonth}</b> на
              приборе <b>{device.serialNumber}</b> ({device.model})?
            </>
          ),
          onSubmit: () =>
            meterId &&
            deleteMeter({
              deviceId: device.id,
              meterId: meterId,
              readingDate: readingPayload.readingDate,
            }),
          onCancel: setFailed,
        });
      }

      if (
        result.type === ValidationReadingsResultType.CompareProblem &&
        result.compareStatus === CompareReadingsStatus.RightLess
      ) {
        const text = `Введенное показание по прибору ${device.serialNumber} (${
          device.model
        }) больше следующего на T${result.valueIndex! + 1}: ${
          result.compareDiff
        } ${unit}`;

        message.error(text);

        throw result;
      }

      if (
        result.type === ValidationReadingsResultType.CompareProblem &&
        result.compareStatus === CompareReadingsStatus.LeftGreater
      ) {
        return void openConfirmReadingModal({
          title: (
            <>
              Введенное показание по прибору <b>{device.serialNumber}</b> (
              {device.model}) меньше предыдущего на T{result.valueIndex! + 1}:{' '}
              <b>
                {result.compareDiff} {unit}
              </b>
            </>
          ),
          onSubmit: sendMeter,
          onCancel: setFailed,
        });
      }

      if (result.type === ValidationReadingsResultType.LimitsExcess) {
        return void openConfirmReadingModal({
          title: (
            <>
              Расход{' '}
              <b>
                {result.limitsConsumptionDiff}
                {unit}
              </b>{' '}
              по T{result.valueIndex! + 1} больше, чем лимит{' '}
              <b>
                {result.limit}
                {unit}
              </b>
            </>
          ),
          onSubmit: sendMeter,
          onCancel: setFailed,
        });
      }
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
      previousReadingByCurrentSliderIndex={previousReadingByCurrentSliderIndex}
    />
  );
};
