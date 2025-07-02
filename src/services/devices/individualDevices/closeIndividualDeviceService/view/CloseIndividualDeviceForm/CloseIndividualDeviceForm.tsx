import React, { FC } from 'react';
import {
  CloseIndividualDeviceFormType,
  CloseIndividualDeviceFormProps,
} from './CloseIndividualDeviceForm.types';
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
import { useFormik } from 'formik';
import * as yup from 'yup';
import { prepareDeviceReadings } from 'services/devices/individualDevices/workWithIndividualDeviceService/workWithIndividualDeviceService.utils';

export const CloseIndividualDeviceForm: FC<CloseIndividualDeviceFormProps> = ({
  formId,
  device,
  lastReading,
  isBannerShown,
  openReadingsHistoryModal,
  handleSubmitForm,
  handleSetClosingDate,
}) => {
  const { values, setFieldValue, errors, handleSubmit } =
    useFormik<CloseIndividualDeviceFormType>({
      initialValues: {
        closingDate: dayjs() as dayjs.Dayjs,
        closingReason: null,
        deviceReadings: prepareDeviceReadings([]),
      },
      validationSchema: yup.object().shape({
        closingReason: yup.string().nullable().required('Это поле обязательно'),
      }),
      validateOnChange: false,
      onSubmit: (data) => {
        handleSubmitForm(data);
      },
    });

  return (
    <>
      {isBannerShown && (
        <AlertWrapper>
          <Alert type="danger" icon="info" centered>
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

      <Form id={formId} onSubmitCapture={() => handleSubmit()}>
        <GroupWrapper>
          <FormItem label="Дата снятия прибора с учета">
            <DatePicker
              allowClear={false}
              picker="month"
              format="MMMM YYYY"
              value={values.closingDate}
              onChange={(date) => {
                setFieldValue('closingDate', date);
                if (date) handleSetClosingDate(date);
              }}
              disabledDate={(current) => {
                return (
                  current && current > dayjs().add(1, 'month').endOf('month')
                );
              }}
            />
          </FormItem>
          <FormItem label="Причина закрытия" style={{ width: '100%' }}>
            <Select
              placeholder="Выберите причину закрытия"
              value={values.closingReason || undefined}
              onChange={(reason) =>
                setFieldValue('closingReason', reason as EClosingReason)
              }
            >
              {Object.entries(ClosingReasonsDictionary).map(([key, elem]) => (
                <Select.Option value={key} key={key}>
                  {elem}
                </Select.Option>
              ))}
            </Select>
            <ErrorMessage>{errors.closingReason}</ErrorMessage>
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
