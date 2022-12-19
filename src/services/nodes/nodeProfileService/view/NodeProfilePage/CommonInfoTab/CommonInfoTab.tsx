import React, { FC } from 'react';
import moment from 'moment';
import { NodeStatusIconsDictionary } from 'services/devices/resourceAccountingSystemsService/view/ResourceAccountingSystems/NodesGroup/NodeItem/NodeStatus/NodeStatus.constants';
import { CommonInfo } from 'ui-kit/shared_components/CommonInfo';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import { resourceNamesLookup } from 'utils/resourceNamesLookup';
import {
  AddressWrapper,
  NodeStatusWrapper,
  Wrapper,
} from './CommonInfoTab.styled';
import { CommonInfoTabProps } from './CommonInfoTab.types';

export const CommonInfoTab: FC<CommonInfoTabProps> = ({ pipeNode }) => {
  const NodeStatusIcon =
    pipeNode?.nodeStatus?.value &&
    NodeStatusIconsDictionary[pipeNode?.nodeStatus?.value];

  return (
    <CommonInfo
      items={[
        {
          key: 'Адрес',
          value: (
            <AddressWrapper to={`/objects/profile/${pipeNode?.address?.id}`}>
              {pipeNode?.address &&
                getHousingStockAddress(pipeNode?.address, true)}
            </AddressWrapper>
          ),
        },
        {
          key: 'Зона',
          value: pipeNode?.nodeServiceZone?.name,
        },
        {
          key: 'Ресурс',
          value: pipeNode?.resource && (
            <NodeStatusWrapper>
              <ResourceIconLookup resource={pipeNode.resource} />
              <div>{resourceNamesLookup[pipeNode.resource]}</div>
            </NodeStatusWrapper>
          ),
        },
        {
          key: 'Коммерческий учет показателей приборов',
          value: (
            <NodeStatusWrapper>
              {NodeStatusIcon && <NodeStatusIcon />}
              <div>{pipeNode?.nodeStatus?.description}</div>
            </NodeStatusWrapper>
          ),
        },
        {
          key: 'Дата начала действия акта-допуска',
          value:
            pipeNode?.lastCommercialAccountingDate &&
            moment(pipeNode?.lastCommercialAccountingDate).format('DD.MM.YYYY'),
        },
        {
          key: 'Дата окончания действия акта-допуска',
          value:
            pipeNode?.futureCommercialAccountingDate &&
            moment(pipeNode?.futureCommercialAccountingDate).format(
              'DD.MM.YYYY'
            ),
        },
      ]}
    />
  );
};
