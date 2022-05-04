import React, { FC } from 'react';
import { Row } from './ArchiveRow.styled';
import { ArchiveRowProps } from './ArchiveRow.types';

export const ArchiveRow: FC<ArchiveRowProps> = ({ row }) => {
  return (
    <Row>
      <div>{row.dateTimeText}</div>
      {row.values.map((value) => (
        <div>{value.text}</div>
      ))}
    </Row>
  );
};
