import React from 'react';
import { translateMountPlace } from '../../../utils/translateMountPlace';
import { translateResource } from '../../../utils/translateResource';
import { IndividualDeviceResponse } from '../../../../myApi';
import moment from 'moment';
import styled from 'styled-components';
import { Loader } from '../../../_components/Loader';

interface InformationInterface {
  device: IndividualDeviceResponse;
}

export const Information = ({ device }: InformationInterface) => {
  const loading = !device;
  const {
    lastCommercialAccountingDate,
    futureCheckingDate,
    lastCheckingDate,
    mountPlace,
    resource,
    hasMagneticSeal,
  } = device;

  return (
    <ListWrap>
      <Loader show={loading} size="32">
        <ListItem
          title={'Тип ресурса'}
          description={translateResource(resource)}
        />
        <ListItem
          title={'Место установки'}
          description={translateMountPlace(mountPlace)}
        />
        <ListItem
          title={'Дата ввода в эксплуатацию'}
          description={moment(lastCommercialAccountingDate).format(
            'DD.MM.YYYY'
          )}
        />
        <ListItem
          title={'Дата начальной поверки'}
          description={moment(lastCheckingDate).format('DD.MM.YYYY')}
        />
        <ListItem
          title={'Дата следующей поверки прибора'}
          description={moment(futureCheckingDate).format('DD.MM.YYYY')}
        />
        <ListItem
          title={'Магнитная пломба'}
          description={hasMagneticSeal ? 'Есть' : 'Нет'}
        />
        {/*<ListItem title={'title'} description={'description'} />*/}
      </Loader>
    </ListWrap>
  );
};

export default Information;

interface ListItemInterface {
  title: string;
  description: string | boolean | undefined;
}

const ListItem = ({ title, description }: ListItemInterface) => {
  return (
    <StyledListItem>
      <span>{title}</span>
      <span>{description}</span>
    </StyledListItem>
  );
};

const ListWrap = styled.div`
  display: grid;
  height: min-content;
}
`;

const StyledListItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 48px;
  align-items: center;
  border-bottom: 1px solid var(--frame);

  &[|url] {
    cursor: pointer;
    font-weight: 500;
    opacity: 1;

    &:hover {
      color: var(--primary-100);
    }
  }

  & span {
    padding: 8px;
    opacity: 0.7;

    &:first-of-type {
      opacity: 0.9;
      font-weight: normal;
    }
  }
}
`;
