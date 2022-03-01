import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Icon } from '01/tt-components';
import { useStore } from 'effector-react';
import React, { FC } from 'react';
import { ChevronRight } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { inputs, outputs } from '../models';

export const TaskNodeStatistic: FC<{ id: number }> = ({ id }) => {
  const { NodeGate } = inputs;
  const { $node } = outputs;

  const node = useStore($node);

  return (
    <>
      <NodeGate id={id} />
      <Wrap>
        <Title>Статистика</Title>
        <Panel>
          <Flex>
            <Icon icon={node?.resource.toLowerCase()} />
            <Space />
            <NodeName>Узел {node?.number}</NodeName>
          </Flex>
          <StatisticLink to={`/nodes/${node?.id}/stats`}>
            Перейти
            <Space w={5} />
            <ChevronRight />
          </StatisticLink>
        </Panel>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  margin-top: 15px;
`;

const Panel = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  background: white;
  box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16),
    0px 8px 16px rgba(78, 93, 146, 0.08);
  padding: 15px;
`;

const NodeName = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const Title = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 32px;
  color: #272f5a;
  margin-bottom: 15px;
`;

const StatisticLink = styled(Link)`
  display: flex;
  align-items: center;
`;
