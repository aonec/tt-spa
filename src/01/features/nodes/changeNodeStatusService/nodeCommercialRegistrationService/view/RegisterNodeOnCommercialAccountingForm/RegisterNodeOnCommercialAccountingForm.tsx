import { FilesUpload } from '01/shared/ui/FilesUpload';
import { Grid } from '01/shared/ui/Layout/Grid';
import { DatePickerTT } from '01/tt-components';
import { EDocumentType } from 'myApi';
import { DatePicker, Form } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { NodeAdmissionActRequest } from 'myApi';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { RegisterNodeOnCommercialAccountingFormProps } from './RegisterNodeOnCommercialAccountingForm.types';

export const RegisterNodeOnCommercialAccountingForm: FC<RegisterNodeOnCommercialAccountingFormProps> = ({
  handleSubmit,
  nodeStatus,
  lastCommercialAccountingDate,
}) => {
  const { nodeId } = useParams<{ nodeId: string }>();
  const date = moment(lastCommercialAccountingDate)
  const {
    handleSubmit: submitForm,
    setFieldValue,
    values,
  } = useFormik<NodeAdmissionActRequest>({
    initialValues: {
      documentId: undefined as number | undefined,
      startCommercialAccountingDate: undefined,
      endCommercialAccountingDate: undefined,
    },
    onSubmit: (values) =>
      handleSubmit({
        data: values,
        pipeNodeId: Number(nodeId),
      }),
  });
  console.log(values);
  return (
    <Form
      id="register-node-on-commertion-accounting-form"
      onSubmitCapture={submitForm}
    >
      {/* {nodeStatus === 'Registered' ? (
        <Form.Item label="Дата снятия с коммерческого учёта">
          <DatePickerTT
            value={
              values.startCommercialAccountingDate
                ? moment(values.startCommercialAccountingDate)
                : undefined
            }
            onChange={(value) =>
              setFieldValue(
                'endCommercialAccountingDate',
                value?.toISOString(false)
              )
            }
          />
        </Form.Item>
      ) : ( */}
        <Grid temp="1fr 1fr" gap="15px" margin-top="25px">
          <Form.Item label="Дата начала действия акта-допуска">
            <DatePickerTT
              value={
                values.startCommercialAccountingDate
                  ? moment(values.startCommercialAccountingDate)
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
                values.endCommercialAccountingDate
                  ? moment(values.endCommercialAccountingDate)
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
