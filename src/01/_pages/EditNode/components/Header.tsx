import React, { Dispatch, SetStateAction, useContext } from 'react';
import { HeaderWrap, Title, Subtitle } from '01/_components';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { IconTT } from '../../../tt-components';
import { nodeStatusList } from '../../../tt-components/localBases';
import getAccessesList from '../../../_api/utils/getAccessesList';
import { CalculatorResponse, NodeResponse } from '../../../../myApi';

interface HeaderInterface {
  node: NodeResponse;
  calculator: CalculatorResponse | null;
  nodeId: number;
  setAddDevice?: Dispatch<SetStateAction<boolean>>;
}

export const Header = ({ node, calculator, nodeId }: HeaderInterface) => {
  const { push } = useHistory();
  const access = getAccessesList();
  const { show } = access;

  if (!node || !calculator) {
    return null;
  }

  const { resource, nodeStatus, number } = node;
  const {
    id: objectId,
    city,
    street,
    housingStockNumber,
    corpus,
  } = calculator.address;

  const getNodeStatus =
    nodeStatusList.find((nodeStatusItem) => nodeStatusItem.value === nodeStatus)
      ?.label ?? 'Статус не определен';
  const getNodeIconStatus =
    nodeStatusList.find((nodeStatusItem) => nodeStatusItem.value === nodeStatus)
      ?.icon ?? 'close';

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
