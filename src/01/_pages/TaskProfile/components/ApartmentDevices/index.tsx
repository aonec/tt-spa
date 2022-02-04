import React, { FC, useState } from 'react';
import { EResourceType, IndividualDeviceResponse } from 'myApi';
import { Flex } from '01/shared/ui/Layout/Flex';
import { ReactComponent as DeviceIcon } from './assets/keys.svg';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Empty } from 'antd';
import { DeviceDataString } from '01/features/individualDevices/switchIndividualDevice/components/DeviceDataString';
import { ReadingsHistoryModal } from '01/features/readings/displayReadingHistory/ReadingsHistoryModal';
import { ReadingsHistoryButton } from '01/_pages/MetersPage/components/MeterDevices/components/ApartmentReadingLine';
import { ChevronDown, ChevronUp } from 'react-bootstrap-icons';
import {
  Wrap,
  Title,
  ListWrap,
  DeviceWrap,
  OpenDeviceButton,
  LinkToProfile,
  DeviceInfoRow,
} from './ApartmentDevices.styled';
import { translateMountPlace } from '01/utils/translateMountPlace';
import moment from 'moment';
import { getIndividualDeviceRateNumByName } from '01/_pages/MetersPage/components/MeterDevices/ApartmentReadings';

interface Props {
  devices?: IndividualDeviceResponse[];
}

export const ApartmentDevices: FC<Props> = ({ devices }) => {
  console.log(devices);
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

const Device = ({ device }: { device: IndividualDeviceResponse }) => {
  const [opened, setOpened] = useState(false);

  const openDeviceIcon = opened ? <ChevronUp /> : <ChevronDown />;

  const openDeviceButton = (
    <OpenDeviceButton onClick={() => setOpened((isOpen) => !isOpen)}>
      {openDeviceIcon}
    </OpenDeviceButton>
  );

  return (
    <DeviceWrap>
      <Flex h="space-between">
        <DeviceDataString device={device} />
        <Flex>
          <LinkToProfile to={`/individualDevices/${device.id}`}>
            Перейти в профиль
          </LinkToProfile>
          <Space />
          <ReadingsHistoryButton deviceId={device.id} />
          <Space />
          {openDeviceButton}
        </Flex>
      </Flex>
      {opened && (
        <>
          <Space />
          <DeviceInfo device={device} />
        </>
      )}
    </DeviceWrap>
  );
};

const DeviceInfo = ({ device }: { device: IndividualDeviceResponse }) => {
  const fields: { name: string; value: string | number | null }[] = [
    {
      name: 'Тип ресурса',
      value: getResourceName(device.resource),
    },
    {
      name: 'Место установки',
      value: translateMountPlace(device.mountPlace),
    },
    {
      name: 'Разрядность',
      value: getIndividualDeviceRateNumByName(device.rateType),
    },
    {
      name: 'Множитель',
      value: device.scaleFactor,
    },
    {
      name: 'Дата начальной поверки',
      value: moment(device.lastCheckingDate).format('DD.MM.YYYY'),
    },
    {
      name: 'Дата следующей поверки',
      value: moment(device.futureCheckingDate).format('DD.MM.YYYY'),
    },
  ];

  return (
    <div>
      {fields.map(({ name, value }) => (
        <DeviceInfoRow>
          <div>{name}</div>
          <div>{value}</div>
        </DeviceInfoRow>
      ))}
    </div>
  );
};

const getResourceName = (resource: EResourceType) => {
  const resources: { [key: string]: string } = {
    [EResourceType.ColdWaterSupply]: 'Холодная вода',
    [EResourceType.Electricity]: 'Электричество',
    [EResourceType.HotWaterSupply]: 'Горячая вода',
    [EResourceType.Heat]: 'Тепло',
  };

  return resources[resource];
};
