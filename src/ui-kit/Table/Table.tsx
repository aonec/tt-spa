import React, { PropsWithChildren } from 'react';
import { Header, Row, Wrapper } from './Table.styled';
import { TableProps } from './Table.types';
import { Empty } from 'antd';

export function Table<T>({
  columns,
  elements,
}: PropsWithChildren<TableProps<T>>) {
  const filteredColumns = columns.filter((elem) => !elem.hidden);

  const temp = columns.map((column) => column.size).join(' ');

  return (
    <Wrapper>
      <Header temp={temp}>
        {filteredColumns.map((elem) => (
          <div key={elem.label}>{elem.label}</div>
        ))}
      </Header>
      {elements.map((elem, index) => (
        <Row key={index} temp={temp}>
          {filteredColumns.map((column) => (
            <div key={column.label}>{column.render(elem, index)}</div>
          ))}
        </Row>
      ))}
      {!elements.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
    </Wrapper>
  );
}
