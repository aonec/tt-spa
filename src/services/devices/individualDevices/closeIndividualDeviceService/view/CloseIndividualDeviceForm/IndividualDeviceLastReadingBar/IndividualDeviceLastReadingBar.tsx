import React, { FC } from 'react';
import { useUnit } from 'effector-react';
import { Tooltip } from 'antd';
import dayjs from 'dayjs';
import { IndividualDeviceLastReadingBarProps } from './IndividualDeviceLastReadingBar.types';
import {
  DeviceInfoWrapper,
  GroupWrapper,
  InputsWrapper,
  MonthWrapper,
  ReadingHistoryButtonWrapper,
  RightBlock,
  SerialNumberWrapper,
  TitleWrapper,
  Wrapper,
} from './IndividualDeviceLastReadingBar.styled';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import { HistoryIcon } from 'ui-kit/icons';
import { MetersInputsBlock } from 'services/meters/individualDeviceMetersInputService/view/MetersInputsBlock';
import { apartmentIndividualDevicesMetersService } from 'services/meters/apartmentIndividualDevicesMetersService';

export const IndividualDeviceLastReadingBar: FC<
  IndividualDeviceLastReadingBarProps
> = ({ resource, title, model, serialNumber, device, lastReading }) => {
  const { openReadingsHistoryModal } = useUnit({
    openReadingsHistoryModal:
      apartmentIndividualDevicesMetersService.inputs.openReadingsHistoryModal,
  });

  return (
    <Wrapper>
      <DeviceInfoWrapper>
        <TitleWrapper>{title}</TitleWrapper>
        <GroupWrapper>
          {resource && <ResourceIconLookup resource={resource} />}
          <SerialNumberWrapper>
            {serialNumber || 'Серийный номер'}
          </SerialNumberWrapper>
          {model || 'Модель'}
        </GroupWrapper>
      </DeviceInfoWrapper>

      <RightBlock>
        <InputsWrapper>
          <MonthWrapper>
            {dayjs(lastReading?.actualReadingDate).format('MMMM')}
          </MonthWrapper>
          {device?.rateType && (
            <MetersInputsBlock
              reading={lastReading}
              rateType={device.rateType}
              sliderIndex={-1}
              inputIndex={0}
              isDisabled
            />
          )}
        </InputsWrapper>

        <ReadingHistoryButtonWrapper>
          {device?.id && (
            <Tooltip title="История показаний">
              <HistoryIcon
                onClick={() => openReadingsHistoryModal(device.id)}
                style={{ cursor: 'pointer' }}
              />
            </Tooltip>
          )}
        </ReadingHistoryButtonWrapper>
      </RightBlock>
    </Wrapper>
  );
};
