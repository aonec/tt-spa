import React, { useState } from 'react';
import { ComponentMeta } from '@storybook/react';
import { CommentPanel } from '.';
import dayjs from 'api/dayjs';

export default {
  title: 'CommentPanel',
  component: CommentPanel,
  parameters: { layout: 'centered' },
} as ComponentMeta<typeof CommentPanel>;

export const HavePermission = () => {
  const [comment, setComment] = useState<string | null>(
    'а через styled ебется?',
  );
  const [date, setDate] = useState(dayjs().format());
  const remove = () => setComment(null);
  const author = 'Aziz Azizmuradov';

  return (
    <div style={{ width: 300 }}>
      <CommentPanel
        oldCommentText={comment}
        onRemove={remove}
        onEdit={(newComment) => {
          setComment(newComment);
          setDate(dayjs().format());
        }}
        commentDate={date}
        isHavePermission={true}
        author={author}
      />
    </div>
  );
};

export const DoNotHavePermission = () => {
  const comment = 'AntD - хуйня а не либа';
  const commentDate = dayjs().format();

  return (
    <div style={{ width: 300 }}>
      <CommentPanel
        oldCommentText={comment}
        commentDate={commentDate}
        onEdit={() => void null}
        onRemove={() => void null}
        isHavePermission={false}
      />
    </div>
  );
};
