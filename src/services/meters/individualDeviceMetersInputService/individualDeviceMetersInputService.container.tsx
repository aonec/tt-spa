import { message } from 'antd';
import { useUnit } from 'effector-react';
import dayjs from 'api/dayjs';
import { IndividualDeviceReadingsResponse } from 'api/types';
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
import { ApartmentIndividualDeviceMetersInputLine } from './view/ApartmentIndividualDeviceMetersInputLine';
import { IndividualDeviceMetersInputLine } from './view/IndividualDeviceMetersInputLine';
import { getRateNum } from './view/MetersInputsBlock/MetersInputsBlock.utils';

const { outputs, inputs } = individualDeviceMetersInputService;

export const IndividualDeviceMetersInputContainer: FC<
  IndividualDeviceMetersInputContainerProps
> = ({
  deviceIndex,
  device,
  sliderIndex,
  openReadingsHistoryModal: openReadingsHistoryModalById,
  managementFirmConsumptionRates,
  isHousingStocksReadingInputs,
  devices,
  editable,
  style,
  shift = 0,
}) => {
  const {
    deleteMeter,
    openConfirmReadingModal,
    uploadMeter,
    uploadingMetersDevicesStatuses,
  } = useUnit({
    uploadingMetersDevicesStatuses: outputs.$uploadingMetersStatuses,
    openConfirmReadingModal: inputs.openConfirmReadingModal,
    uploadMeter: inputs.uploadMeter,
    deleteMeter: inputs.deleteMeter,
  });

  const uploadingMetersStatuses = useMemo(
    () => uploadingMetersDevicesStatuses[device.id] || {},
    [device.id, uploadingMetersDevicesStatuses],
  );

  const previousReadingByCurrentSliderIndex = useMemo(() => {
    if (!device.readings) return;

    const preparedReadings = getPreparedReadingsDictionary(device.readings);

    return getExistingReading(preparedReadings, sliderIndex, 'prev');
  }, [device.readings, sliderIndex]);

  const { previousReading, currentReading, preparedReadingsData } =
    useMemo(() => {
      const preparedReadingsData = getPreparedReadingsDictionary(
        device.readings || [],
      );

      const previousReading: IndividualDeviceReadingsResponse | undefined =
        preparedReadingsData[sliderIndex];
      const currentReading: IndividualDeviceReadingsResponse | undefined =
        preparedReadingsData[-1];

      return { previousReading, currentReading, preparedReadingsData };
    }, [device.readings, sliderIndex]);

  const openReadingsHistoryModal = useCallback(
    () => openReadingsHistoryModalById(device.id),
    [openReadingsHistoryModalById, device.id],
  );

  const inputIndex = useMemo(() => {
    return getInputIndex(deviceIndex, devices) - getInputIndex(shift, devices);
  }, [deviceIndex, devices, shift]);

  const deviceRateNum = useMemo(
    () => getRateNum(device.rateType),
    [device.rateType],
  );

  const unit = getMeasurementUnit(device.resource);

  const consumptionRate = useMemo(() => {
    if (!managementFirmConsumptionRates) return null;

    return managementFirmConsumptionRates[device.resource];
  }, [managementFirmConsumptionRates, device]);

   const handleUploadReading: UploadReading = useCallback(
    (readingPayload: MeterInputUploadReadingPayload, isPrevious?: boolean) => {
      return new Promise((resolve, rej) => {
        const result = validateReadings(
          isPrevious ? sliderIndex : -1,
          deviceRateNum,
          readingPayload,
          consumptionRate,
          preparedReadingsData,
        );

        const reject = () => {
          rej(result);
        };

        const sendMeter = () => {
          uploadMeter({
            meter: { ...readingPayload, deviceId: device.id },
            sliderIndex: readingPayload.sliderIndex,
            meterId: readingPayload.meterId,
          });
          resolve();
        };

        if (result.type === ValidationReadingsResultType.Success) {
          return void sendMeter();
        }

        if (result.type === ValidationReadingsResultType.EmptyValues) {
          const meterId = readingPayload.meterId;

          const readingMonth = dayjs(readingPayload.readingDate).format('MMMM');

          openConfirmReadingModal({
            title: (
              <>
                Вы точно хотите удалить показание за <b>{readingMonth}</b> на
                приборе <b>{device.serialNumber}</b> ({device.model})?
              </>
            ),
            onSubmit: () => {
              meterId &&
                deleteMeter({
                  deviceId: device.id,
                  meterId: meterId,
                  readingDate: readingPayload.readingDate,
                });
              resolve();
            },
            onCancel: reject,
          });
        }

        if (
          result.type === ValidationReadingsResultType.CompareProblem &&
          result.compareStatus === CompareReadingsStatus.RightLess
        ) {
          const text = `Введенное показание по прибору ${
            device.serialNumber
          } (${device.model}) больше следующего на T${
            result.valueIndex! + 1
          }: ${result.compareDiff} ${unit}`;

          message.error(text);

          return reject();
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
            onCancel: reject,
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
            onCancel: reject,
          });
        }
      });
    },
    [
      consumptionRate,
      preparedReadingsData,
      deviceRateNum,
      sliderIndex,
      deleteMeter,
      device,
      unit,
      uploadMeter,
      openConfirmReadingModal,
    ],
  );

  const ReadingLineComponent = useMemo(() => {
    return isHousingStocksReadingInputs
      ? ApartmentIndividualDeviceMetersInputLine
      : IndividualDeviceMetersInputLine;
  }, [isHousingStocksReadingInputs]);

  return (
    <ReadingLineComponent
      inputIndex={inputIndex}
      openReadingsHistoryModal={openReadingsHistoryModal}
      sliderIndex={sliderIndex}
      device={device}
      previousReading={previousReading}
      currentReading={currentReading}
      handleUploadReading={handleUploadReading}
      uploadingMetersStatuses={uploadingMetersStatuses}
      previousReadingByCurrentSliderIndex={previousReadingByCurrentSliderIndex}
      editable={editable}
      apartmentId={device.apartmentId}
      style={style}
    />
  );
};
