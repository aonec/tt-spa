import { Grid } from '01/shared/ui/Layout/Grid';
import { ModalTT } from '01/shared/ui/ModalTT';
import { Form } from 'antd';
import moment from 'moment';
import React, { FC, SyntheticEvent } from 'react';
import { EditNodeCheckPayload } from './models';
import { CheckingActDocumentType } from './utils';
import { Document, DocumentsUploadContainer } from 'ui-kit/DocumentsService';
import { EDocumentType } from 'myApi';
import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { Select } from 'ui-kit/Select';
import { DocumentsList } from 'ui-kit/DocumentsService/view/DocumentsList';
import { DatePicker } from 'ui-kit/DatePicker';
import { InputTT } from '01/tt-components';

interface Props {
  visible: boolean;
  isEditOpen: boolean;
  payload: EditNodeCheckPayload | null;
  fields: any;
  submit(): void;
  pending: boolean;
  closeCheckApartmentModal(): void;
  clearPayloadFile(): void;
  setFiles: (ids: Document[]) => void;
}

export const CheckNodeModal: FC<Props> = ({
  visible,
  isEditOpen,
  payload,
  fields,
  submit,
  pending,
  closeCheckApartmentModal,
  clearPayloadFile,
  setFiles,
}) => {
  console.log(payload);

  return (
    <>
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
            <DatePicker
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
            <Select
              placeholder="Выберите тип проверки"
              value={fields.checkType.value || undefined}
              onChange={fields.checkType.onChange as any}
            >
              {Object.entries(CheckingActDocumentType).map(([key, value]) => (
                <Select.Option value={key} key={key}>
                  {value}
                </Select.Option>
              ))}
            </Select>
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
          <DocumentsList documents={[payload.checkingAct]} isLoading={false} />
        ) : (
          <DocumentsUploadContainer
            label="Добавьте заключение проверки"
            uniqId="check-apartments"
            documents={fields.documentIds.value}
            onChange={(value) => {
              setFiles(value);
            }}
            max={1}
            type={EDocumentType.DeviceCheckAct}
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
