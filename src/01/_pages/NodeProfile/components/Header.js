import React, { useContext } from 'react';
import { HeaderWrap, Title, Subtitle } from '01/_components';
import styled from 'styled-components';
import { IconTT } from '../../../tt-components';
import { NodeContext } from "../index";
import { nodeStatusList } from '../../../tt-components/localBases';
import _ from 'lodash';
import EditButton from './EditButton'
export const Header = () => {

  const { node, calculator,arr } = useContext(NodeContext);
  const {
    model, serialNumber, address,
  } = calculator;
  const {
    id: objectId, city, street, housingStockNumber, corpus
  } = address;


  const { id, resource, nodeStatus, number } = node;



  const NodeStatus = ({ nodeStatus }) => {
    let icon;
    const getNodeStatus = _.find(nodeStatusList, {value: nodeStatus}).label;
    if (nodeStatus === 'Registered') {
      icon = <IconTT icon="ok" size={16} style={{ marginRight: '8px' }}/>;
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
            <IconTT icon={resource.toLowerCase()} size={24} style={{ marginRight: '8px' }}/>
            <Title>{`Узел ${number}`}</Title>
          </TitleWrap>
        </div>

        <SubtitleWrap>
          <Subtitle
            to={`/objects/${objectId}`}
          >
            {`${city}, ${street}, ${housingStockNumber}${corpus ? `, к.${corpus}` : ''}`}
          </Subtitle>
          <NodeStatus nodeStatus={nodeStatus}/>
        </SubtitleWrap>
      </div>
      <div style={{ position: 'relative' }}>
        <EditButton arr={arr}/>
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
