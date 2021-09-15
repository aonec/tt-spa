import { getPreviousReadingsMonth } from '01/shared/lib/readings/getPreviousReadingsMonth';
import { Flex } from '01/shared/ui/Layout/Flex';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns:
    100px 6px 130px 160px 160px 47px minmax(100px, 135px)
    minmax(0, 80px);

  column-gap: 16px;
  color: var(--main-90);
  background-color: var(--main-4);
  border-bottom: 1px solid var(--frame);
  align-items: center;
  padding: 16px;

  font-size: 12px;
`;

export const HouseReadingsHeader: React.FC<{ sliderProps: any }> = ({
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
      <div>{getPreviousReadingsMonth(sliderIndex)}</div>
      <div onClick={onClickDecrease} style={{ cursor: 'pointer' }}>
        <b>{!isNextArrowDisabled && '>'}</b>
      </div>
    </Flex>
  );

  return (
    <Container>
      <div>ФИО собственника</div>
      <div></div>
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
