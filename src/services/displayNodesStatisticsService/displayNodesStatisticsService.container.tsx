import { GraphFilterForm } from '01/_pages/Graph/components/GraphFilterForm';
import { GraphView } from '01/_pages/Graph/components/GraphView';
import { Skeleton } from 'antd';
import { useEvent, useStore } from 'effector-react';
import React, { FC, useMemo } from 'react';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { displayNodesStatisticsService } from './displayNodesStatisticsService.model';
import {
  PageWrapper,
  Title,
  Wrapper,
} from './displayNodesStatisticsService.styled';
import { DisplayNodesStatisticsContainerProps } from './displayNodesStatisticsService.types';
import { GraphEmptyData } from './view/GraphEmptyData';
import { NodeStatisticsTable } from './view/NodeStatisticsTable';

const { inputs, outputs, gates } = displayNodesStatisticsService;
const { NodeInfoGate } = gates;

export const DisplayNodesStatisticsContainer: FC<
  DisplayNodesStatisticsContainerProps
> = ({ nodeId, pipeCount }) => {
  const currentArhiveFilter = useStore(outputs.$archiveFilter);
  const graphType = useStore(outputs.$graphType);
  const archiveData = useStore(outputs.$archiveReadings);
  const isLoading = useStore(outputs.$isLoading);

  const setGraphType = useEvent(inputs.setGraphType);
  const setArchiveFilter = useEvent(inputs.setArchiveFilter);

  const archive = archiveData?.data || [];
  const paramsList = useMemo(
    () =>
      archive.reduce((acc, readings) => {
        const header = readings?.header;
        if (!header) {
          return acc;
        }
        return [...acc, header];
      }, [] as string[]),
    [archive],
  );

  const archiveReadingExist = archive.length !== 0;

  return (
    <>
      <NodeInfoGate nodeId={nodeId} pipeCount={pipeCount} />
      <PageWrapper>
        <Title>Статистика по объекту</Title>
        <GraphFilterForm
          currentGraphParam={graphType}
          currentFilter={currentArhiveFilter}
          paramsList={paramsList}
          setGraphParam={setGraphType}
          setArchiveFilter={setArchiveFilter}
        />

        <WithLoader isLoading={isLoading}>
          {archiveData && archiveReadingExist && (
            <>
              <Wrapper>
                <GraphView
                  graphParam={graphType}
                  data={archiveData}
                  reportType={currentArhiveFilter.ReportType}
                />
              </Wrapper>
              <NodeStatisticsTable
                graphType={graphType}
                reportType={currentArhiveFilter.ReportType}
                archiveData={archive}
              />
            </>
          )}
          {!archiveReadingExist && <GraphEmptyData />}
        </WithLoader>
      </PageWrapper>
    </>
  );
};
