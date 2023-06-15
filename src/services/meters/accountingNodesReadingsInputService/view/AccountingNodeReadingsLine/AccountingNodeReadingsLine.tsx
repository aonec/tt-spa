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
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { useHistory } from 'react-router-dom';
import { ContextMenuButton } from 'ui-kit/ContextMenuButton';
import moment from 'moment';
import { round } from 'utils/round';
import { useNodeReadings } from './AccountingNodeReadingsLine.hook';
import { getNodeReadingValue } from './AccountingNodeReadingsLine.utils';
import { AccountingNodeReadingsInputBlock } from '../AccountingNodeReadingsInputBlock';

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
}) => {
  const history = useHistory();

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
    const month = moment(
      previousExistingReadingBySliderIndex.readingDate,
    ).format('MMMM');

    return `Последнее показание: ${previousExistingReadingBySliderIndex.value} (${month})`;
  }, [previousExistingReadingBySliderIndex]);

  const handleChangeODPU = useCallback(
    () => history.push(`/changeODPU/${device.id}`),
    [history, device.id],
  );

  const handleEditODPU = useCallback(
    () => history.push(`/electricNode/${device.id}/edit`),
    [history, device.id],
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

      <div>{consumption}</div>

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
    </Wrapper>
  );
};
