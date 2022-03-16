import NodeConnection from '01/tt-components/NodeConnection';
import { PipeNodeResponse } from 'myApi';
import React, { FC } from 'react';

interface Props {
  node: PipeNodeResponse;
  onEdit(): void;
  onRemoveConnection(): void;
}

export const EditNodeCalculatorConnection: FC<Props> = ({
  node,
  onEdit,
  onRemoveConnection,
}) => {
  return (
    <>
      <NodeConnection
        onEdit={onEdit}
        onRemoveConnection={onRemoveConnection}
        edit
        node={node}
      />
    </>
  );
};
