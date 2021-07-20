import React from 'react';
import moment from 'moment';
import { ListWrap, ListItem, Title } from '../../../tt-components/List';
import { Subtitle } from '../../../_components/Headers';
import { nodeStatusList } from '../../../tt-components/localBases';
import { CalculatorIntoNodeResponse, NodeResponse } from '../../../../myApi';
import { useParams } from 'react-router-dom';

interface HeaderInterface {
  node: NodeResponse;
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
  const { city, street, housingStockNumber, corpus, id } = address || {};

  const getNodeStatus =
    nodeStatusList.find(
      (nodeStatusItem) => nodeStatusItem.value === nodeStatus?.value
    )?.label ?? 'Статус не определен';

  const renderAddressParam = (param: string | undefined | null) =>
    param ? `, к.${param}` : '';

  return (
    <ListWrap>
      {!task ? (
        <ListItem>
          <span>Адрес</span>
          <Subtitle to={`/objects/${id}`}>
            {address
              ? `${city}, ${street}, ${housingStockNumber} ${
                  corpus ? `, к.${corpus}` : ''
                }`
              : ''}
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
      <ListItem>
        <span>Дата начала действия акта-допуска</span>
        <div>{moment(lastCommercialAccountingDate).format('DD.MM.YYYY')}</div>
      </ListItem>
      <ListItem>
        <span>Дата окончания действия акта-допуска</span>
        <div>
          {futureCommercialAccountingDate
            ? moment(futureCommercialAccountingDate).format('DD.MM.YYYY')
            : ''}
        </div>
      </ListItem>
    </ListWrap>
  );
};

export default Information;
