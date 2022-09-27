import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { FormItem } from 'ui-kit/FormItem';
import { TextAreaSC } from '../../../emailNotifyService/view/EmailTextInput/EmailTextInput.styled';
import { CompletionCommentProps } from './CompletionComment.types';

export const CompletionComment: FC<CompletionCommentProps> = ({}) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (typeof text === 'string') {
    }
  }, [text]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value),
    [setText]
  );

  return (
    <FormItem label="Комментарий">
      <TextAreaSC
        placeholder="Введите комментарий"
        value={text || ''}
        onChange={handleChange}
      />
    </FormItem>
  );
};
