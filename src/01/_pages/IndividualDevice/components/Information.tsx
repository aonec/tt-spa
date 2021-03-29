import React from 'react';
import { convertDateDots } from '01/_api/utils/convertDate';
import { ListWrap, ListItem, Title, Loader } from '01/_components';
import { translateMountPlace } from '../../../utils/translateMountPlace';
import { translateResource } from '../../../utils/translateResource';
import { IndividualDeviceResponse } from '../../../../myApi';

interface InformationInterface {
  device: IndividualDeviceResponse;
}

export const Information = ({ device }: InformationInterface) => {
  const loading = !device;
  const {
    lastCommercialAccountingDate,
    futureCheckingDate,
    lastCheckingDate,
    closingDate,
    mountPlace,
    resource,
  } = device;

  return (
    <ListWrap>
      <Loader show={loading} size="32">
        <Title>Информация</Title>

        <ListItem>
          <span>Статус прибора</span>
          <span>{closingDate ? 'Активен' : 'Не активен'}</span>
        </ListItem>

        <ListItem>
          <span>Дата ввода в эксплуатацию</span>
          <span>{convertDateDots(lastCommercialAccountingDate)}</span>
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

        {/*<StyledListItem>*/}
        {/*  <span>Тип пломбы</span>*/}
        {/*  <span></span>*/}
        {/*</StyledListItem>*/}

        {/*<StyledListItem>*/}
        {/*  <span>Магнитная пломба</span>*/}
        {/*  <span></span>*/}
        {/*</StyledListItem>*/}

        {/*<StyledListItem>*/}
        {/*  <span>Организация</span>*/}
        {/*  <span></span>*/}
        {/*</StyledListItem>*/}

        {/*<StyledListItem>*/}
        {/*  <span>Монтажная организация</span>*/}
        {/*  <span></span>*/}
        {/*</StyledListItem>*/}
      </Loader>
    </ListWrap>
  );
};

export default Information;
