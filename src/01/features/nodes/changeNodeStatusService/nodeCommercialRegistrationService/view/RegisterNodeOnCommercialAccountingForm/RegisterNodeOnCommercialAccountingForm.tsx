import { FilesUpload } from '01/shared/ui/FilesUpload';
import { Grid } from '01/shared/ui/Layout/Grid';
import { DatePickerTT } from '01/tt-components';
import { EDocumentType } from "myApi"
import { DatePicker, Form } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { NodeAdmissionActRequest } from 'myApi';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { RegisterNodeOnCommercialAccountingFormProps } from './RegisterNodeOnCommercialAccountingForm.types';

export const RegisterNodeOnCommercialAccountingForm: FC<RegisterNodeOnCommercialAccountingFormProps> = ({
  handleSubmit,
}) => {
  const { nodeId } = useParams<{ nodeId: string }>();

  const {
    handleSubmit: submitForm,
    setFieldValue,
    values,
  } = useFormik<NodeAdmissionActRequest>({
    initialValues: {
      documentId: undefined as number | undefined,
      startCommercialAccountingDate: undefined ,
      endCommercialAccountingDate: undefined,
    },
    onSubmit: (values) =>
      handleSubmit({ data: values, pipeNodeId: Number(nodeId) }),
  });

  return (
    <Form
      id="register-node-on-commertion-accounting-form"
      onSubmitCapture={submitForm}
    >
      <Grid temp="1fr 1fr" gap="15px">
        <Form.Item label="Дата начала действия акта-допуска">
          <DatePickerTT
            value={
              values.startCommercialAccountingDate ?
              moment(values.startCommercialAccountingDate)
              : undefined
            }
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
          value={
            values.endCommercialAccountingDate ?
            moment(values.startCommercialAccountingDate)
            : undefined
          }
          onChange={(value) =>
            setFieldValue(
              'endCommercialAccountingDate',
              value?.toISOString(true)
            )
          }
          />
        </Form.Item>
      </Grid>
      <FilesUpload
        type={EDocumentType.NodeAdmissionAct}
        uniqId="accounting-form"
        max={1}
        onChange={(value) =>
          setFieldValue('documentId', value[0]?.fileResponse?.id)
        }
      />
    </Form>
  );
};
