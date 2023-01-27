import React, { FC } from 'react';
import moment from 'moment';
import { NodeStatusIconsDictionary } from 'services/devices/resourceAccountingSystemsService/view/ResourceAccountingSystems/NodesGroup/NodeItem/NodeStatus/NodeStatus.constants';
import { CommonInfo } from 'ui-kit/shared_components/CommonInfo';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import { resourceNamesLookup } from 'utils/resourceNamesLookup';
import { AddressWrapper, NodeStatusWrapper } from './CommonInfoTab.styled';
import { CommonInfoTabProps } from './CommonInfoTab.types';
import { additionalAddressesString } from 'utils/additionalAddressesString';
import { Tooltip } from 'antd';
import { NodeRegistrationTypeLookup } from './CommonInfoTab.constants';
import { ENodeRegistrationType } from 'myApi';

export const CommonInfoTab: FC<CommonInfoTabProps> = ({ pipeNode }) => {
  const NodeStatusIcon =
    pipeNode?.nodeStatus?.value &&
    NodeStatusIconsDictionary[pipeNode?.nodeStatus?.value];

  const additionalAdress = additionalAddressesString(pipeNode.address);
  const isNodeCommercial =
    pipeNode.registrationType === ENodeRegistrationType.Commercial;

  return (
    <CommonInfo
      items={[
        {
          key: 'Адрес',
          value: (
            <Tooltip title={additionalAdress}>
              <AddressWrapper to={`/objects/profile/${pipeNode?.address?.id}`}>
                {pipeNode?.address &&
                  getHousingStockAddress(pipeNode?.address, true)}
              </AddressWrapper>
            </Tooltip>
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
          key: 'Тип узла',
          value: NodeRegistrationTypeLookup[pipeNode.registrationType],
        },
        {
          key: 'Статус узла',
          hidden: !isNodeCommercial,
          value: (
            <NodeStatusWrapper>
              {NodeStatusIcon && <NodeStatusIcon />}
              <div>{pipeNode?.nodeStatus?.description}</div>
            </NodeStatusWrapper>
          ),
        },
        {
          key: 'Дата начала действия акта-допуска',
          hidden: !isNodeCommercial,
          value:
            pipeNode?.lastCommercialAccountingDate &&
            moment(pipeNode?.lastCommercialAccountingDate).format('DD.MM.YYYY'),
        },
        {
          key: 'Дата окончания действия акта-допуска',
          hidden: !isNodeCommercial,
          value:
            pipeNode?.futureCommercialAccountingDate &&
            moment(pipeNode?.futureCommercialAccountingDate).format(
              'DD.MM.YYYY',
            ),
        },
      ]}
    />
  );
};
