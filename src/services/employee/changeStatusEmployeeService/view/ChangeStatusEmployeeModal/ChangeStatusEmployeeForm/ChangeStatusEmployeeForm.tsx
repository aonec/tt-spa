import React, { FC } from 'react';
import { GridContainer } from './ChangeStatusEmployeeForm.styled';
import { ChangeStatusEmployeeFormProps } from './ChangeStatusEmployeeForm.types';
import { Form } from 'antd';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { EOrganizationUserWorkingStatusType } from 'myApi';
import { StaffStatus } from '01/features/staff/displayStaff/models/components/StaffStatus';
import { RangePicker } from 'ui-kit/RangePicker';
import { DatePeriod } from 'services/objects/objectProfileService/consolidatedReportService/view/ConsolidatedReportForm/ConsolidatedReportForm.types';

export const ChangeStatusEmployeeForm: FC<ChangeStatusEmployeeFormProps> = ({
  formId,
  handleUpdateStatus,
  employeeStatus,
}) => {
  const { values, handleSubmit, setFieldValue, errors } = useFormik({
    initialValues: {
      userId: employeeStatus?.id,
      type:
        employeeStatus?.status?.type ||
        (null as EOrganizationUserWorkingStatusType | null),
      period: [null, null] as DatePeriod,
    },
    enableReinitialize: true,
    onSubmit: (data) => {
      const payload = {
        userId: data.userId || undefined,
        type: data.type || undefined,
        startDate:
          (data.period[0] && data.period[0].toISOString()) || undefined,
        endDate: (data.period[1] && data.period[1].toISOString()) || undefined,
      };

      handleUpdateStatus(payload);
    },
    validateOnChange: false,
    validationSchema: yup.object({
      type: yup.string().nullable().required('Выберите Статус'),

      period: yup.array().when('type', {
        is: !EOrganizationUserWorkingStatusType.Working,
        then: yup.array().required('Обязательное поле'),
      }),
    }),
  });

  return (
    <Form id={formId} onSubmitCapture={handleSubmit}>
      <GridContainer>
        <FormItem label="Текущий статус">
          <Select
            placeholder="Выберите из списка"
            value={values.type || undefined}
            onChange={(value) => setFieldValue('type', value)}
          >
            {Object.values(EOrganizationUserWorkingStatusType).map((status) => (
              <Select.Option value={status} key={status}>
                <StaffStatus status={status} />
              </Select.Option>
            ))}
          </Select>
          <ErrorMessage>{errors?.type}</ErrorMessage>
        </FormItem>

        <FormItem label="Период">
          <RangePicker
            placeholder={['Дата начала', 'Дата окончания']}
            format="DD.MM.YYYY"
            disabled={
              values.type === EOrganizationUserWorkingStatusType.Working
            }
            value={values.period}
            onChange={(value) => {
              setFieldValue('period', value);
            }}
          />
          <ErrorMessage>{errors?.period}</ErrorMessage>
        </FormItem>
      </GridContainer>
    </Form>
  );
};
