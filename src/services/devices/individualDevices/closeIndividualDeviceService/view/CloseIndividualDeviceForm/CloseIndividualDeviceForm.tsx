import React, { FC } from 'react';
import { CloseIndividualDeviceFormProps } from './CloseIndividualDeviceForm.types';
import { useForm } from 'effector-forms';
import { Form } from 'antd';
import { FormItem } from 'ui-kit/FormItem';
import { DocumentsUploadContainer } from 'ui-kit/DocumentsService';
import {
  EClosingReason,
  EDocumentType,
  EIndividualDeviceRateType,
} from 'api/types';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { Select } from 'ui-kit/Select';
import { ClosingReasonsDictionary } from 'dictionaries';
import dayjs from 'api/dayjs';
import { DatePicker } from 'ui-kit/DatePicker';
import { GroupWrapper } from './CloseIndividualDeviceForm.styled';
import { WorkWithIndividualDeviceInputs } from 'services/devices/individualDevices/workWithIndividualDeviceService/view/WorkWithIndividualDevicePage/WorkWithIndividualDeviceForm/WorkWithIndividualDeviceInputs';

export const CloseIndividualDeviceForm: FC<CloseIndividualDeviceFormProps> = ({
  form,
  formId,
  device,
}) => {
  const { errorText, fields, submit } = useForm(form);

  return (
    <Form id={formId} onSubmitCapture={() => submit()}>
      <GroupWrapper>
        <FormItem label="Дата снятия прибора с учета">
          <DatePicker
            picker="month"
            format="MMMM YYYY"
            value={fields.closingDate.value}
            onChange={(date) => fields.closingDate.onChange(date)}
            disabledDate={(current) => {
              return current && current > dayjs().endOf('day');
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
      {/* <DocumentsUploadContainer
        uniqId="close-individual-device"
        label="Добавьте акт снятия прибора с учета"
        type={EDocumentType.DeviceClosingAct}
        onChange={fields.documentsIds.onChange}
        documents={fields.documentsIds.value}
        max={6}
      /> */}

      <WorkWithIndividualDeviceInputs
        title={'Закрываемый прибор'}
        model={device?.model || ''}
        resource={device?.resource || null}
        serialNumber={device?.serialNumber || ''}
        rateType={device?.rateType || EIndividualDeviceRateType.OneZone}
        readings={{
          "0": {
            value1: '1',
            value2: '2',
            value3: '3',
            value4: '4',
            readingDate: '',
          },
          "-1": {
            value1: '1',
            value2: '2',
            value3: '3',
            value4: '4',
            readingDate: '',
          },
        }}
        onChange={(readings) => {}}
      />
    </Form>
  );
};
