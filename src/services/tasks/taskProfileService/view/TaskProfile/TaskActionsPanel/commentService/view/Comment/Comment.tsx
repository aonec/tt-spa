import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { FormItem } from 'ui-kit/FormItem';
import { TextAreaSC } from '../../../emailNotifyService/view/EmailTextInput/EmailTextInput.styled';
import { CommentProps } from './Comment.types';

export const Comment: FC<CommentProps> = ({ handleCommentChange }) => {
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    if (typeof text === 'string') handleCommentChange(text);
  }, [text, handleCommentChange]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value),
    [setText],
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
