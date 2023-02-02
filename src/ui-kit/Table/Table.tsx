import React, { PropsWithChildren } from 'react';
import { Header, Row } from './Table.styled';
import { TableProps } from './Table.types';
import { Empty } from 'antd';

export function Table<T>({
  columns,
  elements,
}: PropsWithChildren<TableProps<T>>) {
  return (
    <div>
      <Header>
        {columns.map((elem) => (
          <div key={elem.label}>{elem.label}</div>
        ))}
      </Header>
      {elements.map((elem, index) => (
        <Row key={index}>
          {columns.map((column) => (
            <div key={column.label}>{column.render(elem, index)}</div>
          ))}
        </Row>
      ))}
      {!elements.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
    </div>
  );
}
