import React, { FC, useState } from 'react';
import { TrashIconSC } from 'ui-kit/DocumentsService/view/DocumentsLineUpload/DocumentsLineUpload.styled';
import { UserIcon } from 'ui-kit/icons';
import {
  CommentComponent,
  CommentDate,
  CommentFooter,
  CommentHeader,
  CommentInfo,
  CommentText,
  CommentTitle,
  IconSubstrate,
  RightButtonsBlock,
  TextareaSC,
  UserName,
} from './CommentPanel.styled';
import { PencilIconSC } from 'ui-kit/shared_components/SelectedEntityPanel/SelectedEntityPanel.styled';
import { CommentPanelProps } from './CommentPanel.types';
import moment from 'moment';
import { Button } from 'ui-kit/Button';

export const CommentPanel: FC<CommentPanelProps> = ({
  commentDate,
  author,
  comment,
  onEdit,
  onRemove,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState(comment);

  return (
    <CommentComponent>
      <CommentHeader>
        <CommentTitle>Комментарий</CommentTitle>
        <RightButtonsBlock>
          {!isEditing && <PencilIconSC onClick={() => setIsEditing(true)} />}
          <TrashIconSC onClick={() => onRemove()} />
        </RightButtonsBlock>
      </CommentHeader>

      <div>
        {!isEditing && (
          <CommentText>{newComment || 'Нет комментариев'}</CommentText>
        )}
        {isEditing && (
          <>
            <TextareaSC
              value={newComment || ''}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Введите комментарий"
            />
            <CommentFooter>
              <Button
                type="ghost"
                size="small"
                onClick={() => {
                  setNewComment(comment);
                  setIsEditing(false);
                }}
              >
                Отмена
              </Button>
              <Button
                size="small"
                onClick={() => {
                  setIsEditing(false);
                  onEdit(newComment || '');
                }}
              >
                Сохранить
              </Button>
            </CommentFooter>
          </>
        )}
      </div>

      <CommentInfo>
        <IconSubstrate>
          <UserIcon />
        </IconSubstrate>
        <UserName>{author}</UserName>
        <CommentDate>
          {moment(commentDate).format('DD.MM.YYYY HH:mm')}
        </CommentDate>
      </CommentInfo>
    </CommentComponent>
  );
};
