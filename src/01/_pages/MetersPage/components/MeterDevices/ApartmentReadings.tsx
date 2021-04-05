import React, { useEffect } from 'react';
import ApartmentReadingLine from './components/ApartmentReadingLine';
import { getMonthFromDate } from '../../../../utils/getMonthFromDate';
import { useDispatch, useSelector } from 'react-redux';
import { selectDevices } from '../../../../Redux/ducks/readings/selectors';
import { setDevices } from '../../../../Redux/ducks/readings/actionCreators';
import { IndividualDeviceType } from '../../../../../types/types';
import styled from 'styled-components';
import { useSwitchOnInputs } from '../../../../hooks/useSwitchInputsOnEnter';
import { useMonthSlider } from '../../../../shared/lib/readings/useMonthSlider';
import MonthSlider from '../../../../shared/ui/readings/MonthSlider';

interface ApartmentReadingsProps {
  items: IndividualDeviceType[];
}

export const ApartmentReadings = ({ items = [] }: ApartmentReadingsProps) => {
  const dispatch = useDispatch();

  useSwitchOnInputs();

  useEffect(() => {
    dispatch(setDevices(items));
  }, [items]);

  const devices = useSelector(selectDevices);
  const { sliderIndex, sliderProps } = useMonthSlider(items);

  if (!devices.length || sliderIndex === undefined) return null;

  const readings = devices.map((device) => (
    <ApartmentReadingLine
      sliderIndex={sliderIndex}
      key={device.id}
      device={device}
    />
  ));

  const currentMonth = getMonthFromDate();

  return (
    <Meters>
      <MetersHeader>
        <span>Информация o приборe</span>
        {sliderProps ? (
          <MonthSlider sliderIndex={sliderIndex} {...sliderProps} />
        ) : null}
        <CenterContainer>{currentMonth}</CenterContainer>
      </MetersHeader>
      {readings}
    </Meters>
  );
};

export const Meters = styled.div`
  grid-template-columns: minmax(250px, 350px) auto minmax(300px, 350px);
`;

export const MetersHeader = styled.div`
  display: grid;
  grid-template-columns: minmax(330px, 5.5fr) 2.25fr 2.25fr 2fr;
  border-bottom: 1px solid var(--frame);
  padding: 8px 16px;
  column-gap: 16px;
  height: 48px;
  background: var(--bg);
  align-items: center;
  color: var(--main-90);
`;

export const ArrowContainer = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  svg {
    opacity: 0.7;
    &:hover {
      opacity: 1;
    }
  }
`;

export const CenterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
