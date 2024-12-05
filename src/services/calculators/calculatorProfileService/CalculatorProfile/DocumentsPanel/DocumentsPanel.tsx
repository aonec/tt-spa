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
  saveFile,
}) => {
  const preparedDocuments = documents
    .sort((first, second) =>
      dayjs(second.uploadingTime).diff(dayjs(first.uploadingTime)),
    )
    .slice(0, 2);

  const cards = preparedDocuments.map((document) => (
    <DocumentCardItem
      key={document.id}
      document={document}
      saveFile={saveFile}
    />
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
