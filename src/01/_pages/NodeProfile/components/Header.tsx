import React from 'react';
import styled from 'styled-components';
import { useEvent } from 'effector-react';
import { useHistory } from 'react-router-dom';
import { IconTT, MenuButtonTT } from '../../../tt-components';
import { nodeStatusList } from '../../../tt-components/localBases';
import getAccessesList from '../../../_api/utils/getAccessesList';
import { MenuButtonInterface } from '../../../tt-components/interfaces';
import { HeaderWrap, Title, Subtitle } from '../../../_components/Headers';
import { Tooltip } from 'antd';
import { PipeNodeResponse } from '../../../../api/types';
import { fullAddressesString } from '../../../../utils/additionalAddressesString';
import { nodeCommercialRegistrationService } from '../../../features/nodes/changeNodeStatusService/nodeCommercialRegistrationService';
import { AdditionalAddress } from '../../CalculatorProfile/components/Header.styled';

interface HeaderInterface {
  node: PipeNodeResponse;
  nodeId: number;
}

export const Header = ({ node, nodeId }: HeaderInterface) => {
  const { push } = useHistory();
  const access = getAccessesList();

  const openRegisterNodeOnCommercialAccountingModal = useEvent(
    nodeCommercialRegistrationService.inputs.openModal
  );

  const { show } = access;

  if (!node) {
    return null;
  }

  const { resource, nodeStatus, number, address } = node;
  const { id: objectId  } =
    address || {};

  const { value } = nodeStatus || {};
  const menuButtonArr: MenuButtonInterface[] = [
    {
      title: 'Редактировать узел',
      show: show('CalculatorUpdate'),
      cb: () => {
        push(`/nodes/${nodeId}/edit`);
      },
    },
    {
      title:
        value === 'Registered'
          ? 'Снять узел с комерческого учета'
          : 'Поставить узел на комерческий учет',
      show: true,
      cb: () => openRegisterNodeOnCommercialAccountingModal(),
    },
  ];

  const getNodeStatus =
    nodeStatusList.find(
      (nodeStatusItem) => nodeStatusItem.value === nodeStatus?.value
    )?.label ?? 'Статус не определен';
  const getNodeIconStatus =
    nodeStatusList.find(
      (nodeStatusItem) => nodeStatusItem.value === nodeStatus?.value
    )?.icon ?? 'close';

  const NodeStatus = () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: 8,
      }}
    >
      <IconTT icon={getNodeIconStatus} size={16} style={{ marginRight: 8 }} />
      {getNodeStatus}
    </div>
  );
  const additionalAdress = fullAddressesString(address);

  return (
    <HeaderWrap
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <TitleWrap>
          <IconTT
            icon={(resource || 'node').toLowerCase()}
            size={24}
            style={{ marginRight: 8 }}
          />
          <Title>{`Узел ${number}`}</Title>
        </TitleWrap>

        <SubtitleWrap>
          <Subtitle to={`/objects/${objectId}`}>
          <Tooltip title={additionalAdress}>
            <AdditionalAddress>{additionalAdress}</AdditionalAddress>
          </Tooltip>
          </Subtitle>
          <NodeStatus />
        </SubtitleWrap>
      </div>
      <MenuButtonTT menuButtonArr={menuButtonArr} />
    </HeaderWrap>
  );
};

export default Header;

export const TitleWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const SubtitleWrap = styled.div`
  display: flex;
  align-items: center;
`;
