import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { Form } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { ENodeCommercialAccountStatus } from 'myApi';
import React, { FC, useMemo, useState } from 'react';
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
      date: moment().format('YYYY-MM-DD'),
      documentId: null,
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleChangeNodeStatus,
  });

  return (
    <Form id={formId} onSubmitCapture={handleSubmit}>
      <GroupWrapper>
        <FormItem label="Статус узла">
          <Select
            placeholder="Выберите"
            value={values.commercialStatus || undefined}
            onChange={(value) => setFieldValue('commercialStatus', value)}
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
            value={getDatePickerValue(values.date)}
            onChange={(date) =>
              setFieldValue('date', date?.format('YYYY-MM-DD'))
            }
            allowClear={false}
          />
        </FormItem>
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
