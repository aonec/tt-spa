import React, { FC } from 'react';
import { CloseHousingMeteringDeviceFormProps } from './CloseHousingMeteringDeviceForm.types';
import { Form } from 'antd';
import { FormItem } from 'ui-kit/FormItem';
import { DatePicker } from 'ui-kit/DatePicker';
import { useFormik } from 'formik';
import moment from 'moment';
import * as yup from 'yup';
import { CloseDeviceRequest, EDocumentType } from 'myApi';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { Description } from './CloseHousingMeteringDeviceForm.styled';
import { DocumentsUploadContainer, Document } from 'ui-kit/DocumentsService';

const uniqId = 'close-housing-metering-device-form';

export const CloseHousingMeteringDeviceForm: FC<
  CloseHousingMeteringDeviceFormProps
> = ({ deviceId, formId, handleOnSubmit }) => {
  const { handleSubmit, values, errors, setFieldValue } = useFormik({
    initialValues: {
      deviceId: deviceId,
      closingDate: moment(),
      documents: [] as Document[],
    },
    validationSchema: yup.object({
      deviceId: yup.number().required('Не передан Идентификатор устройства'),
      closingDate: yup.string().nullable().required('Обязательное поле'),
    }),
    onSubmit: () => {
      const form: CloseDeviceRequest = {
        deviceId: values.deviceId,
        closingDate: values.closingDate.toISOString(true),
        documentsIds: values.documents.map((doc) => doc.id),
      };

      handleOnSubmit(form);
    },
  });

  return (
    <>
      <Description>
        Показания по прибору будут приниматься, но они не учитываются для
        расчёта оплаты за потребление
      </Description>
      <Form id={formId} onSubmitCapture={handleSubmit}>
        <FormItem label="Дата снятия прибора с учета">
          <DatePicker
            value={values.closingDate}
            onChange={(date) => {
              setFieldValue('closingDate', date);
            }}
            placeholder="Выберите"
            format="DD.MM.YYYY"
          />
          <ErrorMessage> {errors.closingDate} </ErrorMessage>
        </FormItem>
      </Form>

      <DocumentsUploadContainer
        uniqId={uniqId}
        onChange={(doc) => {
          if (doc.length === 0) {
            return setFieldValue('documents', []);
          }
          setFieldValue('documents', doc);
        }}
        label="Добавьте акт снятия прибора с учета"
        documents={values.documents}
        type={EDocumentType.DeviceClosingAct}
      />
    </>
  );
};
