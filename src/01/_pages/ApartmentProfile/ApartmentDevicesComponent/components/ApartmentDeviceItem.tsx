import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getMonthFromDate } from '../../../../utils/getMonthFromDate';
import rateTypeToNumber from '../../../../_api/utils/rateTypeToNumber';
import { formEmptyReadingsObject } from '../../../../utils/formEmptyReadingsObject';
import ReadingsBlock from '../../../MetersPage/components/MeterDevices/components/ReadingsBlock';
import ApartmentDevice from './ApartmentDevice';
import {
  EIndividualDeviceRateType,
  IndividualDeviceListItemResponse,
  IndividualDeviceReadingsResponse,
} from '../../../../../myApi';
import IsActive from '../../../../tt-components/IsActive';
import moment from 'moment';
import { getIndividualDeviceRateNumByName } from '01/_pages/MetersPage/components/MeterDevices/ApartmentReadings';

export function ApartmentDeviceItem({
  device,
  sliderIndex,
}: {
  device: IndividualDeviceListItemResponse;
  sliderIndex: number;
}) {
  const isActive = device?.closingDate !== null;

  const readings: IndividualDeviceReadingsResponse[] = device.readings!;

  const currentReading = readings.filter(
    (elem) => moment().diff(elem.readingDateTime, 'months') < 11
  )[0];

  const preparedReadingsArrWithEmpties = device.readings?.reduce(
    (acc, elem) => {
      if (moment().diff(elem.readingDateTime, 'months') > 11) return acc;

      const index =
        Number(moment().format('M')) -
        Number(moment(elem.readingDateTime).format('M')) -
        1;

      acc[index] = elem;

      return acc;
    },
    {} as { [key: number]: IndividualDeviceReadingsResponse }
  );

  const previousReading = preparedReadingsArrWithEmpties![sliderIndex];

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
    />
  ));

  return (
    <DeviceItem
      style={{ opacity: device.closingDate === null ? undefined : '0.7' }}
    >
      <ApartmentDevice device={device} />
      <IsActive closingDate={isActive} />
      {Boolean(previousReadingsArray?.length) && (
        <DeviceReadingsContainer
          color={'var(--frame)'}
          resource={device.resource}
        >
          {previousDeviceReadings}
        </DeviceReadingsContainer>
      )}
      {Boolean(currentReadingsArray?.length) && (
        <DeviceReadingsContainer
          color={'var(--frame)'}
          resource={device.resource}
        >
          {deviceReadings}
        </DeviceReadingsContainer>
      )}
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
  grid-template-columns: minmax(330px, 4fr) 2fr 2fr 2fr 2fr;
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
