import { DatePickerNative } from '01/shared/ui/DatePickerNative';
import { ButtonTT } from '01/tt-components';
import { useFormik } from 'formik';
import { EResourceType } from 'myApi';
import React, { FC } from 'react';
import { DatePicker } from 'ui-kit/DatePicker';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import {
  ElectricNodePhaseDictionary,
  yearQuarterDictionary,
} from './EditElectricNodeForm.constants';
import {
  AddressInfowrapper,
  BaseInfoWrapper,
  ButtonsWrapper,
  CheckingDatesWrapper,
  DeviceResourceOptionWrapper,
  FormSC,
  SealInfoWrapper,
} from './EditElectricNodeForm.styled';
import {
  EditElectricNodeFormProps,
  UpdateElectricHousingMeteringDeviceForm,
} from './EditElectricNodeForm.types';
import { getDatePickerValue } from './EditElectricNodeForm.utils';

export const EditElectricNodeForm: FC<EditElectricNodeFormProps> = ({
  device,
  isLoading,
  handleUpdateElectricHousingMeteringDevice,
}) => {
  const {
    values,
    submitForm,
    handleChange,
    setFieldValue,
  } = useFormik<UpdateElectricHousingMeteringDeviceForm>({
    initialValues: {
      Model: device.model || '',
      InstallationDate: device.openingDate || '',
      StateVerificationYear: String(device.stateVerificationYear),
      NextStateVerificationYear: String(device.nextStateVerificationYear),
      StateVerificationQuarter: device.stateVerificationQuarter,
      StateVerificationIntervalYears: device.stateVerificationIntervalYears,
    },
    enableReinitialize: true,
    onSubmit: (values) =>
      handleUpdateElectricHousingMeteringDevice({
        ...values,
        deviceId: device.id,
      }),
  });

  const { city, corpus, number, street } =
    device.address?.address?.mainAddress || {};

  return (
    <FormSC onSubmitCapture={submitForm}>
      <BaseInfoWrapper>
        <div id="resourceType">
          <FormItem label="Тип ресурса">
            <Select value={1} disabled>
              <Select.Option value={1}>
                <DeviceResourceOptionWrapper>
                  <ResourceIconLookup resource={EResourceType.Electricity} />
                  <span className="device-resource-name">Электричество</span>
                </DeviceResourceOptionWrapper>
              </Select.Option>
            </Select>
          </FormItem>
        </div>
        <div id="deviceType">
          <FormItem label="Тип прибора">
            <Select disabled value={device.phaseNumber || void 0}>
              {ElectricNodePhaseDictionary.map(({ key, value }) => (
                <Select.Option key={key} value={key}>
                  {value}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
        </div>
        <div id="deviceModel">
          <FormItem label="Модель прибора">
            <Input
              value={values.Model}
              name="Model"
              onChange={handleChange}
              placeholder="Введите модель"
            />
          </FormItem>
        </div>
        <div id="serialNumber">
          <FormItem label="Серийный номер">
            <Input value={device.serialNumber || ''} disabled />
          </FormItem>
        </div>
        <div id="yearOfManufacture">
          <FormItem label="Год выпуска">
            <Input value={device.manufactureYear} disabled />
          </FormItem>
        </div>
        <div id="deviceInstallationDate">
          <FormItem label="Дата установки прибора">
            <DatePickerNative
              value={values.InstallationDate}
              onChange={(value) => setFieldValue('InstallationDate', value)}
              placeholder="Введите дату"
            />
          </FormItem>
        </div>
      </BaseInfoWrapper>
      <CheckingDatesWrapper>
        <FormItem label="Год посл. поверки">
          <DatePicker
            value={getDatePickerValue(values.StateVerificationYear)}
            onChange={(_, dateString) =>
              setFieldValue('StateVerificationYear', dateString)
            }
            picker="year"
            placeholder="Введите год посл. поверки"
          />
        </FormItem>
        <FormItem label="Квартал">
          <Select
            value={values.StateVerificationQuarter || void 0}
            onChange={(value) =>
              setFieldValue('StateVerificationQuarter', value)
            }
            placeholder="Выберите"
          >
            {yearQuarterDictionary.map(({ key, value }) => (
              <Select.Option key={key} value={key}>
                {value}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
        <FormItem label="Интервал">
          <Input
            value={values.StateVerificationIntervalYears}
            name="StateVerificationIntervalYears"
            onChange={handleChange}
            placeholder="Введите интервал"
          />
        </FormItem>
        <FormItem label="Год след. поверки">
          <DatePicker
            value={getDatePickerValue(values.NextStateVerificationYear)}
            onChange={(_, dateString) =>
              setFieldValue('NextStateVerificationYear', dateString)
            }
            picker="year"
            placeholder="Введите год след. поверки"
          />
        </FormItem>
      </CheckingDatesWrapper>
      <SealInfoWrapper>
        <FormItem label="Номер пломбы">
          <Input value={device.sealNumber || ''} disabled />
        </FormItem>
        <FormItem label="Дата установки пломбы">
          <Input value={device.sealInstallationDate || ''} disabled />
        </FormItem>
      </SealInfoWrapper>
      <AddressInfowrapper>
        <div id="street">
          <FormItem label="Улица">
            <Input value={street || ''} disabled />
          </FormItem>
        </div>
        <div id="housingStockNumber">
          <FormItem label="Номер дома">
            <Input value={number || ''} disabled />
          </FormItem>
        </div>
        <div id="corpus">
          <FormItem label="Корпус">
            <Input value={corpus || ''} disabled />
          </FormItem>
        </div>
        <div id="city">
          <FormItem label="Город">
            <Input value={city || ''} disabled />
          </FormItem>
        </div>
      </AddressInfowrapper>
      <ButtonsWrapper>
        <ButtonTT color="blue" type="submit" disabled={isLoading}>
          {isLoading && 'Загрузка...'}
          {!isLoading && 'Сохранить'}
        </ButtonTT>
      </ButtonsWrapper>
    </FormSC>
  );
};
