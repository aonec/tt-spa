//@ts-nocheck

import React, { ChangeEvent, FocusEvent } from 'react';
import { useStore } from 'effector-react';
import {
  $chosenInputId,
  $isColdWaterSupply,
  $postReadingsErrorMessage,
  $readings,
  $readingsToDisplay,
  $requestReadingsErrorMessage,
  HousingMeteringDeviceReadingsGate,
  inputBlur,
  postReadingFx,
  readingChanged,
  ResourceGate,
} from '../models';
import {
  EMagistralType,
  HousingMeteringDeviceReadingsResponse,
  ResourceType,
} from '../../../../myApi';
import styled from 'styled-components';
import InputTT from '../../../tt-components/InputTT';
import { monthByNumbers, months } from '../lib/monthTransform';
import { firstLetterToUpperCase } from '../../../utils/getMonthFromDate';
import { Loader } from '../../../components/Loader';
import {
  MonthReadingsType,
  YearReadingsType,
} from '../lib/groupReadingsByDates';
import { Alert } from 'antd';
import { HousingMeteringReadingsHeader } from './HousingMeteringReadingsHeader';

const YearReading = ({ yearElement }: { yearElement: YearReadingsType }) => {
  const sortByMonthFn = (a: MonthReadingsType, b: MonthReadingsType) =>
    monthByNumbers[b.month] - monthByNumbers[a.month];

  const mapByMonthFn = (monthElement: MonthReadingsType) => (
    <MonthReading monthElement={monthElement} />
  );

  const monthElements = yearElement.items
    ?.sort(sortByMonthFn)
    .map(mapByMonthFn);

  return (
    <YearReadings>
      <Year>{yearElement.year} год</Year>
      <div>{monthElements}</div>
    </YearReadings>
  );
};

const MonthReading = ({
  monthElement,
}: {
  monthElement: MonthReadingsType;
  // consumption?: number | undefined;
}) => {
  const readings = useStore($readings);
  const isColdWaterSupply = useStore($isColdWaterSupply);

  const sortFeedFlowsFn = (
    a: HousingMeteringDeviceReadingsResponse,
    b: HousingMeteringDeviceReadingsResponse
  ) => {
    if (a.magistralType === EMagistralType.feedFlow) return 1;
    return -1;
  };

  const sortedMonthElementItems = monthElement.items?.sort(sortFeedFlowsFn);

  let consumption;
  if (isColdWaterSupply) {
    const currentReading = monthElement.items[0];
    // debugger;

    const previousReading = readings.items.find(
      (reading) => reading.id === currentReading.previousReadingsId
    );
    consumption = previousReading
      ? currentReading.value - previousReading.value
      : 0;
  }

  return (
    <MonthReadings isColdWaterSupply={isColdWaterSupply}>
      <Month>{firstLetterToUpperCase(monthElement.month)}</Month>
      <div style={{ display: 'flex' }}>
        {sortedMonthElementItems.map((deviceElement) => (
          <DeviceReading deviceElem={deviceElement} />
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {consumption ??
          sortedMonthElementItems[0].value - sortedMonthElementItems[1].value}
      </div>
    </MonthReadings>
  );
};

const DeviceReading = ({
  deviceElem,
}: {
  deviceElem: HousingMeteringDeviceReadingsResponse;
}) => {
  const isColdWaterSupply = useStore($isColdWaterSupply);
  const { value, deviceId, year, month, id } = deviceElem;
  const chosenInputId = useStore($chosenInputId);
  const isInputChosen = chosenInputId === deviceId;
  const today = new Date(); // Mon Nov 23 2020 15:23:46 GMT+0300 (Москва, стандартное время)
  const todayYear = today.getFullYear(); // 2020
  const todayMonth = months[today.getMonth() + 1];

  const isActive = todayYear === year && todayMonth === month;
  const isDisabled = !isActive;

  const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    inputBlur({ value: +e.target.value, deviceId, year, month, id });
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    readingChanged({ value: +e.target.value, deviceId, year, month });
  };

  const isReadingsSending = useStore(postReadingFx.pending);

  const renderLoader = () => {
    return isInputChosen && isReadingsSending && !isDisabled ? (
      // return true ? (
      //   return isReadingsSending && !isDisabled ? (
      <Loader show={true} />
    ) : null;
  };

  return (
    <div style={{ position: 'relative' }}>
      <DeviceReadings isColdWaterSupply={isColdWaterSupply}>
        <InputTT
          style={{ maxWidth: isColdWaterSupply ? 120 : 'none' }}
          height={'32px'}
          value={value}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          disabled={isDisabled}
        />
      </DeviceReadings>
      <LoaderWrapper>{renderLoader()}</LoaderWrapper>
    </div>
  );
};

const HousingMeteringDeviceReadings = ({
  nodeId,
  resource,
}: {
  nodeId: number;
  resource: ResourceType;
}) => {
  const readings = useStore($readingsToDisplay);
  const postReadingsErrorMessage = useStore($postReadingsErrorMessage);
  const requestReadingsErrorMessage = useStore($requestReadingsErrorMessage);

  const readingsElems = readings
    ?.sort((a, b) => b.year - a.year)
    .map((yearElement) => <YearReading yearElement={yearElement} />);

  const renderAddReadingsAlert = () =>
    postReadingsErrorMessage ? (
      <Alert
        message="Ошибка"
        description="Не удалось добавить показания по прибору. Пожалуйста, обновите страницу или повторите попытку позже."
        type="error"
        showIcon
        closable
        style={{ marginBottom: 24 }}
      />
    ) : null;

  const renderRequestReadingsAlert = () => {
    return requestReadingsErrorMessage ? (
      <Alert
        message="Ошибка"
        description="Не удалось получить показания по узлу. Пожалуйста, обновите страницу или повторите попытку позже."
        type="error"
        showIcon
        closable
        style={{ marginBottom: 24 }}
      />
    ) : null;
  };

  return (
    <div>
      <ResourceGate resource={resource} />
      {renderAddReadingsAlert()}
      {renderRequestReadingsAlert()}
      <HousingMeteringDeviceReadingsGate nodeId={nodeId} />
      <HousingMeteringReadingsHeader resource={resource} />
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

const MonthReadings = styled.div<{ isColdWaterSupply: boolean }>`
  display: grid;
  grid-template-columns: ${({ isColdWaterSupply }) =>
    isColdWaterSupply ? '2.5fr 5.5fr 4fr' : '3fr 5fr 4fr'};
  padding: 8px 16px;
`;

const Month = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  color: var(--main);
`;

const DeviceReadings = styled.div<{ isColdWaterSupply: boolean }>`
  display: flex;
  //font-size: 14px;
  margin-right: 16px;
  padding-left: ${({ isColdWaterSupply }) =>
    isColdWaterSupply ? '80px' : '0'};
  flex: 1 1 120px;

  input,
  .ant-input-affix-wrapper {
    padding: 8px;
    font-size: 16px;
    line-height: 32px;
  }
`;

const DeviceModel = styled.div`
  font-weight: 500;
`;

const DeviceSerialNumber = styled.div`
  color: var(--main-70);
`;

const LoaderWrapper = styled.div`
  position: absolute;
  right: 24px;
  bottom: 3px;
`;
