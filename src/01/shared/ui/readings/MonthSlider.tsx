import React from 'react';
import Arrow from '../../../_components/Arrow/Arrow';
import {
  ArrowContainer,
  CenterContainer,
} from '../../../_pages/MetersPage/components/MeterDevices/ApartmentReadings';
import { getPreviousReadingsMonth } from '../../lib/readings/getPreviousReadingsMonth';
import styles from '../../../_pages/MetersPage/components/MeterDevices/MeterDevicesNew.module.scss';

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
        className={
          isPreviousArrowDisabled ? styles.arrowDisabled : styles.arrowEnabled
        }
      >
        <Arrow />
      </ArrowContainer>
      <CenterContainer>{getPreviousReadingsMonth(sliderIndex)}</CenterContainer>
      <ArrowContainer
        className={
          isNextArrowDisabled ? styles.arrowDisabled : styles.arrowEnabled
        }
        onClick={onClickDecrease}
        style={{ transform: 'rotate(180deg)' }}
      >
        <Arrow />
      </ArrowContainer>
    </CenterContainer>
  );
};

export default MonthSlider;
