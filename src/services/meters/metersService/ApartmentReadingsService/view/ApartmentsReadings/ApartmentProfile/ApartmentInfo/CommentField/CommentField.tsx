import React, { FC, useEffect, useState } from 'react';
import { CommentFieldProps } from './CommentField.types';
import { Button } from 'ui-kit/Button';
import {
  Comment,
  CommentFooter,
  CommentHeader,
  Label,
  PencilIconSC,
  TextareaSC,
} from './CommentField.styled';

export const CommentField: FC<CommentFieldProps> = ({
  apartmentId,
  comment: initialComment,
  handleUpdateApartment,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState(initialComment);

  const handleEditComment = () => {
    setIsEditing(true);
  };

  const handleCancelEditComment = () => {
    setComment(initialComment);
    setIsEditing(false);
  };

  const handleSaveComment = () => {
    setIsEditing(false);

    if (comment === initialComment) return;

    handleUpdateApartment({ apartmentId: apartmentId, comment });
  };

  useEffect(() => {
    setComment(initialComment);
  }, [initialComment]);

  return (
    <div>
      <CommentHeader>
        <Label>Комментарий</Label>
        <PencilIconSC
          onClick={isEditing ? handleCancelEditComment : handleEditComment}
        />
      </CommentHeader>
      {!isEditing && (
        <Comment onClick={handleEditComment}>
          {initialComment || 'Нет комментария'}
        </Comment>
      )}
      {isEditing && (
        <TextareaSC
          value={comment || ''}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Введите комментарий"
        />
      )}
      {isEditing && (
        <CommentFooter>
          <Button type="ghost" size="s" onClick={handleCancelEditComment}>
            Отмена
          </Button>
          <Button size="s" onClick={handleSaveComment}>
            Сохранить
          </Button>
        </CommentFooter>
      )}
    </div>
  );
};
