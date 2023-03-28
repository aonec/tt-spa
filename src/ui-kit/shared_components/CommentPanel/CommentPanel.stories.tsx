import React, { useState } from 'react';
import { ComponentMeta } from '@storybook/react';
import { CommentPanel } from '.';
import moment from 'moment';

export default {
  title: 'CommentPanel',
  component: CommentPanel,
  parameters: { layout: 'centered' },
} as ComponentMeta<typeof CommentPanel>;

export const HavePermission = () => {
  const [comment, setComment] = useState<string | null>('Old comment');
  const [date, setDate] = useState(moment().format());
  const remove = () => setComment(null);
  const author = 'Aziz Azizmuradov';

  return (
    <div style={{ width: 300 }}>
      <CommentPanel
        oldCommentText={comment}
        onRemove={remove}
        onEdit={(newComment) => {
          setComment(newComment);
          setDate(moment().format());
        }}
        commentDate={date}
        isHavePermission={true}
        author={author}
      />
    </div>
  );
};

export const DoNotHavePermission = () => {
  const comment = 'Old comment';
  const commentDate = moment().format();

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
