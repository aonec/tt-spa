import React, { FC } from 'react';
import { DateWrapper, Row } from './ArchiveRow.styled';
import { ArchiveRowProps } from './ArchiveRow.types';

export const ArchiveRow: FC<ArchiveRowProps> = ({ row, columnsCount }) => {
  return (
    <Row columnsCount={columnsCount} isFault={row.isFault}>
      <DateWrapper isFault={row.isFault}>{row.dateTimeText}</DateWrapper>
      {row.values.map((value, index) => (
        <div key={index}>{value.text}</div>
      ))}
    </Row>
  );
};
