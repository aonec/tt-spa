import React, { FC } from 'react';
import {
  ArrowContainer,
  CurrentMonth,
  MonthSliderWrapper,
  Wrapper,
} from './HousesIndividualDevicesHeader.styled';
import { HousesIndividualDevicesHeaderProps } from './HousesIndividualDevicesHeader.types';
import { ChevronIcon } from 'ui-kit/icons';

export const HousesIndividualDevicesHeader: FC<
  HousesIndividualDevicesHeaderProps
> = ({
  prevReadingMonth,
  currentReadingMonth,
  upSliderIndex,
  downSliderIndex,
  isCanUp,
  isCanDown,
}) => {
  return (
    <Wrapper>
      <div>№ кв.</div>
      <div>Прибор</div>
      <MonthSliderWrapper>
        <ArrowContainer onClick={upSliderIndex} isDisabled={!isCanUp}>
          <ChevronIcon />
        </ArrowContainer>
        <div>{prevReadingMonth}</div>
        <ArrowContainer
          isRight
          onClick={downSliderIndex}
          isDisabled={!isCanDown}
        >
          <ChevronIcon />
        </ArrowContainer>
      </MonthSliderWrapper>
      <CurrentMonth>{currentReadingMonth}</CurrentMonth>
      <div>Потребление</div>
    </Wrapper>
  );
};
