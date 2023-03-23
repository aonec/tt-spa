import React, { PropsWithChildren, useState } from 'react';
import {
  Header,
  PaginationWrapper,
  Row,
  TableElement,
  Wrapper,
} from './Table.styled';
import { TableProps } from './Table.types';
import { Empty, Pagination } from 'antd';

export function Table<T>({
  columns,
  elements,
  pagination,
  rowStyles,
}: PropsWithChildren<TableProps<T>>) {
  const pageSize = pagination?.pageSize || Infinity;

  const [pageNumber, setPageNumber] = useState(1);

  const start = pageSize * (pageNumber - 1);
  const end = pageSize * pageNumber;

  const filteredColumns = columns.filter((elem) => !elem.hidden);

  const temp = filteredColumns.map((column) => column.size).join(' ');

  return (
    <Wrapper>
      <Header temp={temp}>
        {filteredColumns.map((column, columnIndex) => (
          <TableElement key={columnIndex} css={column.css?.(true)}>
            {column.label}
          </TableElement>
        ))}
      </Header>
      {elements.slice(start, end).map((elem, rowIndex) => (
        <Row key={rowIndex} temp={temp} css={rowStyles?.[rowIndex]}>
          {filteredColumns.map((column, columnIndex) => (
            <TableElement key={columnIndex} css={column.css?.(false)}>
              {column.render(elem, rowIndex)}
            </TableElement>
          ))}
        </Row>
      ))}
      {!elements.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      {Boolean(elements.length) && pagination && (
        <PaginationWrapper>
          <Pagination
            pageSize={pageSize}
            total={elements.length}
            current={pageNumber}
            onChange={(pageNumber) => setPageNumber(pageNumber)}
            showSizeChanger={false}
          />
        </PaginationWrapper>
      )}
    </Wrapper>
  );
}
