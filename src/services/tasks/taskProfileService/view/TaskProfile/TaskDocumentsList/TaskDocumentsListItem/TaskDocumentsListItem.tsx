import React, { FC, useCallback } from 'react';
import { CalendarIcon, DocumentIcon, TrashIcon, UserIcon } from 'ui-kit/icons';
import { getTimeStringByUTC } from 'utils/getTimeStringByUTC';
import { AuthorWrapper } from '../../TaskComments/Comment/Comment.styled';
import {
  DateWrapper,
  FileNameWrapper,
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
        <DocumentIcon />
        <FileNameWrapper>{name}</FileNameWrapper>
        <AuthorWrapper>{author}</AuthorWrapper>
        <div>
          <CalendarIcon />
          <DateWrapper>{preparedUploadingTime}</DateWrapper>
        </div>
      </InfoWrapper>
      <TrashIconWrapper>
        <TrashIcon />
      </TrashIconWrapper>
    </Wrapper>
  );
};
