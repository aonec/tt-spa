import { HousingMeteringDeviceReadingsResponse } from '../../../../myApi';
import { useStore } from 'effector-react';
import {
  $chosenInputId,
  $isColdWaterSupply,
  inputBlur,
  postReadingFx,
  readingChanged,
} from '../models';
import { months } from '../lib/monthTransform';
import React, { ChangeEvent, FocusEvent } from 'react';
import { Spin } from 'antd';
import InputTT from '../../../tt-components/InputTT';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';

export const DeviceReading = ({
  deviceElem,
}: {
  deviceElem: HousingMeteringDeviceReadingsResponse;
}) => {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 16, color: 'var(--main-32)' }} spin />
  );

  const isColdWaterSupply = useStore($isColdWaterSupply);
  const { value, id, year, month } = deviceElem;
  const deviceId = Number(id);
  const chosenInputId = useStore($chosenInputId);
  const isInputChosen = chosenInputId === deviceId;
  const today = new Date();
  const todayYear = today.getFullYear();
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
      <Spin indicator={antIcon} />
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

const LoaderWrapper = styled.div`
  position: absolute;
  right: 24px;
  bottom: 3px;
`;

const DeviceReadings = styled.div<{ isColdWaterSupply: boolean }>`
  display: flex;
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
