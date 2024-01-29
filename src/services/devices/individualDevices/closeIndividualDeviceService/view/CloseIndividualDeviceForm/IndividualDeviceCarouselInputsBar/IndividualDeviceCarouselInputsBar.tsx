import React, { FC, useCallback, useMemo, useState } from 'react';
import { IndividualDeviceCarouselInputsBarProps } from './IndividualDeviceCarouselInputsBar.types';
import {
  GroupWrapper,
  InputsWrapper,
  MonthWrapperWithMargin,
  ReadingHistoryButtonWrapper,
  SerialNumberWrapper,
  TitleWrapper,
  Wrapper,
} from './IndividualDeviceCarouselInputsBar.styled';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import { getReadingsMonthByShift } from 'services/meters/apartmentIndividualDevicesMetersService/apartmentIndividualDevicesMetersService.utils';
import { HistoryIcon } from 'ui-kit/icons';
import { MetersInputsBlock } from 'services/meters/individualDeviceMetersInputService/view/MetersInputsBlock';
import { getPreparedReadingsDictionary } from 'services/meters/individualDeviceMetersInputService/individualDeviceMetersInputService.utils';
import { IndividualDeviceReadingsResponse } from 'api/types';
import { useUnit } from 'effector-react';
import { apartmentIndividualDevicesMetersService } from 'services/meters/apartmentIndividualDevicesMetersService';
import { Tooltip } from 'antd';

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
  const { openReadingsHistoryModal } = useUnit({
    openReadingsHistoryModal:
      apartmentIndividualDevicesMetersService.inputs.openReadingsHistoryModal,
  });

  const { currentReading, preparedReadingsData } = useMemo(() => {
    const preparedReadingsData = getPreparedReadingsDictionary(
      device?.readings || [],
    );

    const currentReading: IndividualDeviceReadingsResponse | undefined =
      preparedReadingsData[-1];

    return { currentReading, preparedReadingsData };
  }, [device]);

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
          <MonthWrapperWithMargin>
            {getReadingsMonthByShift(-1)}
          </MonthWrapperWithMargin>
          <MetersInputsBlock
            reading={currentReading}
            rateType={device!.rateType}
            sliderIndex={-1}
            inputIndex={0}
            isDisabled
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
