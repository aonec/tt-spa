import React, { FC, useCallback, useMemo, useState } from 'react';
import {
  GroupWrapper,
  HeaderWrapper,
  InputsWrapper,
  MonthWrapperWithMargin,
  SerialNumberWrapper,
  TitleWrapper,
  Wrapper,
} from './WorkWithIndividualDeviceInputs.styled';
import { WorkWithIndividualDeviceInputsProps } from './WorkWithIndividualDeviceInputs.types';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { MetersInputsBlockPure } from 'services/meters/individualDeviceMetersInputService/view/MetersInputsBlock/MeterInputsBlockPure';
import { getIndividualDeviceRateNumByName } from 'utils/getIndividualDeviceRateNumByName';
import { getReadingsMonthByShift } from 'services/meters/apartmentIndividualDevicesMetersService/apartmentIndividualDevicesMetersService.utils';
import { ChevronIcon } from 'ui-kit/icons';
import {
  ArrowContainer,
  RightChevronIcon,
} from 'services/meters/metersService/AccountingNodesReadingsService/view/AccountingNodesList/AccountingNodesListHeader/AccountingNodesListHeader.styled';
import { MonthWrapper } from 'services/devices/housingMeteringDevices/housingMeteringDeviceReadingsService/view/MeteringDeviceMonthReading/MeteringDeviceMonthReading.styled';

export const WorkWithIndividualDeviceInputs: FC<
  WorkWithIndividualDeviceInputsProps
> = ({
  resource,
  rateType,
  title,
  model,
  serialNumber,
  readings,
  onChange,
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
              onChange({
                ...readings,
                [sliderIndex]: {
                  ...readings?.[sliderIndex],
                  [e.target.name]:
                    e.target.value !== '' ? Number(e.target.value) : null,
                },
              })
            }
            rateNum={getIndividualDeviceRateNumByName(rateType)}
            bufferedReadingValues={readings[sliderIndex]}
          />
        </div>
        <div>
          <MonthWrapperWithMargin>
            {getReadingsMonthByShift(-1)}
          </MonthWrapperWithMargin>
          <MetersInputsBlockPure
            handleReadingInputChange={(e) =>
              onChange({
                ...readings,
                [-1]: {
                  ...readings?.[-1],
                  [e.target.name]:
                    e.target.value !== '' ? Number(e.target.value) : null,
                },
              })
            }
            rateNum={getIndividualDeviceRateNumByName(rateType)}
            bufferedReadingValues={readings[-1]}
            resource={resource || undefined}
          />
        </div>
      </InputsWrapper>
    </Wrapper>
  );
};
