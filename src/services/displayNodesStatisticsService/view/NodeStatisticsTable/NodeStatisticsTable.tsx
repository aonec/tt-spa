import moment from 'moment';
import React, { FC, useCallback, useMemo, useState } from 'react';
import {
  NODE_STATISTICS_PAGE_SIZE,
  ReportEndTimeFormat,
  ReportStartTimeFormat,
  ReportTimeType,
} from './NodeStatisticsTable.constant';
import {
  PaginationSC,
  TableWrapper,
  Wrapper,
} from './NodeStatisticsTable.styled';
import { NodeStatisticsTableProps } from './NodeStatisticsTable.types';
import { NodeStatisticsTableColumn } from './NodeStatisticsTableColumn';
import { ToggleWithText } from './ToggleWithText';

export const NodeStatisticsTable: FC<NodeStatisticsTableProps> = ({
  archiveData,
  graphType,
  reportType,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);

  const timeConstructor = useCallback(
    (date: string) => {
      const startDateStr = moment(date)
        .startOf(ReportTimeType[reportType])
        .format(ReportStartTimeFormat[reportType]);
      const endDateStr = moment(date)
        .endOf(ReportTimeType[reportType])
        .format(ReportEndTimeFormat[reportType]);
      return `${startDateStr} - ${endDateStr}`;
    },
    [reportType]
  );

  const requiredArchiveReadings = archiveData.find(
    (reading) => reading.header === graphType
  )?.data;

  const sortedArchiveReadings = useMemo(
    () =>
      (requiredArchiveReadings || []).sort((first, second) =>
        moment(first.time).diff(moment(second.time))
      ),
    [archiveData, graphType]
  );

  if (sortedArchiveReadings.length === 0) {
    return null;
  }

  const start = (page - 1) * NODE_STATISTICS_PAGE_SIZE;
  const pagedReadings = sortedArchiveReadings.slice(
    start,
    start + NODE_STATISTICS_PAGE_SIZE
  );

  const dates = pagedReadings.map((reading) => reading.time);
  const values = pagedReadings.map((reading) => reading.value);

  return (
    <Wrapper>
      <ToggleWithText
        isOpen={isOpen}
        handleOpen={() => setIsOpen(true)}
        handleClose={() => setIsOpen(false)}
        closeText="Скрыть таблицу"
        openText="Открыть таблицу"
      />
      {isOpen && (
        <>
          <TableWrapper>
            <NodeStatisticsTableColumn
              title="Дата и время"
              values={dates}
              valueConstructor={timeConstructor}
            />
            <NodeStatisticsTableColumn
              title={graphType}
              values={values}
              valueConstructor={(value) => String(value)}
            />
          </TableWrapper>
          <PaginationSC
            defaultCurrent={1}
            pageSize={NODE_STATISTICS_PAGE_SIZE}
            current={page}
            onChange={setPage}
            total={sortedArchiveReadings.length}
            showSizeChanger={false}
          />
        </>
      )}
    </Wrapper>
  );
};
