import { Select } from '01/shared/ui/Select';
import { Form } from 'antd';
import { useFormik } from 'formik';
import {
  ENodeRegistrationType,
  NodeSetRegistrationTypeRequest,
  NodeSetTechnicalTypeRequest,
} from 'myApi';
import React, { FC } from 'react';
import { ChangeNodeTypeFormProps } from './ChangeNodeTypeForm.types';
import { NodeRegistrationTypeLookup } from 'services/housingMeteringDevices/editNodeService/view/EditNodePage/EditNodePage.constants';
import { FormItem } from 'ui-kit/FormItem';
import { GroupWrapper } from './ChangeNodeTypeForm.styled';
import { DatePicker } from 'ui-kit/DatePicker';
import { getDatePickerValue } from 'utils/getDatePickerValue';
import { ChangeNodeStatusDocument } from 'services/nodes/changeNodeStatusService/view/ChangeNodeStatusDocument';
import { validationSchema } from './ChangeNodeTypeForm.constants';
import { ErrorMessage } from '01/shared/ui/ErrorMessage';

export const ChangeNodeTypeForm: FC<ChangeNodeTypeFormProps> = ({
  formId,
  setNodeTypePaylaod,
}) => {
  const { values, handleSubmit, setFieldValue, errors } = useFormik<
    Partial<NodeSetRegistrationTypeRequest>
  >({
    initialValues: {
      registrationType: ENodeRegistrationType.Technical,
    },
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
    onSubmit: (values) => {
      const { registrationType, technicalTypeRequest } = values;

      return setNodeTypePaylaod({ registrationType, technicalTypeRequest });
    },
  });

  const technicalTypeRequestErrors =
    errors.technicalTypeRequest as unknown as NodeSetTechnicalTypeRequest;

  return (
    <Form id={formId} onSubmitCapture={handleSubmit}>
      <GroupWrapper
        isDatePicker={
          values.registrationType === ENodeRegistrationType.Technical
        }
      >
        <FormItem label="Тип узла">
          <Select
            placeholder="Выберите"
            value={values.registrationType}
            disabled
          >
            {Object.entries(NodeRegistrationTypeLookup).map(([key, value]) => (
              <Select.Option key={key} value={key}>
                {value}
              </Select.Option>
            ))}
          </Select>
          <ErrorMessage>{errors.registrationType}</ErrorMessage>
        </FormItem>

        <FormItem label="Дата снятия с коммеречского учета">
          <DatePicker
            placeholder="Выберите дату"
            format="DD.MM.YYYY"
            value={getDatePickerValue(
              values.technicalTypeRequest
                ?.commercialAccountingDeregistrationDate,
            )}
            onChange={(date) =>
              setFieldValue(
                'technicalTypeRequest.commercialAccountingDeregistrationDate',
                date?.format('YYYY-MM-DD'),
              )
            }
            allowClear={false}
          />
          <ErrorMessage>
            {technicalTypeRequestErrors?.commercialAccountingDeregistrationDate}
          </ErrorMessage>
        </FormItem>
      </GroupWrapper>
      <ChangeNodeStatusDocument
        label="Добавьте акт снятия с коммерческого учёта"
        handleChange={(id) =>
          setFieldValue('technicalTypeRequest.documentId', id)
        }
      />
      <ErrorMessage>{technicalTypeRequestErrors?.documentId}</ErrorMessage>
    </Form>
  );
};
