import React, { FC } from 'react';
import { CloseIndividualDeviceFormProps } from './CloseIndividualDeviceForm.types';
import { useForm } from 'effector-forms';
import { Form } from 'antd';
import { FormItem } from 'ui-kit/FormItem';
import { DocumentsUploadContainer } from 'ui-kit/DocumentsService';
import { EClosingReason, EDocumentType } from 'api/myApi';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { Select } from 'ui-kit/Select';
import { ClosingReasonsDictionary } from 'dictionaries';
import moment from 'moment';
import { DatePicker } from 'ui-kit/DatePicker';
import { GroupWrapper } from './CloseIndividualDeviceForm.styled';

export const CloseIndividualDeviceForm: FC<CloseIndividualDeviceFormProps> = ({
  form,
  formId,
}) => {
  const { errorText, fields, submit } = useForm(form);

  return (
    <Form id={formId} onSubmitCapture={() => submit()}>
      <GroupWrapper>
        <FormItem label="Дата снятия прибора с учета">
          <DatePicker
            value={fields.closingDate.value}
            onChange={(date) => fields.closingDate.onChange(date)}
            format="DD.MM.YYYY"
            disabledDate={(current) => {
              return current && current > moment().endOf('day');
            }}
          />
          <ErrorMessage>{errorText('closingDate')}</ErrorMessage>
        </FormItem>
        <FormItem label="Причина зыкрытия" style={{ width: '100%' }}>
          <Select
            placeholder="Выберите причину закрытия"
            value={fields.closingReason.value || undefined}
            onChange={(reason) =>
              fields.closingReason.onChange(reason as EClosingReason)
            }
          >
            {Object.entries(ClosingReasonsDictionary).map(([key, elem]) => (
              <Select.Option value={key} key={key}>
                {elem}
              </Select.Option>
            ))}
          </Select>
          <ErrorMessage>{errorText('closingReason')}</ErrorMessage>
        </FormItem>
      </GroupWrapper>
      <DocumentsUploadContainer
        uniqId="close-individual-device"
        label="Добавьте акт снятия прибора с учета"
        type={EDocumentType.DeviceClosingAct}
        onChange={fields.documentsIds.onChange}
        documents={fields.documentsIds.value}
        max={6}
      />
    </Form>
  );
};
