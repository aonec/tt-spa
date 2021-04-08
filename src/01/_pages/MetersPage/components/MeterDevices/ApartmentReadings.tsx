import React, { useEffect } from 'react';
import ApartmentReadingLine from './components/ApartmentReadingLine';
import { getMonthFromDate } from '../../../../utils/getMonthFromDate';
import { useDispatch, useSelector } from 'react-redux';
import { selectDevices } from '../../../../Redux/ducks/readings/selectors';
import { setDevices } from '../../../../Redux/ducks/readings/actionCreators';
import styled from 'styled-components';
import { useSwitchOnInputs } from '../../../../hooks/useSwitchInputsOnEnter';
import { useMonthSlider } from '../../../../shared/lib/readings/useMonthSlider';
import MonthSlider from '../../../../shared/ui/devices/MonthSlider';
import ClosedDevices from '../../../../shared/ui/devices/ClosedDevices';
import { IndividualDeviceListItemResponse } from '../../../../../myApi';

interface ApartmentReadingsProps {
  items: IndividualDeviceListItemResponse[];
}

const mockItems = [
  {
    resource: 'HotWaterSupply',
    mountPlace: 'Toilet',
    rateType: 'OneZone',
    readings: [
      {
        id: 3151346,
        hasError: true,
        status: 'Unknown',
        statusMessage: null,
        value1: '10',
        value2: null,
        value3: null,
        value4: null,
        readingDate: '2020-12-28',
        uploadTime: '2020-12-28T04:12:07.583635',
      },
      {
        id: 2791653,
        hasError: true,
        status: 'Unknown',
        statusMessage: null,
        value1: '10',
        value2: null,
        value3: null,
        value4: null,
        readingDate: '2020-11-28',
        uploadTime: '2020-11-28T03:36:47.378341',
      },
      {
        id: 2479026,
        hasError: true,
        status: 'Unknown',
        statusMessage: null,
        value1: '10',
        value2: null,
        value3: null,
        value4: null,
        readingDate: '2020-10-31',
        uploadTime: '2020-10-31T03:30:55.602393',
      },
      {
        id: 2178946,
        hasError: true,
        status: 'Unknown',
        statusMessage: null,
        value1: '10',
        value2: null,
        value3: null,
        value4: null,
        readingDate: '2020-10-28',
        uploadTime: '2020-10-28T03:19:23.702946',
      },
      {
        id: 1826507,
        hasError: true,
        status: 'Unknown',
        statusMessage: null,
        value1: '10',
        value2: null,
        value3: null,
        value4: null,
        readingDate: '2020-09-28',
        uploadTime: '2020-09-28T03:20:18.43312',
      },
      {
        id: 1307111,
        hasError: false,
        status: 'Unknown',
        statusMessage: null,
        value1: '10',
        value2: null,
        value3: null,
        value4: null,
        readingDate: '2019-11-01',
        uploadTime: '2019-11-24T00:00:00',
      },
      {
        id: 1307125,
        hasError: false,
        status: 'Unknown',
        statusMessage: null,
        value1: '2.79',
        value2: null,
        value3: null,
        value4: null,
        readingDate: '2019-10-01',
        uploadTime: '2019-10-03T08:08:37.233',
      },
      {
        id: 1307124,
        hasError: false,
        status: 'Unknown',
        statusMessage: null,
        value1: '1.31',
        value2: null,
        value3: null,
        value4: null,
        readingDate: '2019-09-01',
        uploadTime: '2019-10-03T08:08:34.85',
      },
    ],
    apartmentNumber: '3',
    homeownerName: 'САРЫНИНА ТВ  ',
    personalAccountNumber: '7819365',
    hasMagneticSeal: false,
    magneticSealInstallationDate: null,
    id: 1306916,
    transactionType: null,
    model: 'СГВ',
    serialNumber: '39764562',
    managementFirm: {
      id: 2,
      name: 'ООО УК "Жилье"',
      phoneNumber: null,
      information: null,
      timeZoneOffset: '03:00:00',
      email: null,
      address: null,
    },
    lastCommercialAccountingDate: null,
    futureCommercialAccountingDate: null,
    lastCheckingDate: '2019-09-02T03:00:00',
    futureCheckingDate: '2025-09-02T03:00:00',
    closingDate: null,
    icon: 'water',
    fill: 'var(--hot-water)',
    hasTasks: false,
  },
  {
    resource: 'ColdWaterSupply',
    mountPlace: 'Toilet',
    rateType: 'OneZone',
    readings: [
      {
        id: 3151345,
        hasError: true,
        status: 'Unknown',
        statusMessage: null,
        value1: '328',
        value2: null,
        value3: null,
        value4: null,
        readingDate: '2020-12-28',
        uploadTime: '2020-12-28T04:12:07.583636',
      },
      {
        id: 2791652,
        hasError: true,
        status: 'Unknown',
        statusMessage: null,
        value1: '328',
        value2: null,
        value3: null,
        value4: null,
        readingDate: '2020-11-28',
        uploadTime: '2020-11-28T03:36:47.378342',
      },
      {
        id: 2479025,
        hasError: true,
        status: 'Unknown',
        statusMessage: null,
        value1: '328',
        value2: null,
        value3: null,
        value4: null,
        readingDate: '2020-10-31',
        uploadTime: '2020-10-31T03:30:55.602394',
      },
      {
        id: 2178945,
        hasError: true,
        status: 'Unknown',
        statusMessage: null,
        value1: '328',
        value2: null,
        value3: null,
        value4: null,
        readingDate: '2020-10-28',
        uploadTime: '2020-10-28T03:19:23.702949',
      },
      {
        id: 1826506,
        hasError: true,
        status: 'Unknown',
        statusMessage: null,
        value1: '328',
        value2: null,
        value3: null,
        value4: null,
        readingDate: '2020-09-28',
        uploadTime: '2020-09-28T03:20:18.433121',
      },
      {
        id: 1307123,
        hasError: false,
        status: 'Unknown',
        statusMessage: null,
        value1: '328',
        value2: null,
        value3: null,
        value4: null,
        readingDate: '2019-11-01',
        uploadTime: '2019-11-24T00:00:00',
      },
      {
        id: 1307122,
        hasError: false,
        status: 'Unknown',
        statusMessage: null,
        value1: '318.74',
        value2: null,
        value3: null,
        value4: null,
        readingDate: '2019-10-01',
        uploadTime: '2019-10-03T08:08:15.703',
      },
      {
        id: 1307121,
        hasError: false,
        status: 'Unknown',
        statusMessage: null,
        value1: '313',
        value2: null,
        value3: null,
        value4: null,
        readingDate: '2019-09-01',
        uploadTime: '2019-09-15T00:00:00',
      },
    ],
    apartmentNumber: '3',
    homeownerName: 'САРЫНИНА ТВ  ',
    personalAccountNumber: '7819365',
    hasMagneticSeal: false,
    magneticSealInstallationDate: null,
    id: 1306917,
    transactionType: null,
    model: 'СГВ',
    serialNumber: '15898348',
    managementFirm: {
      id: 2,
      name: 'ООО УК "Жилье"',
      phoneNumber: null,
      information: null,
      timeZoneOffset: '03:00:00',
      email: null,
      address: null,
    },
    lastCommercialAccountingDate: null,
    futureCommercialAccountingDate: null,
    lastCheckingDate: '2014-11-18T03:00:00',
    futureCheckingDate: '2020-11-18T03:00:00',
    closingDate: '2021-04-08T03:00:00.006069',
    icon: 'water',
    fill: 'var(--cold-water)',
    hasTasks: true,
  },
  {
    resource: 'Electricity',
    mountPlace: 'Corridor',
    rateType: 'TwoZone',
    readings: [
      {
        id: 3151347,
        hasError: true,
        status: 'Unknown',
        statusMessage: null,
        value1: '5879',
        value2: '1433',
        value3: null,
        value4: null,
        readingDate: '2020-12-28',
        uploadTime: '2020-12-28T04:12:07.583634',
      },
      {
        id: 2791654,
        hasError: true,
        status: 'Unknown',
        statusMessage: null,
        value1: '5879',
        value2: '1433',
        value3: null,
        value4: null,
        readingDate: '2020-11-28',
        uploadTime: '2020-11-28T03:36:47.378339',
      },
      {
        id: 2479027,
        hasError: true,
        status: 'Unknown',
        statusMessage: null,
        value1: '5879',
        value2: '1433',
        value3: null,
        value4: null,
        readingDate: '2020-10-31',
        uploadTime: '2020-10-31T03:30:55.602393',
      },
      {
        id: 2178947,
        hasError: true,
        status: 'Unknown',
        statusMessage: null,
        value1: '5879',
        value2: '1433',
        value3: null,
        value4: null,
        readingDate: '2020-10-28',
        uploadTime: '2020-10-28T03:19:23.702945',
      },
      {
        id: 1826508,
        hasError: true,
        status: 'Unknown',
        statusMessage: null,
        value1: '5879',
        value2: '1433',
        value3: null,
        value4: null,
        readingDate: '2020-09-28',
        uploadTime: '2020-09-28T03:20:18.433119',
      },
      {
        id: 1440982,
        hasError: false,
        status: 'Unknown',
        statusMessage: null,
        value1: '5879',
        value2: '1433',
        value3: null,
        value4: null,
        readingDate: '2020-05-01',
        uploadTime: '2020-04-20T06:07:17.237565',
      },
    ],
    apartmentNumber: '3',
    homeownerName: 'САРЫНИНА ТВ  ',
    personalAccountNumber: '7819365',
    hasMagneticSeal: false,
    magneticSealInstallationDate: null,
    id: 1306915,
    transactionType: null,
    model: 'Меркурий 200.05',
    serialNumber: '21070534',
    managementFirm: {
      id: 2,
      name: 'ООО УК "Жилье"',
      phoneNumber: null,
      information: null,
      timeZoneOffset: '03:00:00',
      email: null,
      address: null,
    },
    lastCommercialAccountingDate: null,
    futureCommercialAccountingDate: null,
    lastCheckingDate: '2014-12-31T03:00:00',
    futureCheckingDate: '2030-12-31T03:00:00',
    closingDate: null,
    icon: 'electro',
    fill: 'var(--electro)',
    hasTasks: true,
  },
];

export const ApartmentReadings = ({ items = [] }: ApartmentReadingsProps) => {
  const dispatch = useDispatch();

  useSwitchOnInputs();

  useEffect(() => {
    dispatch(setDevices(items));
  }, [items]);

  const devices = useSelector(selectDevices);

  const { sliderIndex, sliderProps } = useMonthSlider(items);

  if (!devices.length || sliderIndex === undefined) return null;

  const validDevices = devices
    .filter((device) => device.closingDate === null)
    .map((device) => (
      <ApartmentReadingLine
        sliderIndex={sliderIndex}
        key={device.id}
        device={device}
      />
    ));

  const closedDevices = devices.filter((device) => device.closingDate !== null);

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
      {validDevices}
      <ClosedDevices devices={closedDevices} />
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
