import React, { FC } from 'react';
import { ArchiveRow } from './components/ArchiveRow';
import { SetFiltersToStart } from './components/SetFiltersToStart/SetFiltersToStart';
import {
  Header,
  CheckboxSC,
  ListWrapper,
  Wrapper,
} from './NodeArchiveList.styled';
import { NodeArchiveListProps } from './NodeArchiveList.types';
import { Empty } from 'antd';

export const NodeArchiveList: FC<NodeArchiveListProps> = ({
  data,
  withFaultReadings,
  setWithFaultReadings,
}) => {
  const isReadingsExist = data?.rows.length !== 0;
  const filteredColumns = (data?.columns || []).filter(
    (column) => column.text !== 'Н.C.',
  );
  const filteredRows = (data?.rows || []).map((row) => ({
    ...row,
    values: row.values.filter((elem) => elem.doubleValue !== null),
  }));

  return (
    <Wrapper>
      {!data && <SetFiltersToStart />}
      {data && (
        <>
          <CheckboxSC
            checked={withFaultReadings}
            onChange={(e) => setWithFaultReadings(e.target.checked)}
          >
            Нештатные ситуации
          </CheckboxSC>
          {!isReadingsExist && (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Нет данных для отображения, измените параметры фильтрации"
            />
          )}
          {isReadingsExist && (
            <ListWrapper>
              <Header columnsCount={data.columns.length - 1}>
                {filteredColumns.map((column, index) => (
                  <div key={index}>{column.text}</div>
                ))}
              </Header>
              {filteredRows.map((row, index) => (
                <ArchiveRow
                  columnsCount={data.columns.length - 1}
                  row={row}
                  key={index}
                />
              ))}
            </ListWrapper>
          )}
        </>
      )}
    </Wrapper>
  );
};
