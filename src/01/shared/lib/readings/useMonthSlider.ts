import { IndividualDeviceListItemResponse } from '../../../../myApi';
import { getMonthFromDate } from '../../../utils/getMonthFromDate';
import { useState } from 'react';
import { IndividualDeviceType } from '../../../../types/types';

export const useMonthSlider = (
  items:
    | IndividualDeviceListItemResponse[]
    | IndividualDeviceType[]
    | null = [],
) => {
  const [sliderIndex, setSliderIndex] = useState(0);

  if (!items || !items.length || !items[0].readings?.length) return {};
  const currentMonth = getMonthFromDate();
  const isReadingsCurrent =
    currentMonth === getMonthFromDate(items[0].readings![0].readingDate);
  const readingsLength = items[0].readings?.length;

  const isPreviousArrowDisabled =
    sliderIndex + 1 > readingsLength - Number(isReadingsCurrent) - 1;

  const onClickIncrease = () => {
    setSliderIndex((index) => {
      return isPreviousArrowDisabled ? index : index + 1;
    });
  };

  const isNextArrowDisabled = sliderIndex - 1 < 0;

  const onClickDecrease = () => {
    setSliderIndex((index) => {
      return isNextArrowDisabled ? index : index - 1;
    });
  };

  return {
    sliderIndex,
    sliderProps: {
      onClickIncrease,
      onClickDecrease,
      isPreviousArrowDisabled,
      isNextArrowDisabled,
    },
  };
};
