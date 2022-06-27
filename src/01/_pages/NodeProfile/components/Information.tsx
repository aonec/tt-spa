import React from 'react';
import moment from 'moment';
import { ListWrap, ListItem } from '../../../tt-components/List';
import { Subtitle } from '../../../_components/Headers';
import { nodeStatusList } from '../../../tt-components/localBases';
import {
  CalculatorIntoNodeResponse,
  PipeNodeResponse,
} from '../../../../myApi';
import { Tooltip } from 'antd';
import { AdditionalAddress } from '01/_pages/CalculatorProfile/components/Header.styled';
import { additionalAddressesString } from 'utils/additionalAddressesString';

interface HeaderInterface {
  node: PipeNodeResponse;
  calculator: CalculatorIntoNodeResponse | null;
  task?: boolean;
}

const Information = ({ node, task = false }: HeaderInterface) => {
  if (!node) {
    return null;
  }

  const {
    nodeServiceZone,
    nodeStatus,
    lastCommercialAccountingDate,
    futureCommercialAccountingDate,
  } = node;

  const { address } = node || {};
  const { id } = address || {};

  const getNodeStatus =
    nodeStatusList.find(
      (nodeStatusItem) => nodeStatusItem.value === nodeStatus?.value
    )?.label ?? 'Статус не определен';

  const isRegistered = nodeStatus?.value === 'Registered';

  const adAdress = additionalAddressesString(address);

  return (
    <ListWrap>
      {!task ? (
        <ListItem>
          <span>Адрес</span>
          <Subtitle to={`/objects/${id}`}>
            <Tooltip title={adAdress}>
              <AdditionalAddress>{adAdress}</AdditionalAddress>
            </Tooltip>
          </Subtitle>
        </ListItem>
      ) : null}
      <ListItem>
        <span>Зона</span>
        <div>{nodeServiceZone?.name}</div>
      </ListItem>
      <ListItem>
        <span>Коммерческий учет показателей приборов</span>
        <div>{getNodeStatus}</div>
      </ListItem>
      {isRegistered && (
        <>
          <ListItem>
            <span>Дата начала действия акта-допуска</span>
            <div>
              {moment(lastCommercialAccountingDate).format('DD.MM.YYYY')}
            </div>
          </ListItem>
          <ListItem>
            <span>Дата окончания действия акта-допуска</span>
            <div>
              {futureCommercialAccountingDate
                ? moment(futureCommercialAccountingDate).format('DD.MM.YYYY')
                : ''}
            </div>
          </ListItem>
        </>
      )}
    </ListWrap>
  );
};

export default Information;
