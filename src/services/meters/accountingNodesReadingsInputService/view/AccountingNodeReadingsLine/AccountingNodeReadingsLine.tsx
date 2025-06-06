import React, { FC, useCallback, useEffect, useMemo } from 'react';
import {
  ContextMenuWrapper,
  DeviceInfo,
  DeviceModelWrapper,
  DeviceSerialNumberWrapper,
  IconWrapper,
  Wrapper,
} from './AccountingNodeReadingsLine.styled';
import { AccountingNodeReadingsLineProps } from './AccountingNodeReadingsLine.types';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import { useNavigate } from 'react-router-dom';
import { ContextMenuButton } from 'ui-kit/ContextMenuButton';
import dayjs from 'api/dayjs';
import { round } from 'utils/round';
import { useNodeReadings } from './AccountingNodeReadingsLine.hook';
import { getNodeReadingValue } from './AccountingNodeReadingsLine.utils';
import { AccountingNodeReadingsInputBlock } from '../AccountingNodeReadingsInputBlock';
import { HistoryIcon } from 'ui-kit/icons';

export const AccountingNodeReadingsLine: FC<
  AccountingNodeReadingsLineProps
> = ({
  device,
  sliderIndex,
  deviceIndex,
  deviceInputStatuses,
  handleValidateReading,
  deviceNonResConsumptionInputStatuses,
  handleSendNonResConsumption,
  readings,
  handleUpdateReadingsSum,
  handleOpenHistory,
}) => {
  const navigate = useNavigate();

  const {
    currentReading,
    previousExistingReadingBySliderIndex,
    previousExistingReading,
    previousReadingReadingBySliderIndex,
  } = useNodeReadings(readings, sliderIndex);

  const consumption = useMemo(() => {
    const previousReadingValue =
      previousReadingReadingBySliderIndex?.value || null;
    const currentReadingValue = currentReading?.value || null;

    return (
      <div>
        {previousReadingValue && currentReadingValue
          ? `${round(currentReadingValue - previousReadingValue, 3)} кВт/ч`
          : null}
      </div>
    );
  }, [previousReadingReadingBySliderIndex, currentReading]);

  const previousReadingTooltipTitle = useMemo(() => {
    if (!previousExistingReadingBySliderIndex) {
      return null;
    }
    const month = dayjs(
      previousExistingReadingBySliderIndex.readingDate,
    ).format('MMMM');

    return `Последнее показание: ${previousExistingReadingBySliderIndex.value} (${month})`;
  }, [previousExistingReadingBySliderIndex]);

  const handleChangeODPU = useCallback(
    () => navigate(`/changeODPU/${device.id}`),
    [navigate, device.id],
  );

  const handleEditODPU = useCallback(
    () => navigate(`/electricNode/${device.id}/edit`),
    [navigate, device.id],
  );

  useEffect(() => {
    handleUpdateReadingsSum({
      currentReading,
      previousExistingReading,
    });
  }, [previousExistingReading, currentReading, handleUpdateReadingsSum]);

  return (
    <Wrapper>
      <DeviceInfo>
        <IconWrapper>
          <ResourceIconLookup resource={device.resource} />
        </IconWrapper>
        <DeviceSerialNumberWrapper>
          {device?.serialNumber}
          <DeviceModelWrapper>{device?.model}</DeviceModelWrapper>
        </DeviceSerialNumberWrapper>
      </DeviceInfo>
      <div>{device?.scaleFactor}</div>
      <AccountingNodeReadingsInputBlock
        handleSendReading={(payload) => {
          handleValidateReading({
            ...payload,
            reading: previousReadingReadingBySliderIndex,
          });
        }}
        readingValue={getNodeReadingValue(previousReadingReadingBySliderIndex)}
        readingDate={previousReadingReadingBySliderIndex?.readingDate}
        sliderIndex={sliderIndex}
        status={deviceInputStatuses[sliderIndex]}
        tooltip={
          (!previousReadingReadingBySliderIndex &&
            previousReadingTooltipTitle) ||
          ''
        }
        inputIndex={deviceIndex}
        dataKey="previous-accounting-node-block"
      />

      <AccountingNodeReadingsInputBlock
        handleSendReading={(payload) => {
          handleValidateReading({
            ...payload,
            reading: currentReading,
          });
        }}
        readingValue={getNodeReadingValue(currentReading)}
        readingDate={currentReading?.readingDate}
        resource={device.resource}
        sliderIndex={-1}
        status={deviceInputStatuses[-1]}
        inputIndex={deviceIndex}
        tooltip={
          (!previousReadingReadingBySliderIndex &&
            !currentReading &&
            previousReadingTooltipTitle) ||
          ''
        }
        dataKey="current-accounting-node-block"
      />
      <div>{consumption}</div>
      {currentReading ? (
        <AccountingNodeReadingsInputBlock
          handleSendReading={({ value }) => {
            handleSendNonResConsumption({
              oldReadingId: currentReading.id,
              nonResidentialRoomConsumption: value || 0,
            });
          }}
          readingValue={currentReading.nonResidentialRoomConsumption}
          sliderIndex={-1}
          status={deviceNonResConsumptionInputStatuses[currentReading.id]}
          withoutDate
          dataKey="nonResidentialRoomConsumption-accounting-node-block"
        />
      ) : (
        <div />
      )}

      <HistoryIcon onClick={() => handleOpenHistory(device.id)} />

      <ContextMenuWrapper>
        <ContextMenuButton
          size="small"
          menuButtons={[
            {
              title: 'Заменить прибор',
              onClick: handleChangeODPU,
            },
            {
              title: 'Редактировать прибор',
              onClick: handleEditODPU,
            },
          ]}
        />
      </ContextMenuWrapper>
    </Wrapper>
  );
};
