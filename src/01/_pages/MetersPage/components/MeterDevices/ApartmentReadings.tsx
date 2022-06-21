import React from 'react';
import { useEffect } from 'react';
import ApartmentReadingLine from './components/ApartmentReadingLine';
import styled from 'styled-components';
import { useMonthSlider } from '../../../../shared/lib/readings/useMonthSlider';
import MonthSlider from '../../../../shared/ui/devices/MonthSlider';
import ClosedDevices from '../../../../shared/ui/devices/ClosedDevices';
import { EIndividualDeviceRateType } from '../../../../../myApi';
import { CloseIndividualDeviceModal } from '01/features/individualDevices/closeIndividualDevice';
import { useStore } from 'effector-react';
import {
  $individualDevices,
  $isShownClosedDevices,
  IndividualDevicesGate,
} from '01/features/individualDevices/displayIndividualDevices/models';
import { useParams } from 'react-router';
import { getPreviousReadingsMonth } from '01/shared/lib/readings/getPreviousReadingsMonth';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { ConfirmReadingValueModal } from '01/features/readings/readingsInput/confirmInputReadingModal';
import { ReadingsHistoryModal } from '01/features/readings/displayReadingHistory/ReadingsHistoryModal';
import { DeleteIndividualDeviceModalContainer } from '01/features/individualDevices/deleteIndividualDevice/DeleteIndividualDeviceModalContainer';

export const getIndividualDeviceRateNumByName = (
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

export const ApartmentReadings = () => {
  const devices = useStore($individualDevices);
  const { id } = useParams<{ id: string }>();
  const { sliderIndex, sliderProps, reset } = useMonthSlider(devices);
  const showClosed = useStore($isShownClosedDevices);

  useEffect(() => reset && reset(), [id]);

  const validDevicesList = devices.filter((device) =>
    showClosed ? true : device.closingDate === null
  );

  const isSliderIndexExist = sliderIndex !== undefined;

  const validDevices = !isSliderIndexExist
    ? []
    : validDevicesList.map((device, index) => (
        <ApartmentReadingLine
          closed={device.closingDate !== null}
          sliderIndex={sliderIndex!}
          key={device.id}
          device={device}
          numberOfPreviousReadingsInputs={validDevicesList
            .slice(0, index)
            .filter((elem) => elem.closingDate === null)
            .reduce(
              (acc, elem) =>
                acc + getIndividualDeviceRateNumByName(elem.rateType),
              0
            )}
        />
      ));

  return (
    <>
      <ReadingsHistoryModal />
      <IndividualDevicesGate ApartmentId={Number(id)} />
      <CloseIndividualDeviceModal />
      <ConfirmReadingValueModal />
      <DeleteIndividualDeviceModalContainer />
      {isSliderIndexExist && (
        <Meters id="meters-component">
          <MetersHeader>
            <Flex style={{ alignItems: 'center' }}>
              <div>Информация o приборe</div>
              <Space />
              <ClosedDevices />
            </Flex>
            {sliderProps ? <MonthSlider {...sliderProps} /> : null}
            <CenterContainer>{getPreviousReadingsMonth(-1)}</CenterContainer>
          </MetersHeader>
          {validDevices}
        </Meters>
      )}
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
