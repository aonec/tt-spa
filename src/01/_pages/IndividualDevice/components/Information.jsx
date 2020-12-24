import React, { useContext } from 'react';
import { convertDateDots } from '01/_api/utils/convertDate';
import {
  ListWrap, ListItem, Title, Loader,
} from '01/_components';
import { DeviceContext } from '../index';
import { translateMountPlace } from "../../../utils/translateMountPlace";
import { translateResource } from "../../../utils/translateResource";


export const Information = () => {
  const { device, mistake } = useContext(DeviceContext);
  const loading = !device;
  const {
    commercialAccountingDate, futureCheckingDate, lastCheckingDate, closingDate, mountPlace ,resource} = device;

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
          <span>{convertDateDots(commercialAccountingDate)}</span>
        </ListItem>

        <ListItem>
          <span>Дата начальной поверки</span>
          <span>{convertDateDots(lastCheckingDate)}</span>
        </ListItem>
        
        <ListItem>
          <span>Дата следующей поверки прибора</span>
          <span>{convertDateDots(futureCheckingDate)}</span>
        </ListItem>

        <ListItem>
          <span>Тип ресурса</span>
          <span>{translateResource(resource)}</span>
        </ListItem>

        <ListItem>
          <span>Место установки</span>
          <span>{translateMountPlace(mountPlace)}</span>
        </ListItem>

        {/*<ListItem>*/}
        {/*  <span>Тип пломбы</span>*/}
        {/*  <span></span>*/}
        {/*</ListItem>*/}

        {/*<ListItem>*/}
        {/*  <span>Магнитная пломба</span>*/}
        {/*  <span></span>*/}
        {/*</ListItem>*/}

        {/*<ListItem>*/}
        {/*  <span>Организация</span>*/}
        {/*  <span></span>*/}
        {/*</ListItem>*/}

        {/*<ListItem>*/}
        {/*  <span>Монтажная организация</span>*/}
        {/*  <span></span>*/}
        {/*</ListItem>*/}


      </Loader>
    </ListWrap>
  );
};

export default Information;
