import { MagistralsDisctionary } from 'dictionaries';
import moment from 'moment';
import { EMagistralType } from 'myApi';
import React, { FC } from 'react';
import { CommonInfo } from 'ui-kit/shared_components/CommonInfo';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import { Address, Wrapper } from './CommonInfoTab.styled';
import { CommonInfoProps } from './CommonInfoTab.types';

export const CommonInfoTab: FC<CommonInfoProps> = ({
  housingMeteringDevice,
}) => {
  const address =
    housingMeteringDevice?.address?.address?.mainAddress &&
    getHousingStockAddress(housingMeteringDevice.address, true);

  const magistral = housingMeteringDevice?.hubConnection?.hub
    ?.magistral as EMagistralType;

  const items = [
    { key: 'Адрес', value: <Address>{address}</Address> },
    { key: 'Диаметр прибора', value: `${housingMeteringDevice?.diameter} мм` },
    { key: 'Магистраль', value: MagistralsDisctionary[magistral] },
    {
      key: 'Дата поверки прибора',
      value: moment(housingMeteringDevice?.lastCheckingDate).format(
        'DD.MM.YYYY'
      ),
    },
    {
      key: 'Дата следующей поверки прибора',
      value: moment(housingMeteringDevice?.futureCheckingDate).format(
        'DD.MM.YYYY'
      ),
    },
  ];

  return (
    <Wrapper>
      <CommonInfo items={items} />
    </Wrapper>
  );
};
