import React from 'react';
import styled from 'styled-components';

export const ReadingsHistoryList = () => {
  return (
    <Wrap>
      <TableHeader>
        {columnsNames.map((elem) => (
          <div>{elem}</div>
        ))}
      </TableHeader>
    </Wrap>
  );
};

const columnsNames = [
  'Период',
  'Показания',
  'Потребление',
  'Источник',
  'Последние показания',
];

const Wrap = styled.div`
  max-width: 960px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`;

const TableHeader = styled(Grid)`
  padding: 16px;
  background: rgba(39, 47, 90, 0.04);
  border-bottom: 1px solid #dcdee4;
`;
