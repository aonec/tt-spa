import { MagistralsDisctionary } from 'dictionaries';
import dayjs from 'api/dayjs';
import { EHouseCategory, EMagistralType } from 'api/types';
import React, { FC, useMemo } from 'react';
import { CommonInfo } from 'ui-kit/shared/CommonInfo';
import { getBuildingAddress } from 'utils/getBuildingAddress';
import { Address } from './CommonInfoTab.styled';
import { CommonInfoProps } from './CommonInfoTab.types';

export const CommonInfoTab: FC<CommonInfoProps> = ({
  housingMeteringDevice,
}) => {
  const address = housingMeteringDevice?.address;

  const addressString =
    housingMeteringDevice?.address &&
    getBuildingAddress(housingMeteringDevice?.address, true);

  const magistral = housingMeteringDevice?.hubConnection?.hub
    ?.magistral as EMagistralType;

  const buildingProfilePath = useMemo(() => {
    if (address?.houseCategory === EHouseCategory.Living) {
      return 'livingProfile';
    }
    return 'nonResidentialProfile';
  }, [address]);

  const addressComponent = (() => {
    if (!address) {
      return '-';
    }
    return (
      <Address to={`/buildings/${buildingProfilePath}/${address?.id}`}>
        {addressString}
      </Address>
    );
  })();

  const items = [
    {
      key: 'Адрес',
      value: addressComponent,
    },
    {
      key: 'Диаметр прибора',
      value: housingMeteringDevice?.diameter
        ? `${housingMeteringDevice.diameter} мм`
        : '-',
    },
    {
      key: 'Магистраль',
      value: magistral ? MagistralsDisctionary[magistral] : '-',
    },
    {
      key: 'Дата поверки прибора',
      value: housingMeteringDevice?.lastCheckingDate
        ? dayjs(housingMeteringDevice?.lastCheckingDate).format('DD.MM.YYYY')
        : '-',
    },
    {
      key: 'Дата следующей поверки прибора',
      value: housingMeteringDevice?.futureCheckingDate
        ? dayjs(housingMeteringDevice?.futureCheckingDate).format('DD.MM.YYYY')
        : '-',
    },
  ];

  return <CommonInfo items={items} />;
};
