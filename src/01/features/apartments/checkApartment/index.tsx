import React from 'react';
import { useStore } from 'effector-react';
import {
  $isCheckApartmentModalOpen,
  checkApartmentForm,
  checkApartmentFx,
  closeCheckApartmentModal,
} from './models';
import { ModalTT } from '01/shared/ui/ModalTT';
import { FilesUpload } from '01/shared/ui/FilesUpload';
import { Grid } from '01/shared/ui/Layout/Grid';
import { DatePickerTT, InputTT } from '01/tt-components';
import { StyledSelect } from '01/_pages/IndividualDeviceEdit/components/IndividualDeviceEditForm';
import { Form } from 'antd';
import { ECheckType } from 'myApi';
import { useForm } from 'effector-forms/dist';
import moment from 'moment';
import { ErrorMessage } from '01/features/contractors/addContractors';
import { DatePickerNative } from '01/shared/ui/DatePickerNative';

export const CheckApartmentModal = () => {
  const visible = useStore($isCheckApartmentModalOpen);

  const { fields, submit } = useForm(checkApartmentForm);
  const pending = useStore(checkApartmentFx.pending);

  return (
    <ModalTT
      title="Создать проверку"
      visible={visible}
      onCancel={closeCheckApartmentModal}
      saveBtnText="Создать проверку"
      onSubmit={submit}
      loading={pending}
    >
      <Grid temp="1fr 1fr 1fr" gap="15px">
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
          <ErrorMessage>
            {fields.checkingDate.errorText({
              required: 'Это поле обязательное',
            })}
          </ErrorMessage>
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
          <ErrorMessage>
            {fields.checkType.errorText({
              required: 'Это поле обязательное',
            })}
          </ErrorMessage>
        </Form.Item>
        <Form.Item label="Номер документа">
          <InputTT
            value={fields.registryNumber.value}
            onChange={(e: any) =>
              fields.registryNumber.onChange(e.target.value)
            }
            placeholder="Введите номер"
          />
          <ErrorMessage>
            {fields.registryNumber.errorText({
              required: 'Это поле обязательное',
            })}
          </ErrorMessage>
        </Form.Item>
      </Grid>
      <FilesUpload
        text="Добавьте заключение проверки"
        uniqId="check-apartments"
        filesInit={fields.documentIds.value}
        onChange={fields.documentIds.onChange}
        max={1}
      />
      <ErrorMessage>
        {fields.documentIds.errorText({
          required: 'Это поле обязательное',
        })}
      </ErrorMessage>
    </ModalTT>
  );
};
