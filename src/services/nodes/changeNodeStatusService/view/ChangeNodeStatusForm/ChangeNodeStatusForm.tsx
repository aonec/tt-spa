import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { Form } from 'antd';
import { SelectValue } from 'antd/lib/select';
import { useFormik } from 'formik';
import { ENodeCommercialAccountStatus } from 'myApi';
import React, { FC, useCallback, useState } from 'react';
import { nodeStatuses } from 'services/nodes/createNodeService/view/CreateNodePage/CommonData/CommonData.contstants';
import { DatePicker } from 'ui-kit/DatePicker';
import { Document, DocumentsUploadContainer } from 'ui-kit/DocumentsService';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { getDatePickerValue } from 'utils/getDatePickerValue';
import {
  DocumentUploaderLabels,
  NodeStatusDateLabel,
  validationSchema,
} from './ChangeNodeStatusForm.constants';
import {
  DatePickersWrapper,
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
  initialValues,
}) => {
  const [documents, setDocuments] = useState<Document[]>([]);

  const {
    handleSubmit,
    values,
    setFieldValue,
    errors,
  } = useFormik<ChangeNodeStatusFormik>({
    initialValues: {
      commercialStatus: initialValues?.commercialStatus?.value || null,
      documentId: null,
      firstDate: null,
      secondDate: null,
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      const { commercialStatus, documentId, firstDate, secondDate } = values;

      if (!commercialStatus || !firstDate) {
        return;
      }

      handleChangeNodeStatus({
        commercialStatus,
        documentId: documentId || undefined,
        firstDate,
        secondDate: secondDate || undefined,
      });
    },
  });

  const changeCommercialStatus = useCallback(
    (value: SelectValue) => {
      setFieldValue('commercialStatus', value);
      setFieldValue('secondDate', null);
      setFieldValue('documentId', null);
    },
    [setFieldValue]
  );

  const isSeveralDates =
    values.commercialStatus === ENodeCommercialAccountStatus.Registered;

  return (
    <Form id={formId} onSubmitCapture={handleSubmit}>
      <GroupWrapper>
        <FormItem label="Статус узла">
          <Select
            placeholder="Выберите"
            value={values.commercialStatus || undefined}
            onChange={changeCommercialStatus}
          >
            {nodeStatuses.map(({ nodeStatus, text, Icon }) => (
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

        <DatePickersWrapper>
          <FormItem
            label={
              values.commercialStatus
                ? NodeStatusDateLabel[values.commercialStatus]
                : 'Дата'
            }
          >
            <DatePicker
              placeholder="Выберите дату"
              format="DD.MM.YYYY"
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
                format="DD.MM.YYYY"
                value={getDatePickerValue(values.secondDate)}
                onChange={(date) =>
                  setFieldValue('secondDate', date?.format('YYYY-MM-DD'))
                }
                allowClear={false}
              />
              <ErrorMessage>{errors.secondDate}</ErrorMessage>
            </FormItem>
          )}
        </DatePickersWrapper>
      </GroupWrapper>

      {(values.commercialStatus ===
        ENodeCommercialAccountStatus.NotRegistered ||
        values.commercialStatus ===
          ENodeCommercialAccountStatus.Registered) && (
        <>
          <DocumentsUploadContainer
            documents={documents}
            uniqId="change-node-status-document"
            onChange={(files) => {
              setDocuments(files);
              setFieldValue('documentId', files[0]?.id);
            }}
            max={1}
            label={DocumentUploaderLabels[values.commercialStatus]}
          />
          <ErrorMessage>{errors.documentId}</ErrorMessage>
        </>
      )}
    </Form>
  );
};
