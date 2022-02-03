import React, { FC } from 'react';
import { MeteringDeviceSearchListResponse } from 'myApi';
import styled from 'styled-components';
import { Flex } from '01/shared/ui/Layout/Flex';
import { ReactComponent as DeviceIcon } from './assets/keys.svg';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Empty } from 'antd';
import { InfoSectionTitle } from '01/shared/ui/InfoSection';

interface Props {
  devices?: MeteringDeviceSearchListResponse[];
}

export const ApartmentDevices: FC<Props> = ({ devices }) => {
  return (
    <Wrap>
      <Flex>
        <DeviceIcon />
        <Space w={8} />
        <Title>Собственники</Title>
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
  );
};

const Device = ({ device }: { device: MeteringDeviceSearchListResponse }) => {
  return (
    <HomeownerWrap>
      <InfoSectionTitle>{device.model}</InfoSectionTitle>
      <HomeownerPhoneNumber>{device.serialNumber}</HomeownerPhoneNumber>
    </HomeownerWrap>
  );
};

const Wrap = styled.div`
  margin-top: 25px;
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

const HomeownerWrap = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  padding: 5px 10px;
  border-bottom: 1px solid #f1f1f1;

  &:last-child {
    border-bottom: none;
  }
`;

const HomeownerPhoneNumber = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: left;
`;
