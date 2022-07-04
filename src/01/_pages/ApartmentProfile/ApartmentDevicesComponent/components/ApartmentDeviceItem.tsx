import React from 'react';
import styled from 'styled-components';
import ReadingsBlock from '../../../MetersPage/components/MeterDevices/components/ReadingsBlock';
import ApartmentDevice from './ApartmentDevice';
import {
  EIndividualDeviceRateType,
  IndividualDeviceListItemResponse,
  IndividualDeviceReadingsResponse,
} from '../../../../../myApi';
import IsActive from '../../../../tt-components/IsActive';
import moment from 'time';
import { getIndividualDeviceRateNumByName } from '01/_pages/MetersPage/components/MeterDevices/ApartmentReadings';
import { getResourceColor } from '01/features/individualDevices/switchIndividualDevice/components/DeviceDataString';
import { Flex } from '01/shared/ui/Layout/Flex';
import { ReadingsHistoryButton } from "ui-kit/shared_components/reading_history_button";

export function ApartmentDeviceItem({
  device,
  sliderIndex,
}: {
  device: IndividualDeviceListItemResponse;
  sliderIndex: number;
}) {
  const isActive = device?.closingDate !== null;

  const readings: IndividualDeviceReadingsResponse[] = device.readings!;

  const currentReading = readings
    .filter((elem) => moment().diff(elem.readingDateTime, 'months') < 11)
    .filter(
      (elem) => moment().month() === moment(elem.readingDateTime).month()
    )[0];

  const preparedReadingsArrWithEmpties = device.readings?.reduce(
    (acc, elem) => {
      const dateFormat = 'YYYY-MM';

      const currentMonthDate = moment(moment().format(dateFormat), dateFormat);
      const readingMonthDate = moment(
        moment(elem.readingDateTime).format(dateFormat)
      );

      if (currentMonthDate.diff(readingMonthDate, 'months') > 11) return acc;

      const index = currentMonthDate.diff(readingMonthDate, 'months') - 1;

      acc[index] = elem;

      return acc;
    },
    {} as { [key: number]: IndividualDeviceReadingsResponse }
  );

  const previousReading: IndividualDeviceReadingsResponse = preparedReadingsArrWithEmpties![
    sliderIndex
  ];

  const previousReadingsArray = getValuesArray(
    previousReading || [],
    device.rateType
  );
  const currentReadingsArray = getValuesArray(
    currentReading || [],
    device.rateType
  );

  const previousDeviceReadings = previousReadingsArray?.map((value, index) => (
    <ReadingsBlock
      key={device.id + index}
      index={index}
      value={value}
      resource={device?.resource!}
      operatorCabinet
      isDisabled={true}
      source={previousReading?.source}
      user={previousReading?.user}
    />
  ));

  const deviceReadings = currentReadingsArray?.map((value, index) => (
    <ReadingsBlock
      key={device.id + index}
      index={index}
      value={value}
      resource={device?.resource!}
      operatorCabinet
      isDisabled={true}
      source={currentReading?.source}
      user={currentReading?.user}
    />
  ));

  return (
    <DeviceItem
      style={{
        opacity: device.closingDate === null ? undefined : '0.7',
        marginTop: (previousReading || currentReading) && '-14px',
      }}
    >
      <div>
        <ApartmentDevice device={device} />
      </div>
      <IsActive closingDate={isActive} />
      <div style={{ marginTop: previousReading && '22px' }}>
        <DeviceReadingsContainer color={'var(--frame)'}>
          {previousDeviceReadings}
        </DeviceReadingsContainer>
        <Flex
          style={{
            justifyContent: 'flex-end',
            transform: 'translateY(2px)',
          }}
        >
          {previousReading &&
            moment(previousReading.uploadTime).format('DD.MM.YYYY')}
        </Flex>
      </div>
      <div style={{ marginTop: currentReading && '22px' }}>
        <DeviceReadingsContainer
          color={'var(--frame)'}
          resource={device.resource}
        >
          {deviceReadings}
        </DeviceReadingsContainer>
        <Flex
          style={{
            justifyContent: 'flex-end',
            transform: 'translateY(2px)',
          }}
        >
          {currentReading &&
            moment(currentReading.uploadTime).format('DD.MM.YYYY')}
        </Flex>
      </div>
      <div style={{ marginLeft: 15 }}>
        <ReadingsHistoryButton deviceId={device.id} />
      </div>
    </DeviceItem>
  );
}

const DeviceReadingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  border-radius: 4px;
  border: 1px solid ${(props) => (props.color ? props.color : 'var(--main-90)')};
  max-width: 200px;
  padding: 8px 8px 8px 12px;

  border-left-width: 4px;

  ${({ resource }) =>
    resource && `border-color: ${getResourceColor(resource as any)};`}

  &:focus-within {
    box-shadow: var(--shadow);
  }

  .ant-input-affix-wrapper:focus,
  .ant-input-affix-wrapper-focused {
    box-shadow: none;
  }
`;

const DeviceItem = styled.div`
  display: inline-grid;
  grid-template-columns: 375px 110px 200px 200px 2.2fr;
  grid-gap: 15px;
  padding: 0 16px 16px;
  border-bottom: 1px solid #dcdee4;
  align-items: center;
`;

const getValuesArray = (
  reading: IndividualDeviceReadingsResponse,
  rateType: EIndividualDeviceRateType
) => {
  const rateNum = getIndividualDeviceRateNumByName(rateType);

  const res: number[] = [];

  for (let i = 0; i < rateNum; i++) {
    res.push((reading as any)[`value${i + 1}`]);
  }

  return res;
};
