import { IndividualDeviceListItemResponse } from '../../../../myApi';
import { useState } from 'react';
import { IndividualDeviceType } from '../../../../types/types';

export const useMonthSlider = (
  items: IndividualDeviceListItemResponse[] | IndividualDeviceType[] | null = []
) => {
  const [sliderIndex, setSliderIndex] = useState(0);

  if (!items || !items.length) return {};

  const isPreviousArrowDisabled = sliderIndex === 3;

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
    reset() {
      setSliderIndex(0);
    },
  };
};
