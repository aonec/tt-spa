import { Form } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { FC, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { EDocumentType, NodeSetRegisteredRequest } from '../../../../../../../api/types';
import { FilesUpload } from '../../../../../../shared/ui/FilesUpload';
import { Grid } from '../../../../../../shared/ui/Layout/Grid';
import { DatePickerTT } from '../../../../../../tt-components';
import { RegisterNodeOnCommercialAccountingFormProps } from './RegisterNodeOnCommercialAccountingForm.types';

export const RegisterNodeOnCommercialAccountingForm: FC<RegisterNodeOnCommercialAccountingFormProps> = ({
  handleSubmit,
  handleSubmitUnset,
  isRegistered,
  resource,
  formId,
}) => {
  const { nodeId } = useParams<{ nodeId: string }>();
  const resourceType = resource === 'Electricity' ? 'electric' : 'pipe';

  const {
    handleSubmit: submitForm,
    setFieldValue,
    values,
  } = useFormik<NodeSetRegisteredRequest>({
    initialValues: {
      documentId: undefined,
      startCommercialAccountingDate: undefined,
      endCommercialAccountingDate: undefined,
    },
    onSubmit: useCallback(
      (values) =>
        isRegistered
          ? handleSubmitUnset({
              data: values,
              nodeId: Number(nodeId),
              type: resourceType,
            })
          : handleSubmit({
              data: values,
              nodeId: Number(nodeId),
              type: resourceType,
            }),
      [isRegistered]
    ),
  });

  const formValues = {
    start: values.startCommercialAccountingDate
      ? moment(values.startCommercialAccountingDate)
      : undefined,
    end: values.endCommercialAccountingDate
      ? moment(values.endCommercialAccountingDate)
      : undefined,
  };

  const form = useMemo(
    () =>
      isRegistered ? (
        <Form.Item label="Дата снятия с коммерческого учёта">
          <DatePickerTT
            value={formValues.start}
            onChange={(value) =>
              setFieldValue(
                'endCommercialAccountingDate',
                value?.toISOString(false)
              )
            }
          />
        </Form.Item>
      ) : (
        <Grid temp="1fr 1fr" gap="15px">
          <Form.Item label="Дата начала действия акта-допуска">
            <DatePickerTT
              value={formValues.start}
              onChange={(value) =>
                setFieldValue(
                  'startCommercialAccountingDate',
                  value?.toISOString(true)
                )
              }
            />
          </Form.Item>
          <Form.Item label="Дата окончания действия акта-допуска">
            <DatePickerTT
              value={formValues.end}
              onChange={(value) =>
                setFieldValue(
                  'endCommercialAccountingDate',
                  value?.toISOString(true)
                )
              }
            />
          </Form.Item>
        </Grid>
      ),
    [isRegistered]
  );

  return (
    <>
      <Form id={formId} onSubmitCapture={submitForm}>
        {form}
        <FilesUpload
          type={EDocumentType.NodeAdmissionAct}
          uniqId="accounting-form"
          max={1}
          onChange={(value) =>
            setFieldValue('documentId', value[0]?.fileResponse?.id)
          }
        />
      </Form>
    </>
  );
};
