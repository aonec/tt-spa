import React, { useContext } from 'react';
import { convertDate } from '01/_api/utils/convertDate';
import {
  ListWrap, ListItem, Title, Loader,
} from '01/_components';
import { DeviceContext } from '../index';

export const Information = () => {
  const { device, mistake } = useContext(DeviceContext);
  const loading = !device;
  const {
    commercialAccountingDate, futureCheckingDate, lastCheckingDate, closingDate,
  } = device;

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
          <span>Статус прибора</span>
          <span>{closingDate === null ? 'Активен' : 'Не активен'}</span>
        </ListItem>

        <ListItem>
          <span>Дата ввода в эксплуатацию</span>
          <span>{convertDate(commercialAccountingDate)}</span>
        </ListItem>

        <ListItem>
          <span>Дата начальной поверки</span>
          <span>{convertDate(lastCheckingDate)}</span>
        </ListItem>

        <ListItem>
          <span>Дата следующей поверки прибора</span>
          <span>{convertDate(futureCheckingDate)}</span>
        </ListItem>

        <ListItem>
          <span>Дата следующей поверки прибора</span>
          <span>{convertDate(futureCheckingDate)}</span>
        </ListItem>

        <ListItem>
          <span>Тип ресурса</span>
          <span>{convertDate(futureCheckingDate)}</span>
        </ListItem>

        <ListItem>
          <span>Место установки</span>
          <span></span>
        </ListItem>

        <ListItem>
          <span>Тип пломбы</span>
          <span></span>
        </ListItem>

        <ListItem>
          <span>Магнитная пломба</span>
          <span></span>
        </ListItem>

        <ListItem>
          <span>Организация</span>
          <span></span>
        </ListItem>

        <ListItem>
          <span>Монтажная организация</span>
          <span></span>
        </ListItem>


      </Loader>
    </ListWrap>
  );
};

export default Information;
