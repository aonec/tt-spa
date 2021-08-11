import React, { useEffect } from 'react';
import ApartmentReadingLine from './components/ApartmentReadingLine';
import { getMonthFromDate } from '../../../../utils/getMonthFromDate';
import { useDispatch, useSelector } from 'react-redux';
import { selectDevices } from '../../../../Redux/ducks/readings/selectors';
import { setDevices } from '../../../../Redux/ducks/readings/actionCreators';
import styled from 'styled-components';
import { useMonthSlider } from '../../../../shared/lib/readings/useMonthSlider';
import MonthSlider from '../../../../shared/ui/devices/MonthSlider';
import ClosedDevices from '../../../../shared/ui/devices/ClosedDevices';
import {
  EIndividualDeviceRateType,
  IndividualDeviceListItemResponse,
} from '../../../../../myApi';
import { CloseIndividualDeviceModal } from '01/features/individualDevices/closeIndividualDevice';

interface ApartmentReadingsProps {
  items: IndividualDeviceListItemResponse[];
}

const getIndividualDeviceRateNumByName = (
  rateType: EIndividualDeviceRateType
) => {
  const values = [
    EIndividualDeviceRateType.OneZone,
    EIndividualDeviceRateType.TwoZone,
    EIndividualDeviceRateType.ThreeZone,
  ];

  const res = values.reduce(
    (acc, elem, index) => (rateType === elem ? index + 1 : acc),
    1
  );

  return res;
};

export const ApartmentReadings = ({ items = [] }: ApartmentReadingsProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDevices(items));
  }, [items]);

  const devices = useSelector(selectDevices);

  const { sliderIndex, sliderProps } = useMonthSlider(items);

  if (!devices.length || sliderIndex === undefined) return null;

  const validDevicesList = devices.filter(
    (device) => device.closingDate === null
  );

  const validDevices = validDevicesList.map((device, index) => (
    <ApartmentReadingLine
      sliderIndex={sliderIndex}
      key={device.id}
      device={device}
      numberOfPreviousReadingsInputs={validDevicesList
        .slice(0, index)
        .reduce(
          (acc, elem) => acc + getIndividualDeviceRateNumByName(elem.rateType),
          0
        )}
    />
  ));

  const closedDevices = devices.filter((device) => device.closingDate !== null);

  const currentMonth = getMonthFromDate();

  return (
    <>
      <CloseIndividualDeviceModal />
      <Meters id="meters-component">
        <MetersHeader>
          <span>Информация o приборe</span>
          {sliderProps ? (
            <MonthSlider sliderIndex={sliderIndex} {...sliderProps} />
          ) : null}
          <CenterContainer>{currentMonth}</CenterContainer>
        </MetersHeader>
        {validDevices}
        <ClosedDevices devices={closedDevices} />
      </Meters>
    </>
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

export const ArrowContainer = styled.div<{ isDisabled: boolean }>`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  svg {
    opacity: 0.7;
    fill: ${({ isDisabled }) =>
      isDisabled ? 'var(--main-32)' : 'var(--main-100)'};
    &:hover {
      opacity: ${({ isDisabled }) => (isDisabled ? 0.7 : 1)};
      fill: ${({ isDisabled }) =>
        isDisabled ? 'var(--main-32)' : 'var(--primary-100)'};
    }
  }
`;

export const CenterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
