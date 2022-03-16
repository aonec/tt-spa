import { ErrorMessage } from '01/features/contractors/addContractors';
import { Alert } from '01/shared/ui/Alert/Alert';
import { FilesUpload } from '01/shared/ui/FilesUpload';
import { Spaces, Space } from '01/shared/ui/Layout/Space/Space';
import { ModalTT } from '01/shared/ui/ModalTT';
import { DatePickerTT } from '01/tt-components';
import { Form } from 'antd';
import { useForm } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import moment from 'moment';
import { EApartmentStatus } from 'myApi';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import styled from 'styled-components';
import {
  $problemDevices,
  ProblemDevicesGate,
} from '../displayProblemDevices/models';
import {
  $isPauseApartmentModalVisible,
  pauseApartmentForm,
  pauseApartmentModalCancelButtonClicked,
  pauseApartmentStatusFx,
} from './models';

export const PauseApartmentModal = () => {
  const visible = useStore($isPauseApartmentModalVisible);
  const pendingRequest = useStore(pauseApartmentStatusFx.pending);
  const { fields, submit } = useForm(pauseApartmentForm);

  const form = (
    <Grid>
      <Form.Item label="Дата начала" style={{ width: '100%' }}>
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
      </Form.Item>
      <Form.Item label="Дата окончания" style={{ width: '100%' }}>
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
      </Form.Item>
    </Grid>
  );
  const { id } = useParams<{ id: string }>();
  const problemDevices = useStore($problemDevices);

  const gatePayload = useMemo(
    () => ({
      status: EApartmentStatus.Pause,
      fromDate: fields.fromDate.value,
      toDate: fields.toDate.value,
    }),
    [EApartmentStatus.Pause, fields.fromDate.value, fields.toDate.value]
  );

  return (
    <ModalTT
      saveBtnText="Поставить на паузу"
      visible={visible}
      title="Постановка квартиры на паузу"
      onCancel={pauseApartmentModalCancelButtonClicked}
      onSubmit={submit}
      loading={pendingRequest}
    >
      <ProblemDevicesGate
        apartmentId={Number(id)}
        requestPayload={gatePayload}
      />
      <Spaces>
        <div>Максимальный срок поставновки квартиры на паузу - 1 год</div>

        {problemDevices?.map((elem) => (
          <>
            <Alert>
              {moment(elem.futureCheckingDate).format('DD.MM.YYYY')} выходит
              срок поверки у прибора <b> {elem.model}</b> ({elem.serialNumber})
            </Alert>
            {<Space />}
          </>
        ))}

        {form}
      </Spaces>
      <FilesUploadWrap>
        <FilesUpload
          filesInit={fields.documents.value}
          uniqId={`pause-apartment`}
          text="Добавьте заявление абонента о постановке квартиры на паузу"
          onChange={fields.documents.onChange}
          type="ApartmentStoppingStatement"
        />
      </FilesUploadWrap>
    </ModalTT>
  );
};

const FilesUploadWrap = styled.div`
  margin-top: -20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
`;

const DatePicker = styled(DatePickerTT)`
  border-radius: 4px;
`;
