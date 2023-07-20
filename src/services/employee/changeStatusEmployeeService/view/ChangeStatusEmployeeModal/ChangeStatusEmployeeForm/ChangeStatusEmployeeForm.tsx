import React, { FC } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Form } from 'antd';
import { EOrganizationUserWorkingStatusType } from 'api/myApi';
import { FormItem } from 'ui-kit/FormItem';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { RangePicker } from 'ui-kit/RangePicker';
import { DatePeriod } from 'services/objects/housingStockProfileService/consolidatedReportService/view/ConsolidatedReportForm/ConsolidatedReportForm.types';
import { StaffStatus } from 'ui-kit/shared_components/StaffStatus/StaffStatus';
import { Select } from 'ui-kit/Select';
import { ChangeStatusEmployeeFormProps } from './ChangeStatusEmployeeForm.types';
import { GridContainer } from './ChangeStatusEmployeeForm.styled';

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
        startDate: (data.period[0] && data.period[0].toISOString()) || null,
        endDate: (data.period[1] && data.period[1].toISOString()) || null,
      };

      handleUpdateStatus(payload);
    },
    validateOnChange: false,
    validationSchema: yup.object({
      type: yup.string().nullable().required('Выберите Статус'),
      period: yup
        .array()
        .when(
          [
            EOrganizationUserWorkingStatusType.OnDuty,
            EOrganizationUserWorkingStatusType.OnVacation,
            EOrganizationUserWorkingStatusType.Sick,
          ],
          {
            is: true,
            then: yup
              .array()
              .of(
                yup
                  .date()
                  .required('Укажите период')
                  .typeError('Укажите период'),
              )
              .typeError('Укажите период')
              .required('Укажите период'),
          },
        ),
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
          <ErrorMessage>
            {typeof errors?.period === 'string'
              ? errors.period
              : errors?.period?.[0]}
          </ErrorMessage>
        </FormItem>
      </GridContainer>
    </Form>
  );
};
