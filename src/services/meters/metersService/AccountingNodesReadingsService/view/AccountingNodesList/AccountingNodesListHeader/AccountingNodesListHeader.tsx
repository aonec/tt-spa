import React, { FC, useMemo } from 'react';
import {
  ArrowContainer,
  MonthWrapper,
  RightChevronIcon,
  TextWrapper,
  Wrapper,
} from './AccountingNodesListHeader.styled';
import { AccountingNodesListHeaderProps } from './AccountingNodesListHeader.types';
import { getReadingsMonthByShift } from 'services/meters/apartmentIndividualDevicesMetersService/apartmentIndividualDevicesMetersService.utils';
import { PREVIOUS_READING_INDEX_LIMIT } from '../../../AccountingNodesReadingsService.constants';
import { ChevronIcon } from 'ui-kit/icons';

export const AccountingNodesListHeader: FC<AccountingNodesListHeaderProps> = ({
  downSliderIndex,
  sliderIndex,
  upSliderIndex,
}) => {
  const prevReadingMonth = useMemo(
    (): string => getReadingsMonthByShift(sliderIndex),
    [sliderIndex],
  );
  const currentReadingMonth = useMemo(() => getReadingsMonthByShift(-1), []);

  const isCanUp = useMemo(
    () => sliderIndex < PREVIOUS_READING_INDEX_LIMIT,
    [sliderIndex],
  );
  const isCanDown = useMemo(() => sliderIndex > 0, [sliderIndex]);

  return (
    <Wrapper>
      <TextWrapper>Прибор</TextWrapper>
      <TextWrapper>Коэф. трансф.</TextWrapper>
      <TextWrapper>
        <ArrowContainer onClick={upSliderIndex} isDisabled={!isCanUp}>
          <ChevronIcon />
        </ArrowContainer>
        <MonthWrapper>{prevReadingMonth}</MonthWrapper>
        <ArrowContainer onClick={downSliderIndex} isDisabled={!isCanDown}>
          <RightChevronIcon />
        </ArrowContainer>
      </TextWrapper>
      <MonthWrapper>{currentReadingMonth}</MonthWrapper>

      <TextWrapper>Общ. потр.</TextWrapper>
      <TextWrapper>Расход на нежил. пом.</TextWrapper>
    </Wrapper>
  );
};
