import React from 'react';
import { Flex } from '01/shared/ui/Layout/Flex';
import {
  EIndividualDeviceReadingsSource,
  OrganizationUserShortResponse,
} from 'myApi';
import { ReactComponent as UserIcon } from '../icons/userIcon.svg';
import { ReactComponent as ErcIcon } from '../icons/erc.svg';
import { ReactComponent as GosUslugiIcon } from '../icons/gosuslugi.svg';
import { ReactComponent as BankIcon } from '../icons/bank.svg';
import { ReactComponent as ArchiveIcon } from '../icons/archive.svg';
import { Space } from '01/shared/ui/Layout/Space/Space';
import {
  TelegramIcon,
  DeviceIcon,
  DubbedIcon,
  SputnikIcon,
} from 'ui-kit/icons';

export const getSourceIcon = (sourceType: EIndividualDeviceReadingsSource) =>
  ({
    [EIndividualDeviceReadingsSource.Archive]: <ArchiveIcon />,
    [EIndividualDeviceReadingsSource.Bank]: <BankIcon />,
    [EIndividualDeviceReadingsSource.GosUslugi]: <GosUslugiIcon />,
    [EIndividualDeviceReadingsSource.Sputnik]: null,
    [EIndividualDeviceReadingsSource.Duplicated]: <ArchiveIcon />,
    [EIndividualDeviceReadingsSource.Erc]: <ErcIcon />,
    [EIndividualDeviceReadingsSource.Ttm]: <UserIcon />,
    [EIndividualDeviceReadingsSource.TtmFromErc]: <ErcIcon />,
    [EIndividualDeviceReadingsSource.TelegramBot]: <TelegramIcon />,
    [EIndividualDeviceReadingsSource.DeviceTelemetry]: <DeviceIcon />,
    [EIndividualDeviceReadingsSource.Duplicated]: <DubbedIcon />,
    [EIndividualDeviceReadingsSource.Sputnik]: <SputnikIcon />,
  }[sourceType]);

export const getSourceName = (
  source: EIndividualDeviceReadingsSource,
  userName: string | null = ''
) => {
  const name = {
    [EIndividualDeviceReadingsSource.Archive]: 'Архив',
    [EIndividualDeviceReadingsSource.Bank]: 'Банк',
    [EIndividualDeviceReadingsSource.GosUslugi]: 'Госуслуги',
    [EIndividualDeviceReadingsSource.Sputnik]: 'Спутник',
    [EIndividualDeviceReadingsSource.Duplicated]: 'Архив (Повторные показания)',
    [EIndividualDeviceReadingsSource.Erc]: 'ЕРЦ',
    [EIndividualDeviceReadingsSource.Ttm]: userName || 'TTM',
    [EIndividualDeviceReadingsSource.TtmFromErc]: 'ЕРЦ (TTM)',
    [EIndividualDeviceReadingsSource.TelegramBot]: 'Показания из телеграм-бота',
    [EIndividualDeviceReadingsSource.DeviceTelemetry]:
      'Автоматические показания с счетчика',
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
    <Flex>
      {icon && (
        <>
          {icon}
          <Space />
        </>
      )}
      {name}
    </Flex>
  );
};
