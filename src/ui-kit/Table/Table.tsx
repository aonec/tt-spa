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
        {filteredColumns.map((elem) => (
          <TableElement key={elem.label}>{elem.label}</TableElement>
        ))}
      </Header>
      {elements.slice(start, end).map((elem, index) => (
        <Row key={index} temp={temp}>
          {filteredColumns.map((column) => (
            <TableElement key={column.label}>
              {column.render(elem, index)}
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
