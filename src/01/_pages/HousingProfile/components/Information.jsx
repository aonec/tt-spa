import React, { useContext } from 'react';
import { convertDateDots } from '01/_api/utils/convertDate';
import { Loader } from '01/components';
import { ListWrap, ListItem, Title } from '01/_components/List';
import _ from 'lodash';
import { HousingContext } from '../HousingProfile';
import { DEFAULT_BUILDING, DEFAULT_DEVICE } from './Templates';
import { Subtitle } from '../../../_components/Headers';

export const Information = (loading = true) => {
  const { device, loadings, error } = useContext(HousingContext);

  const loadingDevice = _.get(loadings, 'device', true);

  loading = loadingDevice;

  const buttonHandler = () => {
    console.log('buttonHandler');
  };

  const { address } = device || {};
  const {
    city, street, housingStockNumber, corpus, id,
  } = address || DEFAULT_BUILDING;
  const { futureCommercialAccountingDate, lastCommercialAccountingDate, futureCheckingDate, lastCheckingDate } = device || DEFAULT_DEVICE;

  const errorOfComponent = _.get(error, 'resource', null);

  console.log('device', device);
  if (errorOfComponent) {
    return (
      <ListWrap>
        <Title>{error.message}</Title>
        {/* <button onClick={buttonHandler}>button</button> */}
      </ListWrap>
    );
  }

  return (
    <ListWrap>
      <Loader show={loading} size="32">
        <Title>Информация</Title>
        <ListItem>
          <span>Адрес</span>
          <Subtitle to={`/objects/${id}`}>
            {`${city}, ${street}, ${housingStockNumber} ${corpus ? `, к.${corpus}` : ''}`}
          </Subtitle>
        </ListItem>
        <ListItem>
          <span>Дата поверки прибора</span>
          <span>{convertDateDots(lastCheckingDate)}</span>
        </ListItem>
        <ListItem>
          <span>Дата следующей поверки прибора</span>
          <span>{convertDateDots(futureCheckingDate)}</span>
        </ListItem>
        <ListItem>
          <span>Дата начала действия акта-допуска</span>
          <span>{convertDateDots(lastCommercialAccountingDate)}</span>
        </ListItem>
        <ListItem>
          <span>Дата окончания действия акта-допуска</span>
          <span>{convertDateDots(futureCommercialAccountingDate)}</span>
        </ListItem>
      </Loader>
    </ListWrap>
  );
};

export default Information;
