import React, { useContext } from 'react';
import { convertDateDots } from '01/_api/utils/convertDate';
import { Loader } from '01/components';
import { ListWrap, ListItem, Title } from '01/_components/List';
import _ from 'lodash';
import { Subtitle } from '../../../_components';
import {
  DEFAULT_BUILDING,
  DEFAULT_DEVICE,
  magistrals,
} from '../../../tt-components/localBases';
import { HousingMeteringDeviceResponse } from '../../../../myApi';

interface InformationInterface {
  device: HousingMeteringDeviceResponse;
}

export const Information = ({ device }: InformationInterface) => {
  if (!device) {
    return null;
  }

  // console.log('device', device);
  const { address } = device || {};
  const { city, street, housingStockNumber, corpus, id } =
    address || DEFAULT_BUILDING;
  const {
    futureCommercialAccountingDate,
    lastCommercialAccountingDate,
    futureCheckingDate,
    lastCheckingDate,
    diameter,
    housingMeteringDeviceType,
    hubConnection: {
      hub: { entryNumber, pipeNumber, magistral },
    },
  } = device || DEFAULT_DEVICE;

  const direction = magistrals.find((item) => item.value === magistral);
  const directionLabel = direction
    ? direction.label
    : 'Направление магистрали не указано';

  return (
    <ListWrap>
      <ListItem>
        <span>Адрес</span>
        <Subtitle to={`/objects/${id}`} style={{ padding: 8 }}>
          {`${city}, ${street}, ${housingStockNumber} ${
            corpus ? `, к.${corpus}` : ''
          }`}
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
