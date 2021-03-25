import React, { useContext } from 'react';
import { convertDateDots } from '01/_api/utils/convertDate';
import { Loader } from '01/components';
import { ListWrap, ListItem, Title } from '01/_components/List';
import _ from 'lodash';
import { DeviceContext } from '../DeviceProfile';
import { DEFAULT_BUILDING, DEFAULT_DEVICE } from './Templates';

export const Information = (loading = true) => {
  const { device, building, loadings, error } = useContext(DeviceContext);

  const loadingDevice = _.get(loadings, 'device', true);
  const loadingBuilding = _.get(loadings, 'building', true);

  loading = loadingDevice || loadingBuilding;

  const buttonHandler = () => {
    console.log('buttonHandler');
  };
  const { city, street, housingStockNumber, corpus } =
    building || DEFAULT_BUILDING;
  const { lastCommercialAccountingDate, futureCheckingDate, lastCheckingDate } =
    device || DEFAULT_DEVICE;

  const errorOfComponent = _.get(error, 'resource', null);
  // console.log('error', error);

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
          <span style={{ fontWeight: '500' }}>
            {`${city}, ${street}, ${housingStockNumber}${
              corpus ? `, к.${corpus}` : ''
            }`}
          </span>
        </ListItem>
        <ListItem>
          <span>Дата ввода в эксплуатацию</span>
          <span>{convertDateDots(lastCommercialAccountingDate)}</span>
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
