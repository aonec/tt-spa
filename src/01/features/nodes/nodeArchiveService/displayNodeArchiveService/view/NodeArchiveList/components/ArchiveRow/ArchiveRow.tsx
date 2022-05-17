import React, { FC } from 'react';
import { Row } from './ArchiveRow.styled';
import { ArchiveRowProps } from './ArchiveRow.types';

export const ArchiveRow: FC<ArchiveRowProps> = ({ row, columnsCount }) => {
  return (
    <Row columnsCount={columnsCount}>
      <div>{row.dateTimeText}</div>
      {row.values.map((value, index) => (
        <div key={index}>{value.text}</div>
      ))}
    </Row>
  );
};
