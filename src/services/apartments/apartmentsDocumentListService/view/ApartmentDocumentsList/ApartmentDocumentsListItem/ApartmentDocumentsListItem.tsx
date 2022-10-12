import { Tooltip } from 'antd';
import moment from 'moment';
import React, { FC } from 'react';
import { DocumentIcon, UploadIcon } from 'ui-kit/icons';
import {
  DateWrapper,
  DocumentIdWrapper,
  DocumentNameText,
  DocumentNameWrapper,
  GroupWrapper,
  IconWrapper,
  Wrapper,
} from './ApartmentDocumentsListItem.styled';
import { ApartmentDocumentsListItemProps } from './ApartmentDocumentsListItem.types';

export const ApartmentDocumentsListItem: FC<ApartmentDocumentsListItemProps> = ({
  document,
  handleSaveFile,
}) => {
  const { name, uploadingTime, id } = document;
  const formatedDate = moment(uploadingTime).format('DD.MM.YYYY');
  return (
    <Wrapper>
      <DateWrapper>{formatedDate}</DateWrapper>
      <DocumentIdWrapper>{id}</DocumentIdWrapper>
      <GroupWrapper>
        <DocumentNameWrapper>
          <DocumentIcon />
          <Tooltip title={name}>
            <DocumentNameText>{name}</DocumentNameText>
          </Tooltip>
        </DocumentNameWrapper>
        <IconWrapper onClick={() => handleSaveFile(document)}>
          <UploadIcon />
        </IconWrapper>
      </GroupWrapper>
    </Wrapper>
  );
};
