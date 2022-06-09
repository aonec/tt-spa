import moment from 'moment';
import React, { FC } from 'react';
import { DocumentIcon, PencilIcon, TrashIcon } from 'ui-kit/icons';
import {
  DateWrapper,
  DocumentIconWrapper,
  DocumentName,
  DocumentNameText,
  DocumentType,
  DocumentTypeText,
  ListItem,
  ManageIconsWrapper,
} from './ApartmentActItem.styled';
import { ApartmentActItemProps } from './ApartmentActItem.types';

export const ApartmentActItem: FC<ApartmentActItemProps> = ({
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
      <div>
        
      </div>
      <DocumentType>
        <DocumentTypeText>{type}</DocumentTypeText>
        <ManageIconsWrapper>
          <PencilIcon style={{ fontSize: 16, cursor: 'pointer' }} />
          <TrashIcon style={{ fontSize: 16, cursor: 'pointer' }} />
        </ManageIconsWrapper>
      </DocumentType>
    </ListItem>
  );
};
