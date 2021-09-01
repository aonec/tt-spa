import React from 'react';
import { Flex } from '01/shared/ui/Layout/Flex';
import {
  EIndividualDeviceReadingsSource,
  ManagingFirmUserShortResponse,
} from 'myApi';
import { ReactComponent as UserIcon } from '../icons/userIcon.svg';
import { ReactComponent as ErcIcon } from '../icons/erc.svg';
import { ReactComponent as GosUslugiIcon } from '../icons/gosuslugi.svg';
import { ReactComponent as BankIcon } from '../icons/bank.svg';
import { ReactComponent as ArchiveIcon } from '../icons/archive.svg';
import { Space } from '01/shared/ui/Layout/Space/Space';

export const getSourceIcon = (sourceType: EIndividualDeviceReadingsSource) =>
  ({
    [EIndividualDeviceReadingsSource.Archive]: <ArchiveIcon />,
    [EIndividualDeviceReadingsSource.Bank]: <BankIcon />,
    [EIndividualDeviceReadingsSource.GosUslugi]: <GosUslugiIcon />,
    [EIndividualDeviceReadingsSource.Sputnik]: null,
    [EIndividualDeviceReadingsSource.Duplicated]: null,
    [EIndividualDeviceReadingsSource.Erc]: <ErcIcon />,
    [EIndividualDeviceReadingsSource.Ttm]: <UserIcon />,
    [EIndividualDeviceReadingsSource.TtmFromErc]: null,
  }[sourceType]);

export const SourceName = ({
  sourceType,
  user,
}: {
  sourceType: EIndividualDeviceReadingsSource;
  user?: ManagingFirmUserShortResponse | null;
}) => {
  const userName = user?.name;

  const name = {
    [EIndividualDeviceReadingsSource.Archive]: 'Архив',
    [EIndividualDeviceReadingsSource.Bank]: 'Банк',
    [EIndividualDeviceReadingsSource.GosUslugi]: 'Госуслуги',
    [EIndividualDeviceReadingsSource.Sputnik]: 'Спутник',
    [EIndividualDeviceReadingsSource.Duplicated]: 'Duplicated',
    [EIndividualDeviceReadingsSource.Erc]: 'ЕРЦ',
    [EIndividualDeviceReadingsSource.Ttm]: userName || 'TTM',
    [EIndividualDeviceReadingsSource.TtmFromErc]: null,
  }[sourceType];

  const icon = getSourceIcon(sourceType);

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
