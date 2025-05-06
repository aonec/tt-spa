import { FC } from 'react';
import { Props } from './CreateHouseManagementForm.types';
import { Form } from 'antd';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';

export const CreateHouseManagementForm: FC<Props> = ({
  formId,
  handleSubmit,
  setFieldValue,
  values,
}) => {
  return (
    <Form id={formId} onSubmitCapture={handleSubmit}>
      <FormItem label="Введите название">
        <Input
          placeholder="Введите"
          value={values.name || undefined}
          onChange={(value) => setFieldValue('name', value.target.value)}
        />
      </FormItem>
    </Form>
  );
};
