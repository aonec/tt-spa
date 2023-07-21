import React from 'react';
import {
  EIndividualDeviceReadingsSource,
  OrganizationUserShortResponse,
} from 'api/types';
import {
  TelegramIcon,
  DeviceIcon,
  DubbedIcon,
  ArchiveIcon,
  BankIcon,
  GosUslugiIcon,
  ErcIcon,
  UserIcon,
} from 'ui-kit/icons';

export const getSourceIcon = (sourceType: EIndividualDeviceReadingsSource) =>
  ({
    [EIndividualDeviceReadingsSource.Archive]: <ArchiveIcon />,
    [EIndividualDeviceReadingsSource.Bank]: <BankIcon />,
    [EIndividualDeviceReadingsSource.GosUslugi]: <GosUslugiIcon />,
    [EIndividualDeviceReadingsSource.Erc]: <ErcIcon />,
    [EIndividualDeviceReadingsSource.Ttm]: <UserIcon />,
    [EIndividualDeviceReadingsSource.TtmFromErc]: <ErcIcon />,
    [EIndividualDeviceReadingsSource.TelegramBot]: <TelegramIcon />,
    [EIndividualDeviceReadingsSource.DeviceTelemetry]: <DeviceIcon />,
    [EIndividualDeviceReadingsSource.Duplicated]: <DubbedIcon />,
  }[sourceType]);

export const getSourceName = (
  source: EIndividualDeviceReadingsSource,
  userName: string | null = '',
) => {
  const name = {
    [EIndividualDeviceReadingsSource.Archive]: 'Архив',
    [EIndividualDeviceReadingsSource.Bank]: 'Банк',
    [EIndividualDeviceReadingsSource.GosUslugi]: 'Госуслуги',
    [EIndividualDeviceReadingsSource.Erc]: 'ЕРЦ',
    [EIndividualDeviceReadingsSource.Ttm]: userName || 'TTM',
    [EIndividualDeviceReadingsSource.TtmFromErc]: 'ЕРЦ (TTM)',
    [EIndividualDeviceReadingsSource.TelegramBot]: 'Показания из телеграм-бота',
    [EIndividualDeviceReadingsSource.DeviceTelemetry]:
      'Автоматические показания с счетчика',
    [EIndividualDeviceReadingsSource.Duplicated]: 'Продублированные показания',
  }[source];

  return name;
};

export const SourceName = ({
  sourceType,
  user,
}: {
  sourceType: EIndividualDeviceReadingsSource;
  user?: OrganizationUserShortResponse | null;
}) => {
  const userName = user?.name;

  const icon = getSourceIcon(sourceType);
  const name = getSourceName(sourceType, userName);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      {icon}
      {name}
    </div>
  );
};