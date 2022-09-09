import React, { FC, useCallback } from 'react';
import {
  CalendarIcon,
  DocumentIcon,
  PersonIcon,
  TrashIcon,
} from 'ui-kit/icons';
import { getTimeStringByUTC } from 'utils/getTimeStringByUTC';
import {
  AuthorWrapper,
  DateWrapper,
  FileNameWrapper,
  GroupWrapper,
  InfoWrapper,
  TrashIconWrapper,
  Wrapper,
} from './TaskDocumentsListItem.styled';
import { TaskDocumentsListItemProps } from './TaskDocumentsListItem.types';

export const TaskDocumentsListItem: FC<TaskDocumentsListItemProps> = ({
  document,
}) => {
  const { author, uploadingTime, name, url } = document;

  const handleDownloadFile = useCallback(() => {
    if (url && name) {
      saveAs(url, name);
    }
  }, [url, name]);

  const preparedUploadingTime = getTimeStringByUTC(
    uploadingTime,
    'DD.MM.YYYY, HH:mm:ss'
  );

  return (
    <Wrapper>
      <InfoWrapper onClick={handleDownloadFile}>
        <GroupWrapper>
          <DocumentIcon />
          <FileNameWrapper>{name}</FileNameWrapper>
        </GroupWrapper>
        <GroupWrapper>
          <PersonIcon />
          <AuthorWrapper>{author}</AuthorWrapper>
        </GroupWrapper>
        <GroupWrapper>
          <CalendarIcon />
          <DateWrapper>{preparedUploadingTime}</DateWrapper>
        </GroupWrapper>
      </InfoWrapper>

      <TrashIconWrapper>
        <TrashIcon />
      </TrashIconWrapper>
    </Wrapper>
  );
};
