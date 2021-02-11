import React, { useContext } from 'react';
import { HeaderWrap, Title, Subtitle } from '01/_components';
import styled from 'styled-components';
import _ from 'lodash';
import { IconTT, MenuButtonTT } from '../../../tt-components';
import { NodeContext } from '../index';
import { nodeStatusList } from '../../../tt-components/localBases';
import {useHistory, useRouteMatch} from "react-router-dom";

export const Header = () => {
  const { node, calculator } = useContext(NodeContext);
  const {
    model, serialNumber, address,
  } = calculator;
  const {
    id: objectId, city, street, housingStockNumber, corpus,
  } = address;

  const {
    id, resource, nodeStatus, number,
  } = node;

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
      alert('Добавить новый прибор');
    },
  },
  {
    title: 'Поставить/Снять узел на коммерческий учёт',
    itemFunction: () => {
      alert('Поставить/Снять узел на коммерческий учёт');
    },
  },
  ];

  const NodeStatus = ({ nodeStatus }) => {
    let icon;
    const getNodeStatus = _.find(nodeStatusList, { value: nodeStatus }).label;
    if (nodeStatus === 'Registered') {
      icon = <IconTT icon="ok" size={16} style={{ marginRight: '8px' }} />;
    }
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: '8px',
      }}
      >
        {icon}
        {getNodeStatus}
      </div>
    );
  };

  return (
    <HeaderWrap style={{
      display: 'flex',
      justifyContent: 'space-between',
    }}
    >
      <div>
        <div>
          <TitleWrap>
            <IconTT icon={resource.toLowerCase()} size={24} style={{ marginRight: '8px' }} />
            <Title>{`Узел ${number}`}</Title>
          </TitleWrap>
        </div>

        <SubtitleWrap>
          <Subtitle
            to={`/objects/${objectId}`}
          >
            {`${city}, ${street}, ${housingStockNumber}${corpus ? `, к.${corpus}` : ''}`}
          </Subtitle>
          <NodeStatus nodeStatus={nodeStatus} />
        </SubtitleWrap>
      </div>
      <div style={{ position: 'relative' }}>
        <MenuButtonTT arr={arr} />
      </div>
    </HeaderWrap>
  );
};

export default Header;

export const TitleWrap = styled.div`
  display: inline-flex;
  align-items: center;
`;

export const SubtitleWrap = styled.div`
  display: inline-flex;
  align-items: center;
`;
