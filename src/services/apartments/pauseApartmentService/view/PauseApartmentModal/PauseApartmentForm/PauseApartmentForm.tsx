import React, { FC, useMemo } from 'react';
import moment from 'moment';
import {
  FilesUploadWrap,
  Grid,
  HeaderWrapper,
} from './PauseApartmentForm.styled';
import { Props } from './PauseApartmentForm.types';
import { FormItem } from 'ui-kit/FormItem';
import { DatePicker } from 'ui-kit/DatePicker';
import { DocumentsUploadContainer } from 'ui-kit/DocumentsService';
import { Alert } from 'ui-kit/Alert';
import {
  ApartmentStatusSetRequest,
  EApartmentStatus,
  EDocumentType,
} from 'api/types';
import { pauseApartmentService } from 'services/apartments/pauseApartmentService/pauseApartmentService.models';
import { Form } from 'antd';
import { useForm } from 'effector-forms';
import { getDatePickerValue } from 'utils/getDatePickerValue';

const {
  gates: { ProblemDevicesGate },
} = pauseApartmentService;

export const PauseApartmentForm: FC<Props> = ({
  problemDevices,
  form,
  formId,
  apartmentId,
}) => {
  const { fields, submit, values } = useForm(form);

  const payload: ApartmentStatusSetRequest = useMemo(() => {
    return {
      status: EApartmentStatus.Pause,
      fromDate: values.fromDate,
      toDate: values.toDate,
    };
  }, [values]);

  const formComponent = (
    <Grid>
      <FormItem label="Дата начала">
        <DatePicker
          allowClear
          value={getDatePickerValue(values.fromDate)}
          onChange={(value: moment.Moment | null) =>
            value && fields.fromDate.onChange(value.format())
          }
          format="DD.MM.YYYY"
          disabledDate={(value) => value.diff(moment(values.toDate)) > 0}
        />
      </FormItem>
      <FormItem label="Дата окончания">
        <DatePicker
          allowClear
          value={getDatePickerValue(values.toDate)}
          onChange={(value: moment.Moment | null) => {
            value && fields.toDate.onChange(value.format());
          }}
          disabledDate={(value) => value.diff(moment(values.fromDate)) < 0}
          format="DD.MM.YYYY"
        />
      </FormItem>
    </Grid>
  );

  return (
    <Form id={formId} onSubmitCapture={() => submit()}>
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

        {formComponent}
      </HeaderWrapper>
      <FilesUploadWrap>
        <DocumentsUploadContainer
          uniqId="pause-apartment"
          documents={values.documents}
          label="Добавьте заявление абонента о постановке квартиры на паузу"
          onChange={(documents) => fields.documents.onChange(documents)}
          type={EDocumentType.ApartmentStoppingStatement}
        />
      </FilesUploadWrap>
    </Form>
  );
};
