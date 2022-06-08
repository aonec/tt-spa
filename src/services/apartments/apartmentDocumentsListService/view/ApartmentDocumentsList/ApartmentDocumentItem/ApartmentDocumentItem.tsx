import moment from 'moment';
import React, { FC } from 'react';
import { DocumentIcon } from 'ui-kit/icons';
import {
  DateWrapper,
  DocumentName,
  DocumentNameText,
  ListItem,
} from './ApartmentDocumentItem.styled';
import { ApartmentDocumentItemProps } from './ApartmentDocumentItem.types';

export const ApartmentDocumentItem: FC<ApartmentDocumentItemProps> = ({
  document: { uploadingTime, id, name },
}) => {
  return (
    <ListItem>
      <DateWrapper>{moment(uploadingTime).format('DD.MM.YYYY')}</DateWrapper>
      <div>{id}</div>
      <DocumentName>
        <DocumentIcon style={{ minWidth: 10 }} />
        <DocumentNameText>
          {name}
        </DocumentNameText>
      </DocumentName>
    </ListItem>
  );
};
