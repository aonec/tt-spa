import React, { FC } from 'react';
import styled from 'styled-components';
import { inputs } from '../models';

export const TaskNodeStatistic: FC<{ id: number }> = ({ id }) => {
  const { NodeGate } = inputs;

  return (
    <>
      <NodeGate id={id} />
      <Wrap>
        <Title>Статистика</Title>
        <Panel></Panel>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  margin-top: 15px;
`;

const Panel = styled.div`
  background: white;
  box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16),
    0px 8px 16px rgba(78, 93, 146, 0.08);
  padding: 15px;
`;

const Title = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 32px;
  color: #272f5a;
  margin-bottom: 15px;
`;
