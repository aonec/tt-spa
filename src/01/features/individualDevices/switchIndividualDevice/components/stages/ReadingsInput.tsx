import React from 'react';
import { useState } from 'react-router/node_modules/@types/react';

export interface ReadingInputElem {
  value1: number | null;
  value2?: number | null;
  value3?: number | null;
  value4?: number | null;
  readingDate: string;
}

interface Props {
  readings: ReadingInputElem[];
  onChange: (readings: ReadingInputElem[]) => void;
}

function useSliderIndex() {
  const [sliderIndex, setSliderIndex] = useState(0);

  return {
    sliderIndex,
    up() {
      setSliderIndex((prev) => ++prev);
    },
    down() {
      setSliderIndex((prev) => --prev);
    },
  };
}

export const ReadingsInput: React.FC<Props> = ({ readings }) => {
  const { sliderIndex, up, down } = useSliderIndex();

  return <></>;
};
