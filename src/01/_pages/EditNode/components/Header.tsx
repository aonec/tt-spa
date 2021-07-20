import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { IconTT } from '../../../tt-components';
import { nodeStatusList } from '../../../tt-components/localBases';
import getAccessesList from '../../../_api/utils/getAccessesList';
import { CalculatorResponse, NodeResponse } from '../../../../myApi';
import { HeaderWrap, Title, Subtitle } from '../../../_components/Headers';

interface HeaderInterface {
  node: NodeResponse;
  nodeId: number;
  setAddDevice?: Dispatch<SetStateAction<boolean>>;
}

export const Header = ({ node }: HeaderInterface) => {
  if (!node) {
    return null;
  }

  const { resource, nodeStatus, number, address } = node;
  const { id: objectId, city, street, housingStockNumber, corpus } =
    address || {};

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
          <Title>{`Узел ${number}. Редактирование`}</Title>
        </TitleWrap>

        <SubtitleWrap>
          <Subtitle to={`/objects/${objectId}`}>
            {`${city}, ${street}, ${housingStockNumber}${
              corpus ? `, к.${corpus}` : ''
            }`}
          </Subtitle>
          <NodeStatus />
        </SubtitleWrap>
      </div>
    </HeaderWrap>
  );
};

export default Header;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
`;

const SubtitleWrap = styled.div`
  display: flex;
  align-items: center;
`;
