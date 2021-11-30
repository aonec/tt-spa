import { Grid } from '01/shared/ui/Layout/Grid';
import React from 'react';
import styled from 'styled-components';

const columnTitles = [
  'Дата документа',
  '№ док',
  'Тип документа',
  'Ресурс',
  'Адрес',
  'Дата работ',
];

export const TableHeader = () => {
  return (
    <Wrap temp={gridTemp} gap="15px">
      {columnTitles.map((title) => (
        <Title>{title}</Title>
      ))}
    </Wrap>
  );
};

export const gridTemp = '0.63fr 0.7fr 1.4fr 0.7fr 2.1fr 0.85fr';

const Wrap = styled(Grid)`
  background: #f3f5f6;
  padding: 15px 0 15px 15px;
`;

const Title = styled.div`
  color: rgba(39, 47, 90, 0.9);
  font-size: 12px;
`;
