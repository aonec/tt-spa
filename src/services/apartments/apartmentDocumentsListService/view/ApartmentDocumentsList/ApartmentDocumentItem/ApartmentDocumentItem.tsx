import moment from 'moment';
import React, { FC } from 'react';
import { DocumentIcon, PencilIcon, TrashIcon } from 'ui-kit/icons';
import {
  DateWrapper,
  DocumentIconSC,
  DocumentIconWrapper,
  DocumentName,
  DocumentNameText,
  DocumentType,
  DocumentTypeText,
  ListItem,
  ManageIconsWrapper,
} from './ApartmentDocumentItem.styled';
import { ApartmentDocumentItemProps } from './ApartmentDocumentItem.types';

export const ApartmentDocumentItem: FC<ApartmentDocumentItemProps> = ({
  document: { uploadingTime, id, name, type },
}) => {
  return (
    <ListItem>
      <DateWrapper>{moment(uploadingTime).format('DD.MM.YYYY')}</DateWrapper>
      <div>{id}</div>
      <DocumentName>
        <DocumentIconWrapper>
          <DocumentIcon />
        </DocumentIconWrapper>
        <DocumentNameText>{name}</DocumentNameText>
      </DocumentName>
      <DocumentType>
        <DocumentTypeText>{type}</DocumentTypeText>
        <ManageIconsWrapper>
          <DocumentIconSC>
            <PencilIcon />
          </DocumentIconSC>
          <DocumentIconSC>
            <TrashIcon/>
          </DocumentIconSC>
        </ManageIconsWrapper>
      </DocumentType>
    </ListItem>
  );
};
