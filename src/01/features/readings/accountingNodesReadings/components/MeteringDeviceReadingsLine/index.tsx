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
  } = useMeteringDeviceReadings(node.id, sliderIndex);

  console.log(currentReading, previousReading);

  const readingsInput = (
    <>
      <MeteringDeviceReadingInput
        reading={previousReading}
        loading={loading}
        onChange={() => void 0}
      />
      <MeteringDeviceReadingInput
        reading={currentReading}
        loading={loading}
        onChange={() => void 0}
        colored
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

  return (
    <Wrap temp={gridTemp} gap="15px">
      {deviceData}
      <div>{counter?.scaleFactor}</div>
      {readingsInput}
      <div></div>
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
