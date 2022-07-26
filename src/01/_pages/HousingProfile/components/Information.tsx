import React from 'react';
import { convertDateDots } from '01/_api/utils/convertDate';
import { ListWrap, ListItem } from '01/_components/List';
import {
  DEFAULT_BUILDING,
  DEFAULT_DEVICE,
  magistrals,
} from '../../../tt-components/localBases';
import { PipeHousingMeteringDeviceResponse } from '../.../../api/types';
import { Subtitle } from '../../../_components/Headers';
import { AdditionalAddressDescription } from '01/_pages/CalculatorProfile/components/Header.styled';
import { Tooltip } from 'antd';
import { additionalAddressesString } from 'utils/additionalAddressesString';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';

interface InformationInterface {
  device: PipeHousingMeteringDeviceResponse;
}

export const Information = ({ device }: InformationInterface) => {
  if (!device) {
    return null;
  }

  const { address } = device || {};
  const { id } = address || DEFAULT_BUILDING;
  const {
    futureCommercialAccountingDate,
    lastCommercialAccountingDate,
    futureCheckingDate,
    lastCheckingDate,
    diameter,
    housingMeteringDeviceType,
    hubConnection: {
      hub: { magistral },
    },
  } = (device as any) || DEFAULT_DEVICE;

  const direction = magistrals.find((item) => item.value === magistral);
  const directionLabel = direction
    ? direction.label
    : 'Направление магистрали не указано';

  const additionalAdress = additionalAddressesString(address);

  return (
    <ListWrap>
      <ListItem>
        <span>Адрес</span>
        <Subtitle to={`/objects/${id}`} style={{ padding: 8 }}>
          {getHousingStockAddress(address, true)}
          <Tooltip title={additionalAdress}>
            <AdditionalAddressDescription>
              {additionalAdress}
            </AdditionalAddressDescription>
          </Tooltip>
        </Subtitle>
      </ListItem>

      <ListItem>
        <span>Дата начала действия акта-допуска</span>
        <span>{convertDateDots(lastCommercialAccountingDate)}</span>
      </ListItem>
      <ListItem>
        <span>Дата окончания действия акта-допуска</span>
        <span>{convertDateDots(futureCommercialAccountingDate)}</span>
      </ListItem>
      {housingMeteringDeviceType === 'FlowMeter' ? (
        <ListItem>
          <span>Диаметр трубы</span>
          <span>{diameter !== null ? `${diameter} мм` : 'не указан'}</span>
        </ListItem>
      ) : null}
      <ListItem>
        <span>Магистраль</span>
        <span>{directionLabel}</span>
      </ListItem>
      <ListItem>
        <span>Дата поверки прибора</span>
        <span>{convertDateDots(lastCheckingDate)}</span>
      </ListItem>
      <ListItem>
        <span>Дата следующей поверки прибора</span>
        <span>{convertDateDots(futureCheckingDate)}</span>
      </ListItem>
    </ListWrap>
  );
};

export default Information;
