//@ts-nocheck

import React, { ChangeEvent, FocusEvent } from 'react';
import { useStore } from 'effector-react';
import {
  $chosenInputId,
  $postReadingsErrorMessage,
  $readings,
  $readingsToDisplay,
  $requestReadingsErrorMessage,
  HousingMeteringDeviceReadingsGate,
  inputBlur,
  postReadingFx,
  readingChanged,
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

const YearReading = ({ yearElement }: { yearElement: YearReadingsType }) => {
  return (
    <YearReadings>
      <Year>{yearElement.year} год</Year>
      <div>
        {yearElement.items
          ?.sort((a, b) => monthByNumbers[b.month] - monthByNumbers[a.month])
          .map((monthElement, i, arr) => {
            // const isColdWaterSupply = monthElement.items.length === 1;
            // debugger;
            // const consumption = isColdWaterSupply
            //   ? arr[i].items[0].value - arr[i - 1].items[0].value
            //   : undefined;

            return (
              <MonthReading
                monthElement={monthElement}
                // consumption={consumption}
              />
            );
          })}
      </div>
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
  const isColdWaterSupply = monthElement.items.length === 1;

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
    debugger;
    consumption = previousReading
      ? currentReading.value - previousReading.value
      : 0;
  }

  return (
    <MonthReadings>
      <Month>{firstLetterToUpperCase(monthElement.month)}</Month>
      <div style={{ display: 'flex' }}>
        {sortedMonthElementItems.map((deviceElement) => (
          <DeviceReading deviceElem={deviceElement} />
        ))}
      </div>
      <div>
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
  const { value, deviceId, year, month, id } = deviceElem;
  const chosenInputId = useStore($chosenInputId);
  const isInputChosen = chosenInputId === deviceId;
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

  const renderLoader = () => {
    return isInputChosen && isReadingsSending && !isDisabled ? (
      // return isReadingsSending && !isDisabled ? (
      <Loader show={true} />
    ) : null;
  };

  return (
    <DeviceReadings>
      {renderLoader()}
      <InputTT
        height={'32px'}
        value={value}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        disabled={isDisabled}
        // suffix={renderLoader()}
      />
    </DeviceReadings>
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

  const renderVolumes = (resource: ResourceType) => {
    return resource === ResourceType.ColdWaterSupply ? (
      <div>V1, м³</div>
    ) : (
      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}>V1, м³</div>
        <div style={{ width: '50%' }}>V2, м³</div>
      </div>
    );
  };

  return (
    <div>
      {renderAddReadingsAlert()}
      {renderRequestReadingsAlert()}
      <HousingMeteringDeviceReadingsGate nodeId={nodeId} />
      <HousingMeteringReadingsHeader>
        <div>Месяц</div>
        {renderVolumes(resource)}
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
  //font-size: 14px;
  margin-right: 16px;
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

const HousingMeteringReadingsHeader = styled.div`
  display: grid;
  position: sticky;
  top: 0;
  align-items: center;
  padding-left: 16px;
  margin-bottom: 8px;
  height: 48px;
  grid-template-columns: 3fr 5fr 4fr;
  background-color: var(--main-4);
  overflow: hidden;
`;
