import moment from 'moment';
import React, { FC } from 'react';
import {
  BottomInfoWrapper,
  DateWrapper,
  DocumentWrapper,
  LinkWrapper,
  Wrapper,
} from './DocumentsCardItem.styled';
import { DocumentsCardItemProps } from './DocumentsCardItem.types';

export const DocumentsCardItem: FC<DocumentsCardItemProps> = ({
  document,
  handleSaveFile,
}) => {
  const { uploadingTime, name } = document;

  const formatedDate = moment(uploadingTime).format('DD.MM.YYYY');

  return (
    <Wrapper>
      <DocumentWrapper>{name}</DocumentWrapper>
      <BottomInfoWrapper>
        <DateWrapper>{formatedDate}</DateWrapper>
        {document && (
          <LinkWrapper onClick={() => handleSaveFile(document)}>
            {'Перейти >'}
          </LinkWrapper>
        )}
      </BottomInfoWrapper>
    </Wrapper>
  );
};
