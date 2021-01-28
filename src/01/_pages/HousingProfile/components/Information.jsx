import React, { useContext } from 'react';
import { convertDateDots } from '01/_api/utils/convertDate';
import { Loader } from '01/components';
import { ListWrap, ListItem, Title } from '01/_components/List';
import _ from 'lodash';
import { HousingContext } from '../HousingProfile';
import { DEFAULT_BUILDING, DEFAULT_DEVICE } from './Templates';
import { Subtitle } from "../../../_components";
// import { Subtitle } from '../../../_components/Headers';
// import { magistrals } from "../../../tt-components/localBases";

export const Information = (loading = true) => {
  const { device, loadings, error } = useContext(HousingContext);

  const loadingDevice = _.get(loadings, 'device', true);
  const magistrals = [
    {
      value: 'FeedFlow',
      label: 'Подающая',
    },
    {
      value: 'FeedBackFlow',
      label: 'Обратная',
    },
  ];

  loading = loadingDevice;

  const buttonHandler = () => {
    console.log('buttonHandler');
  };

  const { address } = device || {};
  const {
    city, street, housingStockNumber, corpus, id,
  } = address || DEFAULT_BUILDING;
  const {
    futureCommercialAccountingDate,
    lastCommercialAccountingDate,
    futureCheckingDate,
    lastCheckingDate,
    diameter,
    housingMeteringDeviceType,
    hubConnection: {
      hub: {
        entryNumber,
        hubNumber,
        pipeNumber,
        magistral,
      }
    }
  } = device || DEFAULT_DEVICE;


  const errorOfComponent = _.get(error, 'resource', null);

  // console.log('device', device);
  if (errorOfComponent) {
    return (
      <ListWrap>
        <Title>{error.message}</Title>
        {/* <button onClick={buttonHandler}>button</button> */}
      </ListWrap>
    );
  }

  const direction = _.find(magistrals,{value: magistral})
  const directionLabel = direction !== undefined ? direction.label : null;

  console.log('direction', directionLabel)
  if (!direction) {
    return <Loader show size="32" />
  }

  return (
    <ListWrap>
      <Loader show={loading} size="32">
        <Title>Информация</Title>
        <ListItem>
          <span>Адрес</span>
          <Subtitle to={`/objects/${id}`} style={{ padding: 8 }}>
            {`${city}, ${street}, ${housingStockNumber} ${corpus ? `, к.${corpus}` : ''}`}
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
      </Loader>
    </ListWrap>
  );
};

export default Information;
