import React, { FC, useCallback, useState } from 'react';
import { CustomInput } from '../CustomInput';
import { ArrowContainer, TextWrapper, Wrapper } from './Slider.styled';
import { SliderProps } from './Slider.types';
import { ChevronBoldIcon } from 'ui-kit/icons';

export const Slider: FC<SliderProps> = ({ values, onChange, inputs }) => {
  const limit = values.length - 1;
  const [sliderIndex, setSliderIndex] = useState(0);
  const canUp = sliderIndex < limit;
  const canDown = sliderIndex > 0;
  const up = () => {
    setSliderIndex((prev) => (prev !== limit ? ++prev : prev));
  };
  const down = () => {
    setSliderIndex((prev) => (prev !== 0 ? --prev : prev));
  };

  const handleChange = useCallback(
    ({ value, field }: { value: string; field: string }) => {
      onChange({
        values: { [field]: value },
        id: values[sliderIndex].id!,
      });
    },
    [onChange, sliderIndex, values],
  );

  return (
    <>
      <Wrapper>
        {Boolean(limit) && (
          <ArrowContainer onClick={up} isDisabled={!canUp}>
            <ChevronBoldIcon />
          </ArrowContainer>
        )}
        <TextWrapper>{values[sliderIndex]?.text}</TextWrapper>
        {Boolean(limit) && (
          <ArrowContainer
            onClick={down}
            isDisabled={!canDown}
            style={{ transform: 'rotate(180deg)' }}
          >
            <ChevronBoldIcon />
          </ArrowContainer>
        )}
      </Wrapper>
      {inputs.map(({ color, inputType, field, title }) => (
        <CustomInput
          key={field}
          configuration={{ color, inputType, title }}
          onChange={(value) => handleChange({ value, field })}
          value={String(values[sliderIndex]?.[field] || '')}
        />
      ))}
    </>
  );
};
