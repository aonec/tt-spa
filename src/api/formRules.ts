import { Rule } from 'effector-forms';

export const required = (
  errorText: string = 'Это поле обязательно',
): Rule<string | null | undefined> => ({
  name: 'required',
  validator: Boolean,
  errorText,
});
