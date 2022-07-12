import React, { FC } from 'react';
import { EResourceType } from 'myApi';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import {
  BaseInfoWrapper,
  ChangingDeviceInfoWrapper,
  ChangingReasonSelectWrapper,
  CheckingDatesWrapper,
  DeviceResourceOptionWrapper,
  SealInfoWrapper,
  Wrapper,
} from './ChangeODPUForm.styled';
import {
  ChangeODPUFormProps,
  closingReasonDictionary,
  ODPUPhaseDictionary,
  yearQuarterDictionary,
} from './ChangeODPUForm.types';
import { checkIsDateNotFuture } from './ChangeODPUForm.utils';
import { DatePickerNative } from '01/shared/ui/DatePickerNative';
import { useFormik } from 'formik';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { Input } from 'ui-kit/Input';
import { DatePicker } from 'ui-kit/DatePicker';

const initialValues = {
  model: '',
  serialNumber: '',
  bitDepth: null,
  openingDate: null,
  manufactureYear: null,
  stateVerificationQuarter: null,
  stateVerificationYear: null,
  nextStateVerificationYear: null,
  stateVerificationIntervalYears: null,
  oldDeviceClosingReason: null,
  sealNumber: '',
  sealInstallationDate: null,
  lastCheckingDate: null,
  futureCheckingDate: null,
  oldDeviceReadings: [],
  newDeviceReadings: [],
};

export const ChangeODPUForm: FC<ChangeODPUFormProps> = ({ oldDevice }) => {
  const {} = useFormik({
    initialValues: { ...initialValues, id: oldDevice.id },
    onSubmit: console.log,
  });

  return (
    <Wrapper>
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
            <Select
              placeholder="Выберите тип прибора"
              disabled
              value={oldDevice.phaseNumber || void 0}
            >
              {ODPUPhaseDictionary.map(({ key, value }) => (
                <Select.Option key={key} value={key}>
                  {value}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
        </div>
        <div id="deviceModel">
          <FormItem label="Модель прибора">
            <Input placeholder="Введите модель" />
          </FormItem>
        </div>
        <div id="serialNumber">
          <FormItem label="Серийный номер">
            <Input placeholder="Введите серийный номер" />
          </FormItem>
        </div>
        <div id="yearOfManufacture">
          <FormItem label="Год выпуска">
            <DatePicker
              disabledDate={checkIsDateNotFuture}
              picker="year"
              placeholder="Введите год"
            />
          </FormItem>
        </div>
        <div id="deviceInstallationDate">
          <FormItem label="Дата установки прибора">
            <DatePickerNative placeholder="Введите дату" />
          </FormItem>
        </div>
        <div id="scaleFactor">
          <FormItem label="Коэффициент">
            <Input type="number" placeholder="Введите коэффициент" />
          </FormItem>
        </div>
        <div id="bitDepth">
          <FormItem label="Разрядность">
            <Input type="number" placeholder="Введите разрядность" />
          </FormItem>
        </div>
      </BaseInfoWrapper>
      <CheckingDatesWrapper>
        <FormItem label="Год посл. поверки">
          <DatePicker
            picker="year"
            placeholder="Введите год посл. поверки"
          />
        </FormItem>
        <FormItem label="Год след. поверки">
          <DatePicker
            picker="year"
            placeholder="Введите год след. поверки"
          />
        </FormItem>
        <FormItem label="Квартал">
          <Select placeholder="Выберите">
            {yearQuarterDictionary.map(({ key, value }) => (
              <Select.Option key={key} value={key}>
                {value}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
        <FormItem label="Интервал">
          <Input placeholder="Введите интервал" />
        </FormItem>
      </CheckingDatesWrapper>
      <ChangingDeviceInfoWrapper>
        <ChangingReasonSelectWrapper>
          <FormItem label="Причина замены">
            <Select placeholder="Выберите причину замены">
              {closingReasonDictionary.map(({ key, value }) => (
                <Select.Option key={key} value={key}>
                  {value}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
        </ChangingReasonSelectWrapper>
      </ChangingDeviceInfoWrapper>
      <SealInfoWrapper>
        <FormItem label="Номер пломбы">
          <Input placeholder="Введите номер пломбы" />
        </FormItem>
        <FormItem label="Дата установки пломбы">
          <DatePickerNative placeholder="Выберите дату" />
        </FormItem>
      </SealInfoWrapper>
    </Wrapper>
  );
};
