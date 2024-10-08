import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { Form } from 'antd';
import { SelectValue } from 'antd/lib/select';
import { useFormik } from 'formik';
import { ENodeCommercialAccountStatus } from 'api/types';
import React, { FC, useCallback, useEffect } from 'react';
import { commercialNodeStatuses } from 'services/nodes/createNodeService/view/CreateNodePage/CommonData/CommonData.constants';
import { DatePicker } from 'ui-kit/DatePicker';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { getDatePickerValue } from 'utils/getDatePickerValue';
import { ChangeNodeStatusDocument } from '../ChangeNodeStatusDocument';
import {
  createNodeStatusValidationSchema,
  DocumentUploaderLabels,
  NodeStatusDateLabel,
  validationSchema,
} from './ChangeNodeStatusForm.constants';
import {
  GroupWrapper,
  SelectOptionWithIconWrapper,
} from './ChangeNodeStatusForm.styled';
import {
  ChangeNodeStatusFormik,
  ChangeNodeStatusFormProps,
} from './ChangeNodeStatusForm.types';

export const ChangeNodeStatusForm: FC<ChangeNodeStatusFormProps> = ({
  formId,
  handleChangeNodeStatus,
  initialData,
  createMode = false,
}) => {
  const handleSubmitForm = useCallback(
    (values: ChangeNodeStatusFormik) => {
      const { commercialStatus, documentId, firstDate, secondDate } = values;

      if (!commercialStatus) {
        return;
      }

      handleChangeNodeStatus({
        commercialStatus,
        documentId: documentId || undefined,
        firstDate: firstDate || undefined,
        secondDate: secondDate || undefined,
      });
    },
    [handleChangeNodeStatus],
  );

  const { handleSubmit, values, setFieldValue, errors } =
    useFormik<ChangeNodeStatusFormik>({
      initialValues: {
        commercialStatus: initialData?.commercialStatus || null,
        documentId: initialData?.documentId || null,
        firstDate: initialData?.firstDate || null,
        secondDate: initialData?.secondDate || null,
      },
      validationSchema: createMode
        ? createNodeStatusValidationSchema
        : validationSchema,
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit: handleSubmitForm,
    });

  const changeCommercialStatus = useCallback(
    (value: SelectValue) => {
      setFieldValue('commercialStatus', value);
      setFieldValue('secondDate', null);
      setFieldValue('documentId', null);
    },
    [setFieldValue],
  );

  useEffect(() => {
    if (!formId) {
      handleSubmitForm(values);
    }
  }, [values, handleSubmitForm, formId]);

  const isSeveralDates =
    values.commercialStatus === ENodeCommercialAccountStatus.Registered;

  return (
    <Form id={formId} onSubmitCapture={handleSubmit}>
      <GroupWrapper isSeveralDates={isSeveralDates}>
        <FormItem label="Статус узла">
          <Select
            placeholder="Выберите"
            value={values.commercialStatus || undefined}
            onChange={(value) => changeCommercialStatus(value as SelectValue)}
          >
            {commercialNodeStatuses.map(({ nodeStatus, text, Icon }) => (
              <Select.Option key={nodeStatus} value={nodeStatus}>
                <SelectOptionWithIconWrapper>
                  <Icon />
                  <div>{text}</div>
                </SelectOptionWithIconWrapper>
              </Select.Option>
            ))}
          </Select>
          <ErrorMessage>{errors.commercialStatus}</ErrorMessage>
        </FormItem>

        <FormItem
          label={
            values.commercialStatus
              ? NodeStatusDateLabel[values.commercialStatus]
              : 'Дата'
          }
        >
          <DatePicker
            placeholder="Выберите дату"
            format={{ format: 'DD.MM.YYYY', type: 'mask' }}
            value={getDatePickerValue(values.firstDate)}
            onChange={(date) =>
              setFieldValue('firstDate', date?.format('YYYY-MM-DD'))
            }
            allowClear={false}
          />
          <ErrorMessage>{errors.firstDate}</ErrorMessage>
        </FormItem>

        {isSeveralDates && (
          <FormItem label={'Дата окончания действия'}>
            <DatePicker
              placeholder="Выберите дату"
              format={{ format: 'DD.MM.YYYY', type: 'mask' }}
              value={getDatePickerValue(values.secondDate)}
              onChange={(date) =>
                setFieldValue('secondDate', date?.format('YYYY-MM-DD'))
              }
              allowClear={false}
            />
            <ErrorMessage>{errors.secondDate}</ErrorMessage>
          </FormItem>
        )}
      </GroupWrapper>

      {(values.commercialStatus ===
        ENodeCommercialAccountStatus.NotRegistered ||
        values.commercialStatus ===
          ENodeCommercialAccountStatus.Registered) && (
        <>
          <ChangeNodeStatusDocument
            label={DocumentUploaderLabels[values.commercialStatus]}
            handleChange={(id) => setFieldValue('documentId', id)}
          />
          <ErrorMessage>{errors.documentId}</ErrorMessage>
        </>
      )}
    </Form>
  );
};
