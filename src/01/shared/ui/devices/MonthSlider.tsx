import React from 'react';
import Arrow from '../../../_components/Arrow/Arrow';
import { getPreviousReadingsMonth } from '../../lib/readings/getPreviousReadingsMonth';
import { ArrowContainer, CenterContainer } from './MonthSlider.styled';

interface MonthSliderInterface {
  onClickDecrease: () => void;
  onClickIncrease: () => void;
  isPreviousArrowDisabled: boolean;
  isNextArrowDisabled: boolean;
  sliderIndex: number;
}

const MonthSlider = ({
  onClickDecrease,
  onClickIncrease,
  isPreviousArrowDisabled,
  isNextArrowDisabled,
  sliderIndex,
}: MonthSliderInterface) => {
  return (
    <CenterContainer>
      <ArrowContainer
        onClick={onClickIncrease}
        isDisabled={isPreviousArrowDisabled}
      >
        <Arrow />
      </ArrowContainer>
      <CenterContainer>{getPreviousReadingsMonth(sliderIndex)}</CenterContainer>
      <ArrowContainer
        isDisabled={isNextArrowDisabled}
        onClick={onClickDecrease}
        style={{ transform: 'rotate(180deg)' }}
      >
        <Arrow />
      </ArrowContainer>
    </CenterContainer>
  );
};

export default MonthSlider;
