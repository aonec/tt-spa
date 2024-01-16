import React, { FC, useCallback, useMemo, useState } from 'react';
import { IndividualDeviceCarouselInputsBarProps } from './IndividualDeviceCarouselInputsBar.types';
import {
  GroupWrapper,
  HeaderWrapper,
  InputsWrapper,
  MonthWrapperWithMargin,
  SerialNumberWrapper,
  TitleWrapper,
  Wrapper,
} from './IndividualDeviceCarouselInputsBar.styled';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import { MetersInputsBlockPure } from 'services/meters/individualDeviceMetersInputService/view/MetersInputsBlock/MeterInputsBlockPure';
import { getIndividualDeviceRateNumByName } from 'utils/getIndividualDeviceRateNumByName';
import { getReadingsMonthByShift } from 'services/meters/apartmentIndividualDevicesMetersService/apartmentIndividualDevicesMetersService.utils';
import { ChevronIcon } from 'ui-kit/icons';
import {
  ArrowContainer,
  RightChevronIcon,
} from 'services/meters/metersService/AccountingNodesReadingsService/view/AccountingNodesList/AccountingNodesListHeader/AccountingNodesListHeader.styled';
import { MonthWrapper } from 'services/devices/housingMeteringDevices/housingMeteringDeviceReadingsService/view/MeteringDeviceMonthReading/MeteringDeviceMonthReading.styled';

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
}) => {
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
          <MetersInputsBlockPure
            handleReadingInputChange={(e) =>
              onChange &&
              onChange({
                ...readings,
                [sliderIndex]: {
                  ...readings?.[sliderIndex],
                  [e.target.name]: e.target.value,
                },
              })
            }
            rateNum={getIndividualDeviceRateNumByName(rateType)}
            bufferedReadingValues={readings[sliderIndex]}
            isDisabled={disabled}
          />
        </div>
        <div>
          <MonthWrapperWithMargin>
            {getReadingsMonthByShift(-1)}
          </MonthWrapperWithMargin>
          <MetersInputsBlockPure
            handleReadingInputChange={(e) =>
              onChange &&
              onChange({
                ...readings,
                [-1]: {
                  ...readings?.[-1],
                  [e.target.name]: e.target.value,
                },
              })
            }
            rateNum={getIndividualDeviceRateNumByName(rateType)}
            bufferedReadingValues={readings[-1]}
            resource={resource || undefined}
            isDisabled={disabled}
          />
        </div>
      </InputsWrapper>
    </Wrapper>
  );
};
