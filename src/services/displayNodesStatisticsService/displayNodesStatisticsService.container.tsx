import { GraphFilterForm } from '01/_pages/Graph/components/GraphFilterForm';
import { getGraphParams } from '01/_pages/Graph/utils';
import { useEvent, useStore } from 'effector-react';
import React, { FC } from 'react';
import { displayNodesStatisticsService } from './displayNodesStatisticsService.model';
import { DisplayNodesStatisticsContainerProps } from './displayNodesStatisticsService.types';

const { inputs, outputs, gates } = displayNodesStatisticsService;
const { NodeIdGate } = gates;

export const DisplayNodesStatisticsContainer: FC<DisplayNodesStatisticsContainerProps> = ({
  nodeId,
  pipeCount,
  resource,
}) => {
  const currentArhiveFilter = useStore(outputs.$archiveFilter);
  const graphType = useStore(outputs.$graphType);

  const setGraphType = useEvent(inputs.setGraphType);
  const setArchiveFilter = useEvent(inputs.setArchiveFilter);

  return (
    <>
      <NodeIdGate nodeId={nodeId} />
      <GraphFilterForm
        currentGraphParam={graphType}
        currentFilter={currentArhiveFilter}
        paramsList={getGraphParams(resource, pipeCount)}
        setGraphParam={setGraphType}
        setArchiveFilter={setArchiveFilter}
      />
    </>
  );
};
