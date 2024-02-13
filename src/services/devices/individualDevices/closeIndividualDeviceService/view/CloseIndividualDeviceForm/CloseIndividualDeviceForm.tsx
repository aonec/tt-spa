import React, { FC } from 'react';
import { CloseIndividualDeviceFormProps } from './CloseIndividualDeviceForm.types';
import { useForm } from 'effector-forms';
import { Form } from 'antd';
import { FormItem } from 'ui-kit/FormItem';
import { EClosingReason } from 'api/types';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { Select } from 'ui-kit/Select';
import { ClosingReasonsDictionary } from 'dictionaries';
import dayjs from 'api/dayjs';
import { DatePicker } from 'ui-kit/DatePicker';
import {
  AlertContainer,
  AlertTitle,
  AlertWrapper,
  ChevronRotated,
  GroupWrapper,
  HistoryButton,
} from './CloseIndividualDeviceForm.styled';
import { IndividualDeviceLastReadingBar } from './IndividualDeviceLastReadingBar';
import { Alert } from 'ui-kit/Alert';
import { AlertIconType, AlertType } from 'ui-kit/Alert/Alert.types';

export const CloseIndividualDeviceForm: FC<CloseIndividualDeviceFormProps> = ({
  form,
  formId,
  device,
  lastReading,
  isBannerShown,
  openReadingsHistoryModal,
}) => {
  const { errorText, fields, submit } = useForm(form);

  return (
    <>
      {isBannerShown && (
        <AlertWrapper>
          <Alert type={AlertType.danger} icon={AlertIconType.info} centered>
            <AlertContainer>
              <AlertTitle>
                У прибора есть показания дальше выбранной даты закрытия
              </AlertTitle>
              <HistoryButton
                onClick={() =>
                  device?.id && openReadingsHistoryModal(device.id)
                }
              >
                История показаний
                <ChevronRotated />
              </HistoryButton>
            </AlertContainer>
          </Alert>
        </AlertWrapper>
      )}

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

        <IndividualDeviceLastReadingBar
          title={'Закрываемый прибор'}
          device={device}
          model={device?.model || ''}
          resource={device?.resource || null}
          serialNumber={device?.serialNumber || ''}
          lastReading={lastReading}
          openReadingsHistoryModal={openReadingsHistoryModal}
        />
      </Form>
    </>
  );
};
