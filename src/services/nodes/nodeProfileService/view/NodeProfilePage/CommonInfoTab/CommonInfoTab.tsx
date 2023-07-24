import React, { FC, useMemo } from 'react';
import moment from 'moment';
import { NodeStatusIconsDictionary } from 'services/devices/resourceAccountingSystemsService/view/ResourceAccountingSystems/NodesGroup/NodeItem/NodeStatus/NodeStatus.constants';
import { CommonInfo } from 'ui-kit/shared_components/CommonInfo';
import { getBuildingAddress } from 'utils/getBuildingAddress';
import { AddressWrapper, NodeStatusWrapper } from './CommonInfoTab.styled';
import { CommonInfoTabProps } from './CommonInfoTab.types';
import { additionalAddressesString } from 'utils/additionalAddressesString';
import { Tooltip } from 'antd';
import { EHouseCategory, ENodeRegistrationType } from 'myApi';
import { configNamesLookup } from 'utils/configNamesLookup';
import { NodeRegistrationTypeLookup } from 'dictionaries';

export const CommonInfoTab: FC<CommonInfoTabProps> = ({ pipeNode }) => {
  const NodeStatusIcon =
    pipeNode?.commercialStatus?.value &&
    NodeStatusIconsDictionary[pipeNode?.commercialStatus?.value];

  const additionalAdress = additionalAddressesString(pipeNode.address);
  const isNodeCommercial =
    pipeNode.registrationType === ENodeRegistrationType.Commercial;

  const buildingProfilePath = useMemo(() => {
    if (pipeNode?.address?.houseCategory === EHouseCategory.Living) {
      return 'livingProfile';
    }
    return 'nonResidentialProfile';
  }, [pipeNode]);

  const addressComponent = (() => {
    if (!pipeNode.address) {
      return '-';
    }
    return (
      <Tooltip title={additionalAdress}>
        <AddressWrapper
          to={`/buildings/${buildingProfilePath}/${pipeNode.address.id}`}
        >
          {getBuildingAddress(pipeNode.address, true)}
        </AddressWrapper>
      </Tooltip>
    );
  })();

  return (
    <CommonInfo
      items={[
        {
          key: 'Адрес',
          value: addressComponent,
        },
        {
          key: 'Зона',
          value: pipeNode?.nodeServiceZone?.name,
        },
        {
          key: 'Конфигурация узла',
          value: pipeNode.configuration && (
            <NodeStatusWrapper>
              <div>{configNamesLookup[pipeNode.configuration]}</div>
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
              <div>{pipeNode?.commercialStatus?.description}</div>
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
