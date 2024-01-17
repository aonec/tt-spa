import React, { FC, useCallback, useMemo, useState } from 'react';
import { IndividualDeviceCarouselInputsBarProps } from './IndividualDeviceCarouselInputsBar.types';
import {
  GroupWrapper,
  HeaderWrapper,
  InputsWrapper,
  MonthWrapperWithMargin,
  ReadingHistoryButtonWrapper,
  SerialNumberWrapper,
  TitleWrapper,
  Wrapper,
} from './IndividualDeviceCarouselInputsBar.styled';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import { getReadingsMonthByShift } from 'services/meters/apartmentIndividualDevicesMetersService/apartmentIndividualDevicesMetersService.utils';
import { ChevronIcon, HistoryIcon } from 'ui-kit/icons';
import {
  ArrowContainer,
  RightChevronIcon,
} from 'services/meters/metersService/AccountingNodesReadingsService/view/AccountingNodesList/AccountingNodesListHeader/AccountingNodesListHeader.styled';
import { MonthWrapper } from 'services/devices/housingMeteringDevices/housingMeteringDeviceReadingsService/view/MeteringDeviceMonthReading/MeteringDeviceMonthReading.styled';
import { MetersInputsBlock } from 'services/meters/individualDeviceMetersInputService/view/MetersInputsBlock';
import {
  getMeasurementUnit,
  getPreparedReadingsDictionary,
  validateReadings,
} from 'services/meters/individualDeviceMetersInputService/individualDeviceMetersInputService.utils';
import { IndividualDeviceReadingsResponse } from 'api/types';
import {
  CompareReadingsStatus,
  MeterInputUploadReadingPayload,
  UploadReading,
  ValidationReadingsResultType,
} from 'services/meters/individualDeviceMetersInputService/individualDeviceMetersInputService.types';
import { getRateNum } from 'services/meters/individualDeviceMetersInputService/view/MetersInputsBlock/MetersInputsBlock.utils';
import { individualDeviceMetersInputService } from 'services/meters/individualDeviceMetersInputService';
import { useUnit } from 'effector-react';
import { useManagingFirmConsumptionRates } from 'services/meters/managementFirmConsumptionRatesService';
import { apartmentIndividualDevicesMetersService } from 'services/meters/apartmentIndividualDevicesMetersService';
import dayjs from 'dayjs';
import { Tooltip, message } from 'antd';

const { outputs, inputs } = individualDeviceMetersInputService;

export const IndividualDeviceCarouselInputsBar: FC<
  IndividualDeviceCarouselInputsBarProps
> = ({
  resource,
  rateType,
  title,
  model,
  serialNumber,
  readings,
  onChange,
  disabled = false,
  device,
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
    () => uploadingMetersDevicesStatuses[device!.id] || {},
    [device, uploadingMetersDevicesStatuses],
  );

  const { consumptionRates, loadConsumptionRates, openReadingsHistoryModal } =
    useUnit({
      consumptionRates:
        apartmentIndividualDevicesMetersService.outputs.$consumptionRates,
      openReadingsHistoryModal:
        apartmentIndividualDevicesMetersService.inputs.openReadingsHistoryModal,
      loadConsumptionRates:
        apartmentIndividualDevicesMetersService.inputs.loadConsumptionRates,
    });

  const { managementFirmConsumptionRates } = useManagingFirmConsumptionRates(
    consumptionRates,
    loadConsumptionRates,
  );

  const [sliderIndex, setSliderIndex] = useState(0);

  const prevReadingMonth = useMemo(
    (): string => getReadingsMonthByShift(sliderIndex),
    [sliderIndex],
  );

  const isCanUp = useMemo(() => sliderIndex < 6, [sliderIndex]);
  const isCanDown = useMemo(() => sliderIndex > 0, [sliderIndex]);

  const upIndex = useCallback(() => {
    if (isCanUp) {
      setSliderIndex((prev) => prev + 1);
    }
  }, [isCanUp]);

  const downIndex = useCallback(() => {
    if (isCanDown) {
      setSliderIndex((prev) => prev - 1);
    }
  }, [isCanDown]);

  const { previousReading, currentReading, preparedReadingsData } =
    useMemo(() => {
      const preparedReadingsData = getPreparedReadingsDictionary(
        device?.readings || [],
      );

      const previousReading: IndividualDeviceReadingsResponse | undefined =
        preparedReadingsData[sliderIndex];
      const currentReading: IndividualDeviceReadingsResponse | undefined =
        preparedReadingsData[-1];

      return { previousReading, currentReading, preparedReadingsData };
    }, [device, sliderIndex]);

  const deviceRateNum = useMemo(() => getRateNum(device!.rateType), [device]);

  const unit = getMeasurementUnit(device!.resource);

  const consumptionRate = useMemo(() => {
    if (!managementFirmConsumptionRates) return null;

    return managementFirmConsumptionRates[device!.resource];
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
            meter: { ...readingPayload, deviceId: device!.id },
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
                приборе <b>{device!.serialNumber}</b> ({device!.model})?
              </>
            ),
            onSubmit: () => {
              meterId &&
                deleteMeter({
                  deviceId: device!.id,
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
            device!.serialNumber
          } (${device!.model}) больше следующего на T${
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
                Введенное показание по прибору <b>{device!.serialNumber}</b> (
                {device!.model}) меньше предыдущего на T{result.valueIndex! + 1}
                :{' '}
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

  return (
    <Wrapper>
      <div>
        <TitleWrapper>{title}</TitleWrapper>
        <GroupWrapper>
          {resource && <ResourceIconLookup resource={resource} />}
          <SerialNumberWrapper>
            {serialNumber || 'Серийный номер'}
          </SerialNumberWrapper>
          {model || 'Модель'}
        </GroupWrapper>
      </div>
      <InputsWrapper>
        <div>
          <HeaderWrapper>
            <ArrowContainer onClick={upIndex} isDisabled={!isCanUp}>
              <ChevronIcon />
            </ArrowContainer>
            <MonthWrapper>{prevReadingMonth}</MonthWrapper>
            <ArrowContainer onClick={downIndex} isDisabled={!isCanDown}>
              <RightChevronIcon />
            </ArrowContainer>
          </HeaderWrapper>

          <MetersInputsBlock
            handleUploadReading={handleUploadReading}
            reading={previousReading}
            rateType={device!.rateType}
            sliderIndex={sliderIndex}
            inputIndex={0}
            status={uploadingMetersStatuses[sliderIndex]}
          />
        </div>

        <div>
          <MonthWrapperWithMargin>
            {getReadingsMonthByShift(-1)}
          </MonthWrapperWithMargin>
          <MetersInputsBlock
            handleUploadReading={handleUploadReading}
            reading={currentReading}
            rateType={device!.rateType}
            sliderIndex={-1}
            inputIndex={0}
            status={uploadingMetersStatuses[-1]}
          />
        </div>
      </InputsWrapper>

      <ReadingHistoryButtonWrapper>
        <Tooltip title="История показаний">
          <HistoryIcon
            onClick={() => openReadingsHistoryModal(device!.id)}
            style={{ cursor: 'pointer' }}
          />
        </Tooltip>
      </ReadingHistoryButtonWrapper>
    </Wrapper>
  );
};
