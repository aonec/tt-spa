import React, { useContext } from 'react';
import { HeaderWrap, Title, Subtitle } from '01/_components';
import styled from 'styled-components';
import { IconTT } from '../../../tt-components';
import Breadcrumb from '../../../tt-components/Breadcrumb/Breadcrumb';
import { NodeContext } from '../index';

export const Header = () => {
  const { node, calculator } = useContext(NodeContext);
  // const {
  //   model, serialNumber, resource, address,
  // } = node;

  const {
    model, serialNumber, resource, address,
  } = calculator;

  const {
    id: objectId, city, street, housingStockNumber, corpus,
  } = address;
  // console.log("calculator", calculator)

  const { id, nodeResourceType, nodeStatus } = node;

  const NodeStatus = ({ nodeStatus }) => {
    console.log('NodeStatus', NodeStatus);
    let icon;
    if (nodeStatus === 'Сдан на коммерческий учет') {
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
        {nodeStatus}
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
        <Breadcrumb path="/nodes" />
        <div>
          <TitleWrap>
            <IconTT icon={nodeResourceType.toLowerCase()} size={24} style={{ marginRight: '8px' }} />
            <Title>{`Узел ${id}`}</Title>
          </TitleWrap>
        </div>

        <SubtitleWrap>
          <Subtitle
            to={` / objects /${objectId}`}
          >
            {`${city}, ${street}, ${housingStockNumber}${corpus ? `, к.${corpus}` : ''}`}
          </Subtitle>
          <NodeStatus nodeStatus={nodeStatus} />
        </SubtitleWrap>
      </div>
      <div style={{ position: 'relative' }} />
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
