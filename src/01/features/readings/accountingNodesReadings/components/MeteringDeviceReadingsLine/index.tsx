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
  node: ElectricNodeResponse;
}

export const MeteringDeviceReadingsLine: React.FC<Props> = ({ node }) => {
  const counter = node.counter;

  const { readings, loading } = useMeteringDeviceReadings(node.id);

  const readingsInput = (
    <>
      <MeteringDeviceReadingInput
        loading={loading}
        value={0}
        onChange={() => void 0}
      />
      <MeteringDeviceReadingInput
        loading={loading}
        value={0}
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

const Center = styled(Flex)`
  justify-content: center;
`;

const IconWrap = styled.div`
  transform: translateY(-10px);
`;
