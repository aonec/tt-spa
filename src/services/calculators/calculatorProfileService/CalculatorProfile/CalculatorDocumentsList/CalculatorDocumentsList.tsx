import React, { FC } from 'react';
import { Header, Wrapper } from './CalculatorDocumentsList.styled';
import { CalculatorDocumentsListProps } from './CalculatorDocumentsList.types';

export const CalculatorDocumentsList: FC<CalculatorDocumentsListProps> = ({
  documents,
}) => {
  return (
    <Wrapper>
      <Header>
        <div>Дата</div>
        <div>№ док</div>
        <div>Название документа</div>
      </Header>
    </Wrapper>
  );
};
