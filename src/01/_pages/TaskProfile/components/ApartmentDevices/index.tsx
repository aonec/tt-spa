import React, { FC, useState } from 'react';
import { MeteringDeviceSearchListResponse } from 'myApi';
import styled from 'styled-components';
import { Flex } from '01/shared/ui/Layout/Flex';
import { ReactComponent as DeviceIcon } from './assets/keys.svg';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Empty } from 'antd';
import { DeviceDataString } from '01/features/individualDevices/switchIndividualDevice/components/DeviceDataString';
import { Link } from 'react-router-dom';
import { ReadingsHistoryModal } from '01/features/readings/displayReadingHistory/ReadingsHistoryModal';
import { ReadingsHistoryButton } from '01/_pages/MetersPage/components/MeterDevices/components/ApartmentReadingLine';
import { ChevronDown, ChevronUp } from 'react-bootstrap-icons';

interface Props {
  devices?: MeteringDeviceSearchListResponse[];
}

export const ApartmentDevices: FC<Props> = ({ devices }) => {
  return (
    <>
      <ReadingsHistoryModal />
      <Wrap>
        <Flex>
          <DeviceIcon />
          <Space w={8} />
          <Title>Приборы</Title>
        </Flex>
        <Space />
        <ListWrap>
          {!devices?.length ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          ) : (
            devices?.map((elem) => <Device device={elem} />)
          )}
        </ListWrap>
      </Wrap>
    </>
  );
};

const Device = ({ device }: { device: MeteringDeviceSearchListResponse }) => {
  const [opened, setOpened] = useState(false);

  const openDeviceIcon = opened ? <ChevronUp /> : <ChevronDown />;

  const openDeviceButton = (
    <OpenDeviceButton onClick={() => setOpened((isOpen) => !isOpen)}>
      {openDeviceIcon}
    </OpenDeviceButton>
  );

  return (
    <DeviceWrap h="space-between">
      <DeviceDataString device={device} />
      <Flex>
        <LinkToProfile to="/">Перейти в профиль</LinkToProfile>
        <Space />
        <ReadingsHistoryButton deviceId={device.id} />
        <Space />
        {openDeviceButton}
      </Flex>
    </DeviceWrap>
  );
};

const Wrap = styled.div`
  margin-top: 25px;
  padding: 5px 0;
`;

const Title = styled.div`
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: left;
`;

export const ListWrap = styled.div`
  padding: 5px;
  box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16),
    0px 8px 16px rgba(78, 93, 146, 0.08);
`;

const DeviceWrap = styled(Flex)`
  padding: 15px 15px;
  border-bottom: 1px solid #f1f1f1;

  &:last-child {
    border-bottom: none;
  }
`;

const LinkToProfile = styled(Link)`
  color: black;
`;

const OpenDeviceButton = styled(Flex)`
  cursor: pointer;
  transition: 0.2s;
  padding: 5px;
  border-radius: 20px;

  &:hover {
    background-color: #e1e1e1;
  }
`;
