import { ErrorMessage } from '01/features/contractors/addContractors';
import { FilesList } from '01/shared/ui/FilesList';
import { Grid } from '01/shared/ui/Layout/Grid';
import { ModalTT } from '01/shared/ui/ModalTT';
import { DatePickerTT, InputTT } from '01/tt-components';
import { StyledSelect } from '01/_pages/IndividualDeviceEdit/components/IndividualDeviceEditForm';
import { Form } from 'antd';
import moment from 'moment';
import React, { FC, SyntheticEvent } from 'react';
import { EditNodeCheckPayload } from './models';
import { CheckingActDocumentType } from './utils';
import { Document, DocumentsUploadContainer } from 'ui-kit/DocumentsService';
import { EDocumentType } from 'myApi';

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
