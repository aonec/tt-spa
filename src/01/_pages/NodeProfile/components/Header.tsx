import React, { Dispatch, SetStateAction } from 'react';
import { HeaderWrap, Title, Subtitle } from '01/_components';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { IconTT, MenuButtonTT } from '../../../tt-components';
import { nodeStatusList } from '../../../tt-components/localBases';
import getAccessesList from '../../../_api/utils/getAccessesList';
import { CalculatorResponse, NodeResponse } from '../../../../myApi';
import { MenuButtonInterface } from '../../../tt-components/interfaces';

interface HeaderInterface {
  node: NodeResponse;
  calculator: CalculatorResponse | null;
  nodeId: number;
  setAddDevice: Dispatch<SetStateAction<boolean>>;
}

export const Header = ({
  node,
  calculator,
  setAddDevice,
  nodeId,
}: HeaderInterface) => {
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

  const menuButtonArr: MenuButtonInterface[] = [
    {
      title: 'Редактировать узел',
      show: show('CalculatorUpdate'),
      cb: () => {
        push(`/nodes/${nodeId}/edit`);
      },
    },
    {
      title: 'Добавить новый прибор',
      show: show('CalculatorUpdate'),
      cb: () => {
        setAddDevice(true);
      },
    },
    {
      title: 'Поставить/Снять узел на коммерческий учёт',
      show: show('CalculatorUpdate'),
      cb: () => {
        alert('Поставить/Снять узел на коммерческий учёт');
      },
    },
  ];

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
          <Title>{`Узел ${number}`}</Title>
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
