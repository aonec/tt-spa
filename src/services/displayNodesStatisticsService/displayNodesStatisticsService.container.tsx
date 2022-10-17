import { GraphFilterForm } from '01/_pages/Graph/components/GraphFilterForm';
import { GraphView } from '01/_pages/Graph/components/GraphView';
import { Empty, Skeleton } from 'antd';
import { useEvent, useStore } from 'effector-react';
import React, { FC, useMemo } from 'react';
import { FallbackGraphIcon } from 'ui-kit/icons';
import { displayNodesStatisticsService } from './displayNodesStatisticsService.model';
import { Title, Wrapper } from './displayNodesStatisticsService.styled';
import { DisplayNodesStatisticsContainerProps } from './displayNodesStatisticsService.types';

const { inputs, outputs, gates } = displayNodesStatisticsService;
const { NodeInfoGate } = gates;

export const DisplayNodesStatisticsContainer: FC<DisplayNodesStatisticsContainerProps> = ({
  nodeId,
  pipeCount,
}) => {
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
    [archive]
  );

  const archiveReadingExist = archive.length !== 0;

  return (
    <>
      <NodeInfoGate nodeId={nodeId} pipeCount={pipeCount} />
      <div>
        <Title>Статистика по объекту</Title>

        {isLoading && <Skeleton active />}
        {!isLoading && archiveData && archiveReadingExist && (
          <>
            <GraphFilterForm
              currentGraphParam={graphType}
              currentFilter={currentArhiveFilter}
              paramsList={paramsList}
              setGraphParam={setGraphType}
              setArchiveFilter={setArchiveFilter}
            />
            <Wrapper>
              <GraphView
                graphParam={graphType}
                data={archiveData}
                reportType={currentArhiveFilter.ReportType}
              />
            </Wrapper>
          </>
        )}
        {!isLoading && !archiveReadingExist && (
          <Empty
            description="Нет данных за выбранный период. Пожалуйста, измените период для формирования новой статистики."
            image={<FallbackGraphIcon />}
            imageStyle={{ height: '400px' }}
            style={{ textAlign: 'start', color: '#272f5a' }}
          />
        )}
      </div>
    </>
  );
};
