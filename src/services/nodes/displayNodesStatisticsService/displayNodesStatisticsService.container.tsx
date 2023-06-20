import { useUnit } from 'effector-react';
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
import { GraphFilterForm } from './view/StatisticsGraph/GraphFilterForm';
import { GraphView } from './view/StatisticsGraph';
import { GraphLegend } from './view/StatisticsGraph/GraphLegend';

const { inputs, outputs, gates } = displayNodesStatisticsService;
const { NodeInfoGate } = gates;
const wrapperId = 'nodeConsumptionGraphWrapper';

export const DisplayNodesStatisticsContainer: FC<
  DisplayNodesStatisticsContainerProps
> = ({ nodeId, pipeCount }) => {
  const currentArhiveFilter = useUnit(outputs.$archiveFilter);
  const graphType = useUnit(outputs.$graphType);
  const archiveData = useUnit(outputs.$archiveReadings);
  const isLoading = useUnit(outputs.$isLoading);
  const taskStatistics = useUnit(outputs.$taskStatistics);
  const withFault = useUnit(outputs.$withFault);

  const setGraphType = useUnit(inputs.setGraphType);
  const setArchiveFilter = useUnit(inputs.setArchiveFilter);
  const setWithFault = useUnit(inputs.setWithFault);

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
