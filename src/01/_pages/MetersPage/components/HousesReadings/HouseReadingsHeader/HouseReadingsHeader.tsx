import styled from 'styled-components';
import React from 'react';
import { Flex } from '01/shared/ui/Layout/Flex';
import { getPreviousReadingsMonth } from '01/shared/lib/readings/getPreviousReadingsMonth';
import { apartmentIndividualDeviceMetersInputLineGridTemplate } from 'services/meters/individualDeviceMetersInputService/view/ApartmentIndividualDeviceMetersInputLine/ApartmentIndividualDeviceMetersInputLine.styled';

const Container = styled.div`
  display: grid;
  grid-template-columns: ${apartmentIndividualDeviceMetersInputLineGridTemplate};

  grid-gap: 15px;
  color: var(--main-90);
  background-color: var(--main-4);
  border-bottom: 1px solid var(--frame);
  align-items: center;
  padding-left: 10px;
  height: 60px;

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
