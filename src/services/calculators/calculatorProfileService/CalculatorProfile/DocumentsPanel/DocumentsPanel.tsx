import React, { FC } from 'react';
import { DocumentCardItem } from './DocumentCardItem';
import {
  DocumentIconSC,
  MoreDocumentsLink,
  TitleWrapper,
  Wrapper,
} from './DocumentsPanel.styled';
import { DocumentsPanelProps } from './DocumentsPanel.types';
import dayjs from 'api/dayjs';

export const DocumentsPanel: FC<DocumentsPanelProps> = ({
  handleClick,
  documents,
}) => {
  const preparedDocuments = documents
    .sort((first, second) =>
      dayjs(second.uploadingTime).diff(dayjs(first.uploadingTime)),
    )
    .slice(0, 2);

  const cards = preparedDocuments.map((document) => (
    <DocumentCardItem document={document} />
  ));

  return (
    <Wrapper>
      <TitleWrapper>Документы</TitleWrapper>
      {cards}
      <MoreDocumentsLink onClick={handleClick}>
        <DocumentIconSC />
        Показать все документы
      </MoreDocumentsLink>
    </Wrapper>
  );
};
