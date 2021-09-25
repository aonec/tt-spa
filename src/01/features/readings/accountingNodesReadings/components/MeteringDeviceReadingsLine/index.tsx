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
import { ConsumptionInput } from '../ConsumptionInput/ConsumptionInput';
import { round } from '01/hooks/useReadings';

interface Props {
  sliderIndex: number;
  node: ElectricNodeResponse;
  inputIndex: number;
}

export const MeteringDeviceReadingsLine: React.FC<Props> = ({
  node,
  sliderIndex,
  inputIndex,
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
        inputIndex={inputIndex}
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

  const consumption = Boolean(consumptionValue) ? (
    <div>{round(currentReading?.value! - previousReading.value!, 3)} кВтч</div>
  ) : (
    <div></div>
  );
  return (
    <Wrap temp={gridTemp} gap="15px">
      {deviceData}
      <div>{counter?.scaleFactor}</div>
      {readingsInput}
      {consumption}
      {Boolean(currentReading && counter?.id) ? (
        <ConsumptionInput
          reading={currentReading!}
          refetch={refetch}
          deviceId={counter?.id!}
        />
      ) : (
        <div></div>
      )}
      <Flex style={{ justifyContent: 'center' }}>
        <HistoryIcon />
      </Flex>
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
