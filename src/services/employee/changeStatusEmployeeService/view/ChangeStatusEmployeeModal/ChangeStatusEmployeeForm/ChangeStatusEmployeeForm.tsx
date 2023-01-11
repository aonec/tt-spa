import React, { FC } from 'react';
import { GridContainer } from './ChangeStatusEmployeeForm.styled';
import { ChangeStatusEmployeeFormProps } from './ChangeStatusEmployeeForm.types';
import { Form } from 'antd';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { useFormik } from 'formik';
import { EOrganizationUserWorkingStatusType } from 'myApi';
import { OrganizationUserWorkingStatusDictionary } from './ChangeStatusEmployeeForm.constants';

export const ChangeStatusEmployeeForm: FC<ChangeStatusEmployeeFormProps> = ({
  formId,
}) => {
  const { values, handleSubmit, setFieldValue, errors } = useFormik({
    initialValues: {
      type: null as EOrganizationUserWorkingStatusType | null,
      startDate: null as string | null,
      endDate: null as string | null,
    },
    enableReinitialize: true,
    onSubmit: (data) => {},
    validateOnChange: false,
    validationSchema: {},
  });

  return (
    <Form id={formId} onSubmitCapture={handleSubmit}>
      <GridContainer>
        <FormItem label="Текущий статус">
          <Select
            placeholder="Выберите из списка"
            value={values.type || undefined}
            onChange={(value) => setFieldValue('isThermalChamber', value)}
          >
            {Object.values(EOrganizationUserWorkingStatusType).map((e) => (
              <Select.Option value={e} key={e}>
                e {OrganizationUserWorkingStatusDictionary[e]}
              </Select.Option>
            ))}
          </Select>
          <ErrorMessage>{errors?.type}</ErrorMessage>
        </FormItem>
      </GridContainer>
    </Form>
  );
};
