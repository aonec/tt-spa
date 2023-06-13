import React, { FC, useMemo } from 'react';
import moment from 'moment';
import { useForm } from 'effector-forms/dist';
import { EApartmentStatus, EDocumentType } from 'myApi';
import { FormItem } from 'ui-kit/FormItem';
import { Props } from './PauseApartmentModal.types';
import { DatePicker } from 'ui-kit/DatePicker';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { FilesUploadWrap, Grid } from './PauseApartmentModal.styled';
import { pauseApartmentService } from '../../pauseApartmentService.models';
import { Space, Spaces } from '01/shared/ui/Layout/Space/Space';
import { DocumentsUploadContainer } from 'ui-kit/DocumentsService';
import { Alert } from 'ui-kit/Alert';

const {
  outputs: { pauseApartmentForm },
  gates: { ProblemDevicesGate },
} = pauseApartmentService;

export const PauseApartmentModal: FC<Props> = ({
  problemDevices,
  isLoading,
  isOpen,
  apartmentId,
  pauseApartmentModalCancelButtonClicked,
}) => {
  const { fields, submit } = useForm(pauseApartmentForm);

  const form = (
    <Grid>
      <FormItem label="Дата начала">
        <DatePicker
          allowClear
          value={
            fields.fromDate.value ? moment(fields.fromDate.value) : undefined
          }
          onChange={(value: moment.Moment | null) =>
            fields.fromDate.onChange(value && value.toISOString(true))
          }
          format="DD.MM.YYYY"
          disabledDate={(value) => value.diff(moment(fields.toDate.value)) > 0}
        />
        <ErrorMessage>
          {fields.fromDate.errorText({
            required: 'Это поле обязательное',
          })}
        </ErrorMessage>
      </FormItem>
      <FormItem label="Дата окончания">
        <DatePicker
          allowClear
          value={fields.toDate.value ? moment(fields.toDate.value) : undefined}
          onChange={(value: moment.Moment | null) => {
            fields.toDate.onChange(value && value.toISOString(true));
          }}
          disabledDate={(value) =>
            value.diff(moment(fields.fromDate.value)) < 0
          }
          format="DD.MM.YYYY"
        />
        <ErrorMessage>
          {fields.toDate.errorText({
            required: 'Это поле обязательное',
          })}
        </ErrorMessage>
      </FormItem>
    </Grid>
  );

  const gatePayload = useMemo(
    () => ({
      status: EApartmentStatus.Pause,
      fromDate: fields.fromDate.value,
      toDate: fields.toDate.value,
    }),
    [fields.fromDate.value, fields.toDate.value],
  );

  return (
    <>
      <FormModal
        formId="pause-apartment-form"
        submitBtnText="Поставить на паузу"
        visible={isOpen}
        title="Постановка квартиры на паузу"
        onCancel={pauseApartmentModalCancelButtonClicked}
        onSubmit={submit}
        loading={isLoading}
        form={
          <>
            <ProblemDevicesGate
              apartmentId={apartmentId}
              requestPayload={gatePayload}
            />
            <Spaces>
              <div>Максимальный срок поставновки квартиры на паузу - 1 год</div>

              {problemDevices?.map((elem) => (
                <>
                  <Alert>
                    {moment(elem.futureCheckingDate).format('DD.MM.YYYY')}{' '}
                    выходит срок поверки у прибора <b> {elem.model}</b> (
                    {elem.serialNumber})
                  </Alert>
                  <Space />
                </>
              ))}

              {form}
            </Spaces>
            <FilesUploadWrap>
              <DocumentsUploadContainer
                uniqId="pause-apartment"
                documents={fields.documents.value}
                label="Добавьте заявление абонента о постановке квартиры на паузу"
                onChange={fields.documents.onChange}
                type={EDocumentType.ApartmentStoppingStatement}
              />
            </FilesUploadWrap>
          </>
        }
      />
    </>
  );
};
