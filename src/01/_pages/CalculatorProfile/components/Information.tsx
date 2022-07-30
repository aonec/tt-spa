import React from 'react';
import { Subtitle } from '../../../_components/Headers';
import moment from 'moment';
import {
  DEFAULT_BUILDING,
  DEFAULT_DEVICE,
} from '../../../tt-components/localBases';
import { Tooltip } from 'antd';
import { AdditionalAddressDescription } from './Header.styled';
import { additionalAddressesString } from '../../../../utils/additionalAddressesString';
import { getHousingStockAddress } from '../../../../utils/getHousingStockAddress';
import { CalculatorResponse } from '../../../../api/types';
import { ListItem, ListWrap } from '../../../_components/List';
interface InformationInterface {
  device: CalculatorResponse | null;
}

export const Information = ({ device }: InformationInterface) => {
  const { address } = device || {};
  const { id } = address || DEFAULT_BUILDING;
  const { futureCheckingDate, lastCheckingDate } = device || DEFAULT_DEVICE;

  const additionalAdress = additionalAddressesString(address as any);
  return (
    <ListWrap>
      <ListItem>
        <span>Адрес</span>
        <Subtitle to={`/objects/${id}`} style={{ padding: 8 }}>
          {address && getHousingStockAddress(address, true)}
          <Tooltip title={additionalAdress}>
            <AdditionalAddressDescription>
              {additionalAdress}
            </AdditionalAddressDescription>
          </Tooltip>
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
