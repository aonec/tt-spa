import { useUnit } from 'effector-react';
import React, { FC, useMemo } from 'react';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { displayNodesStatisticsService } from './displayNodesStatisticsService.model';
import {
  PageWrapper,
  Title,
  Wrapper,
} from './displayNodesStatisticsService.styled';
import { DisplayNodesStatisticsContainerProps } from './displayNodesStatisticsService.types';
import { GraphEmptyData } from './view/GraphEmptyData';
import { NodeStatisticsTable } from './view/NodeStatisticsTable';
import { GraphFilterForm } from './view/StatisticsGraph/GraphFilterForm';
import { GraphView } from './view/StatisticsGraph';
import { GraphLegend } from './view/StatisticsGraph/GraphLegend';

const { inputs, outputs, gates } = displayNodesStatisticsService;
const { NodeInfoGate } = gates;
const wrapperId = 'nodeConsumptionGraphWrapper';

export const DisplayNodesStatisticsContainer: FC<
  DisplayNodesStatisticsContainerProps
> = ({ nodeId, pipeCount }) => {
  const {
    graphType,
    currentArhiveFilter,
    archiveData,
    isLoading,
    taskStatistics,
    withFault,
  } = useUnit({
    graphType: outputs.$graphType,
    currentArhiveFilter: outputs.$archiveFilter,
    archiveData: outputs.$archiveReadings,
    isLoading: outputs.$isLoading,
    taskStatistics: outputs.$taskStatistics,
    withFault: outputs.$withFault,
    setGraphType: inputs.setGraphType,
    setArchiveFilter: inputs.setArchiveFilter,
    setWithFault: inputs.setWithFault,
  });

  const { setArchiveFilter, setGraphType, setWithFault } = useUnit({
    setGraphType: inputs.setGraphType,
    setArchiveFilter: inputs.setArchiveFilter,
    setWithFault: inputs.setWithFault,
  });

  const archive = useMemo(() => archiveData?.data || [], [archiveData]);
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
              <Wrapper id={wrapperId}>
                <GraphView
                  graphParam={graphType}
                  data={archiveData}
                  reportType={currentArhiveFilter.ReportType}
                  taskStatistics={taskStatistics}
                  wrapperId={wrapperId}
                  withFault={withFault}
                />
                <GraphLegend
                  graphParam={graphType}
                  isTasksExist={taskStatistics.length !== 0}
                  resource={archiveData.resource}
                  averageDeltaMass={archiveData.averageDeltaMass}
                  deltaMassAccuracy={archiveData.deltaMassAccuracy}
                  withFault={withFault}
                  setWithFault={setWithFault}
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
