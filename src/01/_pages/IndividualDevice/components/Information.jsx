import React, { useContext } from 'react';
import { convertDate } from '01/_api/utils/convertDate';
import {  ListWrap, ListItem, Title, Loader} from '01/_components';
import { DeviceContext } from '../index';

export const Information = () => {
  const { device, mistake } = useContext(DeviceContext);
  const loading = !device;
  const { address } = device;

  const { city, street, housingStockNumber } = address;
  const { commercialAccountingDate, futureCheckingDate, lastCheckingDate } = device;

  if (mistake) {
    return (
      <ListWrap>
        <Title style={{ color: 'red' }}>Данные не получены</Title>
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
            {`${city},${street},${housingStockNumber}`}
          </span>
        </ListItem>
        <ListItem>
          <span>Дата выпуска прибора</span>
          <span>{convertDate(commercialAccountingDate)}</span>
        </ListItem>
        <ListItem>
          <span>Дата ввода в эксплуатацию</span>
          <span>{convertDate(commercialAccountingDate)}</span>
        </ListItem>
        <ListItem>
          <span>Срок эксплуатации по нормативу</span>
          <span>нет информации</span>
        </ListItem>
        <ListItem>
          <span>Дата поверки прибора</span>
          <span>{convertDate(lastCheckingDate)}</span>
        </ListItem>
        <ListItem>
          <span>Дата следующей поверки прибора</span>
          <span>{convertDate(futureCheckingDate)}</span>
        </ListItem>
      </Loader>
      {/* </info_list> */}
    </ListWrap>
  );
};

export default Information;
