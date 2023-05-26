import React, { FC } from 'react';
import { SetSealAppointmentFormProps } from './SetSealAppointmentForm.types';
import { Form } from 'antd';
import { useFormik } from 'formik';
import { GroupWrapper } from './SetSealAppointmentForm.styled';
import { AddressTreeSelect } from 'ui-kit/shared_components/AddressTreeSelect';
import { FormItem } from 'ui-kit/FormItem';
import { DatePicker } from 'ui-kit/DatePicker';
import { Select } from 'ui-kit/Select';

export const SetSealAppointmentForm: FC<SetSealAppointmentFormProps> = () => {
  useFormik({ initialValues: {}, onSubmit: console.log });

  return (
    <Form>
      <GroupWrapper>
        <FormItem label="Адрес">
          <AddressTreeSelect
            selectedHousingStockIds={[]}
            treeData={[]}
            onChange={() => void null}
          />
        </FormItem>
        <FormItem label="Дата">
          <DatePicker />
        </FormItem>
      </GroupWrapper>

      <GroupWrapper>
        <FormItem label="Контролер">
          <Select></Select>
        </FormItem>
      </GroupWrapper>
    </Form>
  );
};
