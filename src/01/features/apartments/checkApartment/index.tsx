import React, { SyntheticEvent, useEffect } from 'react';
import { useStore } from 'effector-react';
import {
  $editApartmentCheckModalPayload,
  $isCheckApartmentModalOpen,
  $isEditApartmentCheckModalOpen,
  checkApartmentForm,
  checkApartmentFx,
  clearPayloadFile,
  closeCheckApartmentModal,
  editApartmentCheckFx,
  saveEditApartmentCheck,
} from './models';
import { ModalTT } from '01/shared/ui/ModalTT';
import { FilesUpload } from '01/shared/ui/FilesUpload';
import { Grid } from '01/shared/ui/Layout/Grid';
import { DatePickerTT, InputTT } from '01/tt-components';
import { StyledSelect } from '01/_pages/IndividualDeviceEdit/components/IndividualDeviceEditForm';
import { Form, message } from 'antd';
import { ECheckType } from 'myApi';
import { useForm } from 'effector-forms/dist';
import moment from 'moment';
import { ErrorMessage } from '01/features/contractors/addContractors';
import { FilesList } from '01/shared/ui/FilesList';
import { combine } from 'effector';
import {
  ApartmentActTypesGate,
  $actTypes,
} from '../../actsJournal/displayActTypes/models';
import { CheckingActDocumentType } from '01/_pages/ApartmentProfile/components/ChecksHistory/utils';

export const CheckApartmentModal = () => {
  const visible = useStore($isCheckApartmentModalOpen);

  const isEditOpen = useStore($isEditApartmentCheckModalOpen);

  const payload = useStore($editApartmentCheckModalPayload);

  const { fields, submit } = useForm(checkApartmentForm);
  const pending = useStore(
    combine(
      checkApartmentFx.pending,
      editApartmentCheckFx.pending,
      (...values) => values.some(Boolean)
    )
  );

  useEffect(
    () =>
      editApartmentCheckFx.fail.watch(() => message.error('Ошибка сохранения'))
        .unsubscribe,
    []
  );

  const actTypes = useStore($actTypes);

  return (
    <>
      <ApartmentActTypesGate />
      <ModalTT
        title={isEditOpen ? 'Редактировать проверку' : 'Создать проверку'}
        visible={visible || isEditOpen}
        onCancel={closeCheckApartmentModal}
        saveBtnText={isEditOpen ? 'Сохранить изменения' : 'Создать проверку'}
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
              {Object.entries(CheckingActDocumentType).map(([key, value]) => (
                <StyledSelect.Option value={key} key={key}>
                  {value}
                </StyledSelect.Option>
              ))}
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
              onChange={(e: SyntheticEvent<HTMLInputElement>) =>
                fields.registryNumber.onChange(e.currentTarget.value)
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
        {payload?.checkingAct ? (
          <FilesList
            files={[
              {
                id: 432,
                fileResponse: payload?.checkingAct,
                onRemove: () => {
                  fields.documentIds.onChange([]);
                  clearPayloadFile();
                },
              },
            ]}
          />
        ) : (
          <FilesUpload
            text="Добавьте заключение проверки"
            uniqId="check-apartments"
            filesInit={fields.documentIds.value}
            onChange={(value) => {
              fields.documentIds.onChange(value);
            }}
            max={1}
          />
        )}
        <ErrorMessage>
          {fields.documentIds.errorText({
            required: 'Это поле обязательное',
          })}
        </ErrorMessage>
      </ModalTT>
    </>
  );
};
