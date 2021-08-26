import { Alert } from '01/shared/ui/Alert/Alert';
import { Space, Spaces } from '01/shared/ui/Layout/Space/Space';
import { ModalTT } from '01/shared/ui/ModalTT';
import { DatePickerTT } from '01/tt-components';
import { Form } from 'antd';
import { useForm } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import {
  $isPauseApartmentModalVisible,
  pauseApartmentForm,
  pauseApartmentModalCancelButtonClicked,
  pauseApartmentStatusFx,
} from './models';

export const PauseApartmentModal = () => {
  const visible = useStore($isPauseApartmentModalVisible);
  const pendingRequest = useStore(pauseApartmentStatusFx.pending);
  const { fields } = useForm(pauseApartmentForm);

  return (
    <ModalTT
      saveBtnText="Поставить на паузу"
      visible={visible}
      title="Постановка квартиры на паузу"
      onCancel={pauseApartmentModalCancelButtonClicked}
      loading={pendingRequest}
    >
      <Spaces>
        <div>Максимальный срок поставновки квартиры на паузу - 1 год</div>
        <Alert>
          23.05.2020 выходит срок поверки у прибора <b> СГВ-5</b> (123456789)
        </Alert>

        <Grid>
          <Form.Item label="Дата начала" style={{ width: '100%' }}>
            <DatePickerTT
              value={
                fields.fromDate.value
                  ? moment(fields.fromDate.value)
                  : undefined
              }
              onChange={(value: moment.Moment | null) =>
                value && fields.fromDate.onChange(value.toISOString())
              }
              format="YYYY.MM.DD"
            />
          </Form.Item>
          <Form.Item label="Дата начала" style={{ width: '100%' }}>
            <DatePickerTT
              value={
                fields.toDate.value ? moment(fields.toDate.value) : undefined
              }
              onChange={(value: moment.Moment | null) =>
                value && fields.toDate.onChange(value.toISOString())
              }
              format="YYYY.MM.DD"
            />
          </Form.Item>
        </Grid>
      </Spaces>
    </ModalTT>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
`;
