import React, { Dispatch, SetStateAction, useContext } from 'react';
import { ListWrap, ListItem, Title } from '01/_components/List';
import { Subtitle } from '../../../_components/Headers';
import moment from 'moment';
import { CalculatorResponse } from '../../../../myApi';
import {
  DEFAULT_BUILDING,
  DEFAULT_DEVICE,
} from '../../../tt-components/localBases';

interface InformationInterface {
  device: CalculatorResponse | null;
}

export const Information = ({ device }: InformationInterface) => {
  const { address } = device || { address: DEFAULT_BUILDING };
  const { city, street, number, corpus, id } = address || DEFAULT_BUILDING;
  const { futureCheckingDate, lastCheckingDate } = device || DEFAULT_DEVICE;

  return (
    <ListWrap>
      <ListItem>
        <span>Адрес</span>
        <Subtitle to={`/objects/${id}`} style={{ padding: 8 }}>
          {`${city}, ${street}, ${number}${corpus ? `, к.${corpus}` : ''}`}
        </Subtitle>
      </ListItem>
      <ListItem>
        <span>Дата поверки прибора</span>
        <span>{moment(lastCheckingDate).format('DD.MM.YYYY')}</span>
      </ListItem>
      <ListItem>
        <span>Дата следующей поверки прибора</span>
        <span>{moment(futureCheckingDate).format('DD.MM.YYYY')}</span>
      </ListItem>
    </ListWrap>
  );
};

export default Information;
