import { Form } from 'antd';
import { useFormik } from 'formik';
import {
  ENodeRegistrationType,
  NodeSetRegistrationTypeRequest,
  NodeSetTechnicalTypeRequest,
} from 'api/types';
import React, { FC } from 'react';
import { ChangeNodeTypeFormProps } from './ChangeNodeTypeForm.types';
import { FormItem } from 'ui-kit/FormItem';
import { GroupWrapper } from './ChangeNodeTypeForm.styled';
import { DatePicker } from 'ui-kit/DatePicker';
import { getDatePickerValue } from 'utils/getDatePickerValue';
import { ChangeNodeStatusDocument } from 'services/nodes/changeNodeStatusService/view/ChangeNodeStatusDocument';
import { validationSchema } from './ChangeNodeTypeForm.constants';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { Select } from 'ui-kit/Select';
import { NodeRegistrationTypeLookup } from 'dictionaries';

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
                {value} узел
              </Select.Option>
            ))}
          </Select>
          <ErrorMessage>{errors.registrationType}</ErrorMessage>
        </FormItem>

        <FormItem label="Дата снятия с коммеречского учета">
          <DatePicker
            placeholder="Выберите дату"
            format={{ format: 'DD.MM.YYYY', type: 'mask' }}
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
