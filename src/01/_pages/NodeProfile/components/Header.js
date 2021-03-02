import React, { useContext } from 'react';
import { HeaderWrap, Title, Subtitle } from '01/_components';
import styled from 'styled-components';
import _ from 'lodash';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { IconTT, MenuButtonTT } from '../../../tt-components';
import { NodeContext } from '../index';
import { nodeStatusList } from '../../../tt-components/localBases';

export const Header = () => {
  const { node, calculator, setAddOdpu } = useContext(NodeContext);
  const {
    id: nodeId, resource, nodeStatus, number,
  } = node;
  const {
    id: objectId, city, street, housingStockNumber, corpus,
  } = calculator.address;

  const { push } = useHistory();
  const { url } = useRouteMatch('/nodes/(\\d+)');

  const arr = [{
    title: 'Редактировать узел',
    itemFunction: () => {
      push(`${url}/edit`);
    },
  },
  {
    title: 'Добавить новый прибор',
    itemFunction: () => {
      setAddOdpu(true)
    },
  },
  {
    title: 'Поставить/Снять узел на коммерческий учёт',
    itemFunction: () => {
      alert('Поставить/Снять узел на коммерческий учёт');
    },
  },
  ];

  const getNodeStatus = _.find(nodeStatusList, { value: nodeStatus })?.label ?? 'Статус не определен';
  const getNodeIconStatus = _.find(nodeStatusList, { value: nodeStatus })?.icon ?? 'del';

  const NodeStatus = () => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      marginLeft: '8px',
    }}
    >
      <IconTT icon={getNodeIconStatus} size={16} style={{ marginRight: '8px' }} />
      {getNodeStatus}
    </div>
  );

  return (
    <HeaderWrap style={{
      display: 'flex',
      justifyContent: 'space-between',
    }}
    >
      <div>

        <TitleWrap>
          <IconTT icon={resource.toLowerCase()} size={24} style={{ marginRight: '8px' }} />
          <Title>{`Узел ${number}`}</Title>
        </TitleWrap>

        <SubtitleWrap>
          <Subtitle
            to={`/objects/${objectId}`}
          >
            {`${city}, ${street}, ${housingStockNumber}${corpus ? `, к.${corpus}` : ''}`}
          </Subtitle>
          <NodeStatus />
        </SubtitleWrap>
      </div>
      <MenuButtonTT arr={arr} />
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
