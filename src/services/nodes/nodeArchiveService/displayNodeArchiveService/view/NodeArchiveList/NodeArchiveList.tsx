import React, { FC } from 'react';
import { ArchiveRow } from './components/ArchiveRow';
import { SetFiltersToStart } from './components/SetFiltersToStart/SetFiltersToStart';
import {
  Header,
  CheckboxSC,
  Wrapper,
  StickyWrapper,
  FirstColumn,
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
          <StickyWrapper>
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
              <Header columnsCount={data.columns.length - 1}>
                <FirstColumn> {filteredColumns[0].text} </FirstColumn>
                {filteredColumns.slice(1).map((column, index) => (
                  <div key={index}>{column.text}</div>
                ))}
              </Header>
            )}
          </StickyWrapper>

          {filteredRows.map((row, index) => (
            <ArchiveRow
              columnsCount={data.columns.length - 1}
              row={row}
              key={index}
            />
          ))}
        </>
      )}
    </Wrapper>
  );
};
