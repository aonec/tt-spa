import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { FormItem } from 'ui-kit/FormItem';
import { TextAreaSC } from '../../../emailNotifyService/view/EmailTextInput/EmailTextInput.styled';
import { CompletionCommentProps } from './CompletionComment.types';

export const CompletionComment: FC<CompletionCommentProps> = ({
  handleChangeComment,
  disabled,
}) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (typeof text === 'string') {
      handleChangeComment(text);
    }
  }, [text, handleChangeComment]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value),
    [setText]
  );

  return (
    <FormItem label="Комментарий">
      <TextAreaSC
        disabled={disabled}
        placeholder="Введите комментарий"
        value={text || ''}
        onChange={handleChange}
      />
    </FormItem>
  );
};
