import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { FormItem } from 'ui-kit/FormItem';
import { TextAreaSC } from './EmailTextInput.styled';
import { EmailTextInputProps } from './EmailTextInput.types';

export const EmailTextInput: FC<EmailTextInputProps> = ({
  handleMessageChange,
}) => {
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    if (typeof text === 'string') handleMessageChange(text);
  }, [text]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value),
    [setText]
  );

  return (
    <FormItem label="Отправка пригласительного письма">
      <TextAreaSC value={text || ''} onChange={handleChange} />
    </FormItem>
  );
};
