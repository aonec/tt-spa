import React, { FocusEvent, ChangeEvent, useState } from 'react';
import { useStore } from 'effector-react';
import {
  $postReadingsErrorMessage,
  $readingsToDisplay,
  HousingMeteringDeviceReadingsGate,
  inputBlur,
  postReadingFx,
  readingChanged,
} from '../models';
import {
  EMagistralType,
  HousingMeteringDeviceReadingsResponse,
} from '../../../../myApi';
import styled from 'styled-components';
import InputTT from '../../../tt-components/InputTT';
import { months } from '../lib/getMonthByNumber';
import { firstLetterToUpperCase } from '../../../utils/getMonthFromDate';
import { Spin } from 'antd';
import { Loader } from '../../../components/Loader';

const YearReading = ({ yearElement }: { yearElement: any }) => {
  return (
    <YearReadings>
      <Year>{yearElement.year} год</Year>
      <div>
        {yearElement.items?.map((monthElement: any) => (
          <MonthReading monthElement={monthElement} />
        ))}
      </div>
    </YearReadings>
  );
};

const MonthReading = ({ monthElement }: { monthElement: any }) => {
  return (
    <MonthReadings>
      <Month>{firstLetterToUpperCase(monthElement.month)}</Month>
      <div style={{ display: 'flex' }}>
        {monthElement.items?.map((deviceElement: any) => (
          <DeviceReading deviceElem={deviceElement} />
        ))}
      </div>
    </MonthReadings>
  );
};
//
// id: string | null;
//
// /** @format double */
// value: number | null;
//
// /** @format int32 */
// nodeId: number;
//
// /** @format int32 */
// deviceId: number;
// deviceModel: string | null;
// deviceSerialNumber: string | null;
//
// /** @format date-time */
// createDate: string;
//
// /** @format date-time */
// updateDate: string | null;
// magistralType: EMagistralType;
//
// /** @format int32 */
// year: number;
// month: string | null;

const DeviceReading = ({
  deviceElem,
}: {
  deviceElem: HousingMeteringDeviceReadingsResponse;
}) => {
  const { value, deviceId, year, month, id } = deviceElem;
  const today = new Date(); // Mon Nov 23 2020 15:23:46 GMT+0300 (Москва, стандартное время)
  const todayYear = today.getFullYear(); // 2020
  const todayMonth = months[today.getMonth() + 1];

  const isActive = todayYear === year && todayMonth === month;
  const isDisabled = !isActive;

  const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    // if (+e.target.value === value) return;
    inputBlur({ value: +e.target.value, deviceId, year, month, id });
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // if (+e.target.value === value) return;
    readingChanged({ value: +e.target.value, deviceId, year, month });
  };

  const isReadingsSending = useStore(postReadingFx.pending);

  const renderLoader = () =>
    isReadingsSending && !isDisabled ? <Loader show={true} /> : null;

  debugger;

  return (
    <DeviceReadings>
      <InputTT
        height={'32px'}
        value={value}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        disabled={isDisabled}
        suffix={renderLoader()}
      />
    </DeviceReadings>
  );
};

const HousingMeteringDeviceReadings = ({ nodeId }: { nodeId: number }) => {
  const newReadings = useStore($readingsToDisplay);
  const postReadingsErrorMessage = useStore($postReadingsErrorMessage);

  const readingsElems = newReadings?.map((yearElement) => (
    <YearReading yearElement={yearElement} />
  ));

  return (
    <div>
      {postReadingsErrorMessage ? 'Ошибка' : null}
      <HousingMeteringDeviceReadingsGate nodeId={nodeId} />
      <HousingMeteringReadingsHeader>
        <div>Месяц</div>
        <div>V1, м³</div>
        <div>V2, м³</div>
        <div>Потребление, м3</div>
      </HousingMeteringReadingsHeader>
      {readingsElems}
    </div>
  );
};

export default HousingMeteringDeviceReadings;

const YearReadings = styled.div`
  display: flex;
  flex-direction: column;
`;

const Year = styled.div`
  padding: 8px 16px;
  margin-bottom: 8px;
  font-size: 14px;
  color: var(--main-90);
  border-bottom: 1px solid var(--frame);
`;

const MonthReadings = styled.div`
  display: grid;
  grid-template-columns: 3fr 5fr 4fr;
  padding: 8px 16px;
`;

const Month = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  color: var(--main);
`;

const DeviceReadings = styled.div`
  display: flex;
  font-size: 14px;
  margin-right: 16px;

  input {
    padding: 8px;
  }
`;

const DeviceModel = styled.div`
  font-weight: 500;
`;

const DeviceSerialNumber = styled.div`
  color: var(--main-70);
`;

const HousingMeteringReadingsHeader = styled.div`
  display: grid;
  position: sticky;
  top: 0;
  align-items: center;
  padding-left: 16px;
  margin-bottom: 8px;
  height: 48px;
  grid-template-columns: 3fr 2.5fr 2.5fr 4fr;
  background-color: var(--main-4);
  overflow: hidden;
`;
