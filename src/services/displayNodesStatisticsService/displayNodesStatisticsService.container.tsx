import { GraphFilterForm } from '01/_pages/Graph/components/GraphFilterForm';
import { GraphView } from '01/_pages/Graph/components/GraphView';
import { getGraphParams } from '01/_pages/Graph/utils';
import { Skeleton } from 'antd';
import { useEvent, useStore } from 'effector-react';
import React, { FC } from 'react';
import { displayNodesStatisticsService } from './displayNodesStatisticsService.model';
import { Title, Wrapper } from './displayNodesStatisticsService.styled';
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
  const archiveData = useStore(outputs.$archiveReadings);
  const isLoading = useStore(outputs.$isLoading);

  const setGraphType = useEvent(inputs.setGraphType);
  const setArchiveFilter = useEvent(inputs.setArchiveFilter);

  return (
    <>
      <NodeIdGate nodeId={nodeId} />
      <div>
        <Title>Статистика по объекту</Title>
        <GraphFilterForm
          currentGraphParam={graphType}
          currentFilter={currentArhiveFilter}
          paramsList={getGraphParams(resource, pipeCount)}
          setGraphParam={setGraphType}
          setArchiveFilter={setArchiveFilter}
        />
        {isLoading && <Skeleton active />}
        {!isLoading && (
          <Wrapper>
            {archiveData && (
              <GraphView
                graphParam={graphType}
                data={archiveData}
                reportType={currentArhiveFilter.reportType}
              />
            )}
          </Wrapper>
        )}
      </div>
    </>
  );
};
