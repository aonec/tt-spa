import { Icon } from '01/shared/ui/Icon';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Grid } from '01/shared/ui/Layout/Grid';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { ElectricNodeResponse } from 'myApi';
import React from 'react';
import styled from 'styled-components';
import { gridTemp } from '../MeteringDevicesList';
import { MeteringDeviceReadingInput } from '../MeteringDeviceReadingInput';
import { ReactComponent as HistoryIcon } from '01/_pages/MetersPage/components/MeterDevices/components/icons/history.svg';
import { useMeteringDeviceReadings } from './useMeteringDeviceReadings';

interface Props {
  sliderIndex: number;
  node: ElectricNodeResponse;
}

export const MeteringDeviceReadingsLine: React.FC<Props> = ({
  node,
  sliderIndex,
}) => {
  const counter = node.counter;

  const {
    loading,
    currentReading,
    previousReading,
    refetch,
  } = useMeteringDeviceReadings(node.id, sliderIndex);

  const readingsInput = (
    <>
      <MeteringDeviceReadingInput
        deviceId={counter?.id!}
        reading={previousReading}
        loading={loading}
        disabled
        refetch={refetch}
      />
      <MeteringDeviceReadingInput
        reading={currentReading}
        deviceId={counter?.id!}
        loading={loading}
        current
        refetch={refetch}
      />
    </>
  );

  const deviceData = (
    <Flex>
      <IconWrap>
        <Icon name={node.counter?.resource!} />
      </IconWrap>
      <Space w={11} />
      <div>
        <div>
          <b>{counter?.serialNumber}</b>
        </div>
        <div style={{ fontSize: 12 }}>{counter?.model}</div>
      </div>
    </Flex>
  );

  const consumptionValue =
    currentReading &&
    previousReading &&
    currentReading?.value - previousReading.value;

  const consumption = Boolean(consumptionValue) && (
    <div>{currentReading?.value! - previousReading.value!} кВтч</div>
  );
  return (
    <Wrap temp={gridTemp} gap="15px">
      {deviceData}
      <div>{counter?.scaleFactor}</div>
      {readingsInput}
      {consumption}
      <div></div>
      <HistoryIcon />
    </Wrap>
  );
};

const Wrap = styled(Grid)`
  align-items: center;
  padding: 25px 15px;
  border-bottom: 1px solid #dcdee4;
`;

const IconWrap = styled.div`
  transform: translateY(-10px);
`;
