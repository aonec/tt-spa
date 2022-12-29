import React, { FC } from 'react';
import { HouseReadingsHeaderProps } from './HouseReadingsHeader.types';
import { Flex } from '01/shared/ui/Layout/Flex';
import { getPreviousReadingsMonth } from '01/shared/lib/readings/getPreviousReadingsMonth';
import { Container } from './HouseReadingsHeader.styled';

export const HouseReadingsHeader: React.FC<HouseReadingsHeaderProps> = ({
  sliderProps,
}) => {
  const {
    onClickIncrease,
    onClickDecrease,
    isPreviousArrowDisabled,
    isNextArrowDisabled,
    sliderIndex,
  } = sliderProps || {};

  const readigsSlider = (
    <Flex style={{ justifyContent: 'space-between' }}>
      <div onClick={onClickIncrease} style={{ cursor: 'pointer' }}>
        <b>{!isPreviousArrowDisabled && '<'}</b>
      </div>
      <div>{getPreviousReadingsMonth(sliderIndex || 0)}</div>
      <div onClick={onClickDecrease} style={{ cursor: 'pointer' }}>
        <b>{!isNextArrowDisabled && '>'}</b>
      </div>
    </Flex>
  );

  return (
    <Container>
      <div>№ кв.</div>
      <div>Прибор</div>
      {readigsSlider}
      <Flex style={{ justifyContent: 'center' }}>
        {getPreviousReadingsMonth(-1)}
      </Flex>
      <div>Потребл.</div>
      <div>Комментарии</div>
      <div></div>
    </Container>
  );
};
