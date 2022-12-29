export type HouseReadingsHeaderProps = {
  sliderProps?: {
    onClickIncrease: () => void;
    onClickDecrease: () => void;
    isPreviousArrowDisabled: boolean;
    isNextArrowDisabled: boolean;
    sliderIndex: number;
  };
};
