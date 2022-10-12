import React, { FC, useMemo } from 'react';
import {
  MoreDocumentsLink,
  SwitchIconSC,
  TitleWrapper,
  Wrapper,
} from './DocumentsCard.styled';
import { DocumentsCardProps } from './DocumentsCard.types';
import { DocumentsCardItem } from './DocumentsCardItem';

export const DocumentsCard: FC<DocumentsCardProps> = ({
  apartmentid,
  housingStockId,
  lastDocuments,
  handleSaveFile,
}) => {
  const cards = useMemo(
    () =>
      lastDocuments.map((document) => (
        <DocumentsCardItem
          key={document.id}
          document={document}
          handleSaveFile={handleSaveFile}
        />
      )),
    [lastDocuments, handleSaveFile]
  );

  return (
    <Wrapper>
      <TitleWrapper>Документы</TitleWrapper>
      {cards}
      <MoreDocumentsLink
        to={`/objects/${housingStockId}/apartments/${apartmentid}/documents`}
      >
        <SwitchIconSC />
        Показать все документы
      </MoreDocumentsLink>
    </Wrapper>
  );
};
