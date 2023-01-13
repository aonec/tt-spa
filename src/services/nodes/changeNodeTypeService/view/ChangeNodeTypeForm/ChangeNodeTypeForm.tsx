import { Select } from '01/shared/ui/Select';
import { Form } from 'antd';
import { useFormik } from 'formik';
import { ENodeRegistrationType, NodeSetRegistrationTypeRequest } from 'myApi';
import React, { FC, useEffect, useRef } from 'react';
import { ChangeNodeStatusForm } from 'services/nodes/changeNodeStatusService/view/ChangeNodeStatusForm';
import { ChangeNodeTypeFormProps } from './ChangeNodeTypeForm.types';
import { NodeRegistrationTypeLookup } from 'services/devices/editNodeService/view/EditNodePage/EditNodePage.constants';
import { FormItem } from 'ui-kit/FormItem';
import { GroupWrapper } from './ChangeNodeTypeForm.styled';
import { DatePicker } from 'ui-kit/DatePicker';
import { getDatePickerValue } from 'utils/getDatePickerValue';
import { ChangeNodeStatusDocument } from 'services/nodes/changeNodeStatusService/view/ChangeNodeStatusDocument';
import { getChangeNodeStatusPayload } from 'services/nodes/changeNodeStatusService/changeNodeStatusService.utils';
import { validationSchema } from './ChangeNodeTypeForm.constants';
import { ErrorMessage } from '01/shared/ui/ErrorMessage';

export const ChangeNodeTypeForm: FC<ChangeNodeTypeFormProps> = ({
  formId,
  node,
  setNodeTypePaylaod,
}) => {
  const { values, handleSubmit, setFieldValue, errors } = useFormik<
    Partial<NodeSetRegistrationTypeRequest>
  >({
    initialValues: {
      registrationType: node.registrationType,
    },
    validationSchema,
    validateOnMount: true,
    onSubmit: (values) => {
      const { commercialStatusRequest, registrationType } = values;

      if (
        registrationType === ENodeRegistrationType.Commercial &&
        !commercialStatusRequest
      ) {
        return;
      }
      setNodeTypePaylaod({ registrationType, commercialStatusRequest });
    },
  });

  useEffect(() => {
    setFieldValue('commercialStatusRequest', undefined);
  }, [values.registrationType]);

  const isTechnical =
    values.registrationType === ENodeRegistrationType.Technical;

  return (
    <>
      <Form id={formId} onSubmitCapture={handleSubmit}>
        <GroupWrapper
          isDatePicker={
            values.registrationType === ENodeRegistrationType.Technical
          }
        >
          <FormItem label="Тип узла">
            <Select
              placeholder="Выберите"
              onChange={(value) => setFieldValue('registrationType', value)}
              value={values.registrationType}
            >
              {Object.entries(NodeRegistrationTypeLookup).map(
                ([key, value]) => (
                  <Select.Option key={key} value={key}>
                    {value}
                  </Select.Option>
                )
              )}
            </Select>
            <ErrorMessage>{errors.registrationType}</ErrorMessage>
          </FormItem>

          {isTechnical && (
            <FormItem label="Дата снятия с коммеречского учета">
              <DatePicker
                placeholder="Выберите дату"
                format="DD.MM.YYYY"
                value={getDatePickerValue(
                  values.commercialStatusRequest
                    ?.commercialAccountingDeregistrationDate
                )}
                onChange={(date) =>
                  setFieldValue(
                    'commercialStatusRequest.commercialAccountingDeregistrationDate',
                    date?.format('YYYY-MM-DD')
                  )
                }
                allowClear={false}
              />
            </FormItem>
          )}
        </GroupWrapper>
        {isTechnical && (
          <ChangeNodeStatusDocument
            label="Добавьте акт снятия с коммерческого учёта"
            handleChange={(id) =>
              setFieldValue('commercialStatusRequest.documentId', id)
            }
          />
        )}
      </Form>

      {values.registrationType === ENodeRegistrationType.Commercial && (
        <ChangeNodeStatusForm
          handleChangeNodeStatus={(values) =>
            setFieldValue(
              'commercialStatusRequest',
              getChangeNodeStatusPayload(values)
            )
          }
        />
      )}
    </>
  );
};
