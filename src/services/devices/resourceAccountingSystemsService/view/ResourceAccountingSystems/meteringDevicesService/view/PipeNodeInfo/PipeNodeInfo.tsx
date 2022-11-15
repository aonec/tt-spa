import React, { FC } from 'react';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { Name, Wrapper } from './PipeNodeInfo.styled';
import { PipeNodeInfoProps } from './PipeNodeInfo.types';

export const PipeNodeInfo: FC<PipeNodeInfoProps> = ({ pipeNode }) => {
  return (
    <Wrapper to={`/nodes/${pipeNode?.id}`}>
      <ResourceIconLookup resource={pipeNode.resource} />
      <Name>Узел {pipeNode.number}</Name>
    </Wrapper>
  );
};
