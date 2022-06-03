import moment from 'moment';
import { EActResourceType } from 'myApi';
import React, { FC, useState } from 'react';
import { ChevronDown, ChevronUp } from 'react-bootstrap-icons';
import { IndividualDeviceInfo } from 'ui-kit/shared_components/IndividualDeviceInfo';
import { ReadingsHistoryButton } from 'ui-kit/shared_components/reading_history_button';
import {
  ChevronWrapper,
  DeviceInfoItem,
  DeviceInfoItemLabel,
  Header,
  LinkOnProfile,
  ReadingsHistoryButtonWrapper,
  RightHeaderPanel,
  Wrapper,
} from './IndividualDeviceItem.styled';
import { IndividualDeviceItemProps } from './IndividualDeviceItem.types';

export const actResourceTypeNames = {
  [EActResourceType.ColdWaterSupply]: 'Холодная вода',
  [EActResourceType.HotWaterSupply]: 'Горячая вода',
  [EActResourceType.Electricity]: 'Электричество',
  [EActResourceType.Heat]: 'Тепло',
  [EActResourceType.All]: 'Все',
};

export const IndividualDeviceItem: FC<IndividualDeviceItemProps> = ({
  device,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const chevron = isOpen ? <ChevronUp /> : <ChevronDown />;

  const apartmentId = device.address?.apartmentId;

  const deviceInfos = [
    {
      title: 'Тип ресурса',
      value: actResourceTypeNames[device.resource],
    },
    {
      title: 'Место установки',
      value: device.mountPlace?.description,
    },
    {
      title: 'Разрядность',
      value: device.bitDepth,
    },
    {
      title: 'Множитель',
      value: device.scaleFactor,
    },
    {
      title: 'Дата ввода в эксплуатацию',
      value:
        device.openingDate && moment(device.openingDate).format('DD.MM.YYYY'),
    },
    {
      title: 'Дата начальной поверки',
      value: moment(device.lastCheckingDate).format('DD.MM.YYYY'),
    },
    {
      title: 'Дата следующей поверки',
      value: moment(device.futureCheckingDate).format('DD.MM.YYYY'),
    },
  ];

  const deviceExtendedInfo = (
    <div>
      {deviceInfos.map(({ title, value }) => (
        <DeviceInfoItem>
          <DeviceInfoItemLabel>{title}:</DeviceInfoItemLabel>
          <div>{value || "—"}</div>
        </DeviceInfoItem>
      ))}
    </div>
  );

  return (
    <Wrapper>
      <Header>
        <IndividualDeviceInfo device={device} />
        <RightHeaderPanel>
          <LinkOnProfile to={`/meters/apartments/${apartmentId}`}>
            Перейти в профиль
          </LinkOnProfile>
          <ReadingsHistoryButtonWrapper>
            <ReadingsHistoryButton deviceId={device.id} />
          </ReadingsHistoryButtonWrapper>
          <ChevronWrapper onClick={toggle}>{chevron}</ChevronWrapper>
        </RightHeaderPanel>
      </Header>
      {isOpen && deviceExtendedInfo}
    </Wrapper>
  );
};
