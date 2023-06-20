import { Flex } from '01/shared/ui/Layout/Flex';
import { Grid } from '01/shared/ui/Layout/Grid';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { ElectricNodeResponse } from 'myApi';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { gridTemp } from '../MeteringDevicesList';
import { MeteringDeviceReadingInput } from '../MeteringDeviceReadingInput';
import { useMeteringDeviceReadings } from './useMeteringDeviceReadings';
import { ConsumptionInput } from '../ConsumptionInput/ConsumptionInput';
import _ from 'lodash';
import {
  HistoryIconSC,
  ContextMenuWrapper,
} from './MeteringDeviceReadingsLine.styled';
import { useHistory } from 'react-router-dom';
import { ContextMenuButton } from 'ui-kit/ContextMenuButton/ContextMenuButton';
import { round } from 'utils/round';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';

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
    prePreviousReading,
    refetch,
  } = useMeteringDeviceReadings(node.id, sliderIndex);
  const history = useHistory();

  const handleChangeODPU = useCallback(
    () => history.push(`/changeODPU/${counter?.id}`),
    [history, counter?.id],
  );

  const handleEditODPU = useCallback(
    () => history.push(`/electricNode/${counter?.id}/edit`),
    [history, counter?.id],
  );

  const readingsInput = () => (
    <>
      <MeteringDeviceReadingInput
        deviceId={counter?.id!}
        prevReading={prePreviousReading}
        reading={previousReading}
        loading={loading}
        refetch={refetch}
        monthIndex={sliderIndex}
      />
      <MeteringDeviceReadingInput
        prevReading={previousReading}
        reading={currentReading}
        deviceId={counter?.id!}
        loading={loading}
        current
        refetch={refetch}
        inputIndex={inputIndex}
        monthIndex={-1}
      />
    </>
  );

  const deviceData = (
    <Flex>
      <IconWrap>
        <ResourceIconLookup resource={node.counter?.resource!} />
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

  const getConsumption = () => {
    const previousReadingValue = _.get(previousReading, 'value', null);
    const currentReadingValue = _.get(currentReading, 'value', null);
    return (
      <div>
        {previousReadingValue !== null && currentReadingValue !== null
          ? `${round(currentReadingValue - previousReadingValue, 3)} кВт/ч`
          : null}
      </div>
    );
  };

  const getConsumptionInput = () => {
    const isShow = Boolean(currentReading && counter?.id);
    if (!isShow) {
      return <div></div>;
    }
    return (
      <ConsumptionInput
        reading={currentReading!}
        refetch={refetch}
        deviceId={counter?.id!}
      />
    );
  };

  return (
    <Wrap temp={gridTemp} gap="15px">
      {deviceData}
      <div>{counter?.scaleFactor}</div>
      {readingsInput()}
      {getConsumption()}
      {getConsumptionInput()}
      <Flex>
        <HistoryIconSC />
        <ContextMenuWrapper>
          <ContextMenuButton
            menuButtons={[
              {
                title: 'Заменить прибор',
                onClick: handleChangeODPU,
              },
              {
                title: 'Редактировать прибор',
                onClick: handleEditODPU,
              },
            ]}
          />
        </ContextMenuWrapper>
      </Flex>
    </Wrap>
  );
};

const Wrap = styled(Grid)`
  align-items: center;
  padding: 24px 16px;
  border-bottom: 1px solid #dcdee4;
`;

const IconWrap = styled.div`
  transform: translateY(-10px);
`;