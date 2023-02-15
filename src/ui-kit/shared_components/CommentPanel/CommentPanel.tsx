import React, { FC, useCallback, useState } from 'react';
import { TrashIconSC } from 'ui-kit/DocumentsService/view/DocumentsLineUpload/DocumentsLineUpload.styled';
import { UserIcon } from 'ui-kit/icons';
import {
  AddCommentWrapper,
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
  oldCommentText,
  onEdit,
  onRemove,
}) => {
  const isCommentExist = oldCommentText !== null;

  const [newComment, setNewComment] = useState(oldCommentText);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = useCallback(
    (text: string | null) => {
      if ((!text || text.length === 0) && oldCommentText) {
        return onRemove();
      }
      if (!text || text.length === 0) {
        return;
      }
      onEdit(text);
    },
    [onEdit, onRemove, oldCommentText],
  );

  return (
    <CommentComponent>
      <CommentHeader>
        <CommentTitle>Комментарий</CommentTitle>
        <RightButtonsBlock>
          {!isEditing && (
            <>
              {isCommentExist && (
                <>
                  <PencilIconSC onClick={() => setIsEditing(true)} />
                  <TrashIconSC
                    onClick={() => {
                      setNewComment('');
                      onRemove();
                    }}
                  />
                </>
              )}
              {!isCommentExist && (
                <AddCommentWrapper onClick={() => setIsEditing(true)}>
                  + Добавить
                </AddCommentWrapper>
              )}
            </>
          )}
        </RightButtonsBlock>
      </CommentHeader>

      <div>
        {!isEditing && isCommentExist && (
          <CommentText>{newComment}</CommentText>
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
                  setNewComment(oldCommentText);
                  setIsEditing(false);
                }}
              >
                Отмена
              </Button>
              <Button
                size="small"
                onClick={() => {
                  setIsEditing(false);
                  handleSubmit(newComment);
                }}
              >
                Сохранить
              </Button>
            </CommentFooter>
          </>
        )}
      </div>

      {isCommentExist && (
        <CommentInfo>
          <IconSubstrate>
            <UserIcon />
          </IconSubstrate>
          <UserName>{author}</UserName>
          <CommentDate>
            {moment(commentDate).format('DD.MM.YYYY HH:mm')}
          </CommentDate>
        </CommentInfo>
      )}
    </CommentComponent>
  );
};
