import Arrow from '01/_components/Arrow/Arrow';
import React, { FC, useState } from 'react';
import {
  ArrowContainer,
  Input,
  TextWrapper,
  TitleWrapper,
  Wrapper,
} from './Slider.styled';
import { SliderProps } from './Slider.types';

export const Slider: FC<SliderProps> = ({
  values,
  onChange,
  inputs 
}) => {
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

  return (
    <>
      <Wrapper>
        {Boolean(limit) && (
          <ArrowContainer onClick={up} isDisabled={!canUp}>
            <Arrow />
          </ArrowContainer>
        )}
        <TextWrapper>{values[sliderIndex]?.text}</TextWrapper>
        {Boolean(limit) && (
          <ArrowContainer
            onClick={down}
            isDisabled={!canDown}
            style={{ transform: 'rotate(180deg)' }}
          >
            <Arrow />
          </ArrowContainer>
        )}
      </Wrapper>
      {inputs.map(({color, inputType, field, title}) => (
        <>
          {title && <TitleWrapper>{title}</TitleWrapper>}
          <Input
            color={color}
            type={inputType}
            value={String(values[sliderIndex]?.[field] || '')}
            onChange={(e) =>
              onChange({
                values: { [field]: e.target.value },
                id: values[sliderIndex].id!,
              })
            }
          />
        </>
      ))}
    </>
  );
};
