import React, { FC, useMemo } from 'react';
import { useFormik } from 'formik';
import moment from 'moment';
import { Document } from 'ui-kit/DocumentsService';
import {
  FilesUploadWrap,
  Grid,
  HeaderWrapper,
} from './PauseApartmentForm.styled';
import { Props } from './PauseApartmentForm.types';
import { FormItem } from 'ui-kit/FormItem';
import { DatePicker } from 'ui-kit/DatePicker';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { DocumentsUploadContainer } from 'ui-kit/DocumentsService';
import { Alert } from 'ui-kit/Alert';
import {
  ApartmentStatusSetRequest,
  EApartmentStatus,
  EDocumentType,
} from 'api/myApi';
import { pauseApartmentService } from 'services/apartments/pauseApartmentService/pauseApartmentService.models';
import { Form } from 'antd';

const {
  gates: { ProblemDevicesGate },
} = pauseApartmentService;

export const PauseApartmentForm: FC<Props> = ({
  problemDevices,
  apartmentId,
  pauseApartment,
}) => {
  const { values, setFieldValue, errors, handleSubmit } = useFormik({
    initialValues: {
      fromDate: moment().toISOString(true) as string | null,
      toDate: null as string | null,
      documents: [] as Document[],
    },
    onSubmit: (values) => {
      const payload = {
        apartmentId: apartmentId,
        requestPayload: {
          fromDate: moment(values.fromDate).format('YYYY-MM-DD'),
          toDate: moment(values.toDate).format('YYYY-MM-DD'),
          status: EApartmentStatus.Pause,
          documentIds: values.documents
            .map((document) => document.id)
            .filter((documentId): documentId is number => Boolean(documentId)),
        },
      };

      pauseApartment(payload);
    },
  });

  const payload: ApartmentStatusSetRequest = useMemo(() => {
    return {
      status: EApartmentStatus.Pause,
      fromDate: values.fromDate,
      toDate: values.toDate,
    };
  }, [values]);

  const form = (
    <Grid>
      <FormItem label="Дата начала">
        <DatePicker
          allowClear
          value={values.fromDate ? moment(values.fromDate) : undefined}
          onChange={(value: moment.Moment | null) =>
            setFieldValue('fromDate', value && value.toISOString(true))
          }
          format="DD.MM.YYYY"
          disabledDate={(value) => value.diff(moment(values.toDate)) > 0}
        />
        <ErrorMessage>{errors.fromDate}</ErrorMessage>
      </FormItem>
      <FormItem label="Дата окончания">
        <DatePicker
          allowClear
          value={values.toDate ? moment(values.toDate) : undefined}
          onChange={(value: moment.Moment | null) => {
            setFieldValue('toDate', value && value.toISOString(true));
          }}
          disabledDate={(value) => value.diff(moment(values.fromDate)) < 0}
          format="DD.MM.YYYY"
        />
        <ErrorMessage>{errors.toDate}</ErrorMessage>
      </FormItem>
    </Grid>
  );

  return (
    <Form id="pause-apartment-form" onSubmitCapture={handleSubmit}>
      <ProblemDevicesGate apartmentId={apartmentId} requestPayload={payload} />
      <HeaderWrapper>
        <div>Максимальный срок поставновки квартиры на паузу - 1 год</div>

        {problemDevices.map((elem) => (
          <>
            <Alert>
              {moment(elem.futureCheckingDate).format('DD.MM.YYYY')} выходит
              срок поверки у прибора <b> {elem.model}</b> ({elem.serialNumber})
            </Alert>
          </>
        ))}

        {form}
      </HeaderWrapper>
      <FilesUploadWrap>
        <DocumentsUploadContainer
          uniqId="pause-apartment"
          documents={values.documents}
          label="Добавьте заявление абонента о постановке квартиры на паузу"
          onChange={(documents) => setFieldValue('documents', documents)}
          type={EDocumentType.ApartmentStoppingStatement}
        />
      </FilesUploadWrap>
    </Form>
  );
};
