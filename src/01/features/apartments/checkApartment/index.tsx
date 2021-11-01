import React from 'react';
import { useStore } from 'effector-react';
import {
  $isCheckApartmentModalOpen,
  checkApartmentForm,
  closeCheckApartmentModal,
} from './models';
import { ModalTT } from '01/shared/ui/ModalTT';
import { FilesUpload } from '01/shared/ui/FilesUpload';
import { Grid } from '01/shared/ui/Layout/Grid';
import { DatePickerTT } from '01/tt-components';
import { StyledSelect } from '01/_pages/IndividualDeviceEdit/components/IndividualDeviceEditForm';
import { Form } from 'antd';
import { ECheckType } from 'myApi';
import { useForm } from 'effector-forms/dist';
import moment from 'moment';

export const CheckApartmentModal = () => {
  const visible = useStore($isCheckApartmentModalOpen);

  const { fields } = useForm(checkApartmentForm);

  return (
    <ModalTT
      title="Создать проверку"
      visible={visible}
      onCancel={closeCheckApartmentModal}
      saveBtnText="Создать проверку"
    >
      <Grid temp="1fr 1fr" gap="15px">
        <Form.Item label="Дата проверки">
          <DatePickerTT
            format="DD.MM.YYYY"
            onChange={fields.checkingDate.onChange as any}
            value={
              fields.checkingDate.value
                ? moment(fields.checkingDate.value)
                : null
            }
          />
        </Form.Item>
        <Form.Item label="Тип проверки">
          <StyledSelect
            placeholder="Выберите тип проверки"
            value={fields.checkType.value || undefined}
            onChange={fields.checkType.onChange as any}
          >
            <StyledSelect.Option
              value={ECheckType.Planned}
              key={ECheckType.Planned}
            >
              Плановая
            </StyledSelect.Option>
            <StyledSelect.Option
              value={ECheckType.Unplanned}
              key={ECheckType.Unplanned}
            >
              Внеплановая
            </StyledSelect.Option>
          </StyledSelect>
        </Form.Item>
      </Grid>
      <FilesUpload
        text="Добавьте заключение проверки"
        uniqId="check-apartments"
        filesInit={fields.documentIds.value}
        onChange={fields.documentIds.onChange}
      />
    </ModalTT>
  );
};
