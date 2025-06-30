import React, { FC, useState } from 'react';
import { UserIcon } from 'ui-kit/icons';
import { getTimeStringByUTC } from 'utils/getTimeStringByUTC';
import {
  AuthorWrapper,
  CommentFooter,
  CommentText,
  CommentWrapper,
  IconWrapper,
  InfoWrapper,
  LeftBlock,
  TextareaSC,
  TimeWrapper,
  Wrapper,
} from './Comment.styled';
import { CommentProps } from './Comment.types';
import { PencilIconSC } from 'ui-kit/shared/SelectedEntityPanel/SelectedEntityPanel.styled';
import { TrashIconSC } from 'ui-kit/DocumentsService/view/DocumentsLineUpload/DocumentsLineUpload.styled';
import { Button } from 'ui-kit/Button';
import confirm from 'antd/es/modal/confirm';
import { currentUserService } from 'services/currentUser/currentUserService';
import { useUnit } from 'effector-react';

export const Comment: FC<CommentProps> = ({
  comment,
  handleDelete,
  taskIdNumber,
  handleUpdate,
}) => {
  const { author, createdAt, text } = comment;
  const preparedDate = getTimeStringByUTC(createdAt);

  const { user } = useUnit({ user: currentUserService.outputs.$currentUser });

  const isUserOwnComment = author === `${user?.firstName} ${user?.lastName}`;

  const [isEditing, setIsEditing] = useState(false);
  const [updatedComment, setComment] = useState(text);

  return (
    <Wrapper isEditing={isEditing}>
      <IconWrapper>
        <UserIcon />
      </IconWrapper>
      <CommentWrapper>
        <InfoWrapper>
          <LeftBlock>
            <AuthorWrapper>{author}</AuthorWrapper>
            <TimeWrapper>{preparedDate}</TimeWrapper>
          </LeftBlock>
          {!isEditing && isUserOwnComment && (
            <div>
              <PencilIconSC onClick={() => setIsEditing(true)} />
              <TrashIconSC
                onClick={() => {
                  confirm({
                    title: 'Удалить коментарий?',
                    okText: 'Да',
                    okType: 'danger',
                    cancelText: 'Отмена',
                    onOk: () => {
                      handleDelete({
                        taskId: taskIdNumber,
                        commentId: comment.id,
                      });
                      return new Promise((resolve) => setTimeout(resolve, 500));
                    },
                    centered: true,
                  });
                }}
              />
            </div>
          )}
        </InfoWrapper>
        {!isEditing && <CommentText>{text}</CommentText>}
        {isEditing && (
          <>
            <TextareaSC
              value={updatedComment || ''}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Введите комментарий"
            />
            <CommentFooter>
              <Button
                type="ghost"
                size="s"
                onClick={() => {
                  setComment(text);
                  setIsEditing(false);
                }}
              >
                Отмена
              </Button>
              <Button
                size="s"
                onClick={() => {
                  setIsEditing(false);
                  handleUpdate({
                    taskId: taskIdNumber,
                    commentId: comment.id,
                    data: { comment: updatedComment },
                  });
                }}
              >
                Сохранить
              </Button>
            </CommentFooter>
          </>
        )}
      </CommentWrapper>
    </Wrapper>
  );
};
