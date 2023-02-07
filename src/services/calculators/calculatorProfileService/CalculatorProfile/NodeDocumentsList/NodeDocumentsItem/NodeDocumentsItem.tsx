import React, { FC } from 'react';
import {
  ColumnWrapper,
  DateWrapper,
  GroupWrapper,
  NameWrapper,
  UploadIconSC,
  Wrapper,
} from './NodeDocumentsItem.styled';
import { NodeDocumentsItemProps } from './NodeDocumentsItem.types';
import moment from 'moment';
import { DocumentIcon } from 'ui-kit/icons';
import { saveAs } from 'file-saver';

export const NodeDocumentsItem: FC<NodeDocumentsItemProps> = ({ document }) => {
  const { uploadingTime, name, url } = document;

  const handleDownloadFile = () => {
    if (url && name) {
      saveAs(url, name);
    }
  };

  return (
    <Wrapper>
      <DateWrapper>{moment(uploadingTime).format('DD.MM.YYYY')}</DateWrapper>
      <ColumnWrapper>
        <GroupWrapper>
          <DocumentIcon />
          <NameWrapper>{name}</NameWrapper>
        </GroupWrapper>
        <UploadIconSC onClick={handleDownloadFile} />
      </ColumnWrapper>
    </Wrapper>
  );
};
