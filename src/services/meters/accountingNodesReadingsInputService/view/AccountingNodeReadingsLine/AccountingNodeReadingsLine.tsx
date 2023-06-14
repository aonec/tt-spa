import React, { FC, useCallback, useMemo } from 'react';
import {
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
import { AccountingNodeReadingsInputBlock } from '../AccountingNodeReadingsInputBlock';
import moment from 'moment';
import { round } from 'utils/round';

export const AccountingNodeReadingsLine: FC<
  AccountingNodeReadingsLineProps
> = ({
  device,
  sliderIndex,
  deviceIndex,
  currentReading,
  previousExistingReadingBySliderIndex,
  previousReading,
  deviceInputStatuses,
  handleSendReading,
  deviceNonResConsumptionInputStatuses,
}) => {
  const history = useHistory();

  const consumption = useMemo(() => {
    const previousReadingValue = previousReading?.value || null;
    const currentReadingValue = currentReading?.value || null;

    return (
      <div>
        {previousReadingValue && currentReadingValue
          ? `${round(currentReadingValue - previousReadingValue, 3)} кВт/ч`
          : null}
      </div>
    );
  }, [previousReading, currentReading]);

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
        handleSendReading={(payload) =>
          handleSendReading({
            ...payload,
            nonResidentialRoomConsumption:
              currentReading?.nonResidentialRoomConsumption,
          })
        }
        readingValue={previousReading?.value || null}
        readingDate={previousReading?.readingDate}
        sliderIndex={sliderIndex}
        status={deviceInputStatuses[sliderIndex]}
        tooltip={(!previousReading && previousReadingTooltipTitle) || ''}
        inputIndex={deviceIndex}
        dataKey="previuos"
      />

      <AccountingNodeReadingsInputBlock
        handleSendReading={(payload) =>
          handleSendReading({
            ...payload,
            nonResidentialRoomConsumption:
              currentReading?.nonResidentialRoomConsumption,
          })
        }
        readingValue={currentReading?.value || null}
        readingDate={currentReading?.readingDate}
        resource={device.resource}
        sliderIndex={-1}
        status={deviceInputStatuses[-1]}
        inputIndex={deviceIndex}
        tooltip={
          (!previousReading &&
            !currentReading &&
            previousReadingTooltipTitle) ||
          ''
        }
        dataKey="current"
      />
      <div>{consumption}</div>
      {currentReading ? (
        <AccountingNodeReadingsInputBlock
          handleSendReading={({ readingDate, value }) =>
            handleSendReading({
              value: currentReading.value,
              readingDate,
              nonResidentialRoomConsumption: value,
            })
          }
          readingValue={currentReading?.nonResidentialRoomConsumption || null}
          sliderIndex={-1}
          status={deviceNonResConsumptionInputStatuses[currentReading.id]}
          inputIndex={deviceIndex}
          dataKey="nonResidentialRoomConsumption"
        />
      ) : (
        <div />
      )}

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
