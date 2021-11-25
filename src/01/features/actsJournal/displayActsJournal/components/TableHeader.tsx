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

export const gridTemp = '1fr 1fr 1.8fr 1fr 2.5fr 1.2fr';

const Wrap = styled(Grid)`
  background: #f3f5f6;
  padding: 15px;
`;

const Title = styled.div`
  color: rgba(39, 47, 90, 0.9);
  font-size: 12px;
`;
